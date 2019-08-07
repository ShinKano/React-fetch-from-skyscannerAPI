import React from 'react';　//Reactファンクションをreactモジュールディレクトリからインポート = これはReactアプリケーションです
import ReactDOM from 'react-dom'; //React-DOMファンクションをreact-domモジュールディレクトリからインポート
//import './index.css'; //CSSのインポート

class Infomation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            frights: [],
        }
    }


    render() {
        return (
            <div>
                <h1>Minimam Price Checker</h1>
                <Controller />
            </div>
        );
    }


}



class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: null,
            to: null,
            notYetFetched: true, 
            minPrice: null,
        }
    };

    setStateFrom(plaseId) {
        this.setState({from: plaseId})
        if (!this.state.notYetFetched) {
            this.setState({notYetFetched: true})
        }
    };
    setStateTo(plaseId) {
        this.setState({to: plaseId})
        if (!this.state.notYetFetched) {
            this.setState({notYetFetched: true})
        }
    };

    fetchPrice() {
        
        let from = this.state.from;
        let to = this.state.to;
        let flightDate = document.querySelector('#date').value;
        console.log(flightDate);
        let myInit = {  method: 'GET',
                        headers: {
                            "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                            "X-RapidAPI-Key": "",
                        }};

        fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/JP/JPY/en-US/${from}/${to}/${flightDate.toString()}`, myInit)
          .then(results => results.json())
          .then(data => {
            const minPrice = data['Quotes'][0]['MinPrice'];
            console.log(data['Quotes']);
            console.log(minPrice)
            this.setState({minPrice: minPrice})
          })
          .catch(err => console.log(err));
    }

    render() {
        if (this.state.from && this.state.to && this.state.notYetFetched) {
            this.fetchPrice();
            this.setState({notYetFetched: false});
        }

        return (
            <div>
                <h2>from : {this.state.from}</h2>
                <h2>to : {this.state.to}</h2>
                <h2>Price : ¥ {this.state.minPrice}</h2>
                <Places 
                    onClickFrom={(plaseId) => this.setStateFrom(plaseId)}
                    onClickTo={(plaseId) => this.setStateTo(plaseId)}
                />
            </div>
        );
    }
}


class Places extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placesJapan: [],
            placesPhil: [],
        }
    }
    
    componentDidMount() {
        const defaultURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/PHP/en-GB/?query="
        const myInit = {method: 'GET',
                        headers: {
                            "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                            "X-RapidAPI-Key": "",
                        } 
        };

        fetch(defaultURL+"Japan", myInit)
          .then(results => results.json())
          .then(data => {
            const places = data['Places'];
            this.setState({ placesJapan: places });
            console.log(this.state.placesJapan);
          })
          .catch(err => console.log(err));

        fetch(defaultURL+"Philippines", myInit)
          .then(results => results.json())
          .then(data => {
            const places = data['Places'];
            this.setState({ placesPhil: places });
            console.log(this.state.placesPhil);
          })
          .catch(err => console.log(err));
    }

    render() {

        const listJP = [];
        const listPH = [];

        this.state.placesJapan.forEach(place => {
            listJP.push(<li key={place.PlaceName}>
                            <button onClick={() =>
                                this.props.onClickTo(place.PlaceId)}>{place.PlaceId}
                            </button>
                        </li>)
        })
        this.state.placesPhil.forEach(place => {
            listPH.push(<li key={place.PlaceName}>
                            <button onClick={() => 
                                this.props.onClickFrom(place.PlaceId)}>{place.PlaceId}
                            </button>
                        </li>)
        })

        return (
          <div>
              
              <input id="date" type="date" min="2018-08-08" ></input>
              <ul>{listPH}</ul>
              <ul>{listJP}</ul>
          </div>
        );
    }
}





ReactDOM.render(
    <Infomation />,
    document.getElementById('root')
  );


