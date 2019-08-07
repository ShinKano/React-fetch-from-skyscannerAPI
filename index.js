import React from 'react';　//Reactファンクションをreactモジュールディレクトリからインポート = これはReactアプリケーションです
import ReactDOM from 'react-dom'; //React-DOMファンクションをreact-domモジュールディレクトリからインポート
//import './index.css'; //CSSのインポート


class Tofu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }
    
    componentDidMount() {
        var myInit = {  method: 'GET',
                        headers: {
                            "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                            "X-RapidAPI-Key": "975351462fmshaede6b9b63d323ap1216aejsn37c2602aebe0",
                        } 
        };

        fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/PHP/en-GB/?query=Philippines", myInit)
          .then(results => results.json())
          .then(data => {
            console.log(data);
            const users = data.places;
            this.setState({ users: users });
            console.log(this.state.users);
          })
          .catch(err => console.log(err));
    }
    

    render() {
        return (
          <div>

          </div>
        );
    }
}


ReactDOM.render(
    <Tofu />,
    document.getElementById('root')
  );


