import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class SignInToTwitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestToken: '', requestTokenSecret: ''
        }
    }

    componentDidMount() {
    }

    render() {
        return (
          <div>
            Hello World!!!
            <a href='/auth/twitter'>Login to twitter</a>
          </div>
        );
    }
}

ReactDOM.render(<SignInToTwitter/>, document.getElementById('react'));
