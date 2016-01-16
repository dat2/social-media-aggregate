import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class SignInToTwitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user: {
            twitter: {
              token: '',
              username: '',
              displayName: ''
            }
          }
        }
    }

    componentDidMount() {
      $.get('/user', user => {
        this.setState({ user });
      });
    }

    render() {
      const {
        user: {
          twitter: {
            token,
            username,
            displayName
          }
        }
      } = this.state;
        return (
          <div>
            <a href='/auth/twitter'>Login to twitter</a>
            <p>Hello World!!!</p>
            <div>
              Twitter Login Info
              <p>Token {token}</p>
              <p>Username {username}</p>
              <p>DisplayName {displayName}</p>
            </div>
          </div>
        );
    }
}

ReactDOM.render(<SignInToTwitter/>, document.getElementById('react'));
