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
        $.post('/twitterInfo', data => {
          this.setState(data);
          console.log(data);
        });
    }

    render() {
        return (
          <div>
            Hello World!!! <br/>
            Stuff: {this.state.data}
          </div>
        );
    }
}

ReactDOM.render(<SignInToTwitter/>, document.getElementById('react'));
