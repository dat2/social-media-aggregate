import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');

class SignInToTwitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestToken: '', requestTokenSecret: ''
        }
    }

    render() {
        $.post('/twitterInfo', function (data) {
            console.log(data);
        });
        return <div> Hello World!!! </div>
    }
}

ReactDOM.render(<SignInToTwitter/>, document.getElementById('react'));
