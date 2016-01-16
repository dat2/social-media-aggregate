var React = require('react');
var $ = require('jquery');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'aAG0jYGwxKSHwdQ2tSfDRMskR',
  consumer_secret: '3w2JOgJDHulIXZtdB1WZPjJZXjbLNGkH0eG2H1RNehIyPDVTIV',
  access_token_key: '3313570090-Z2EApD4DAMJqKCCbGyG3CpEymk9Kx5l8Wqng0VM',
  access_token_secret: 'tlU875YAS94wnpZGFXaHno55Ow6AX9aJctHNvQzfPaL9y'
});


var Tweet = React.createClass({
    componentDidMount: function() {
        
    },
    render: function() {
        return (
          <div>

          </div>
          )
    }
});

var TweetList = React.createClass({
    componentDidMount: function() {

    },
    render: function() {
       return (
        <Tweet/>
        )
    }
});

export default TweetList;
