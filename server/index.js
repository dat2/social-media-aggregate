var express = require('express');
var app = express();
var twitterAPI = require('node-twitter-api');

var twitter = new twitterAPI({
    consumerKey: 'aAG0jYGwxKSHwdQ2tSfDRMskR',
    consumerSecret: '3w2JOgJDHulIXZtdB1WZPjJZXjbLNGkH0eG2H1RNehIyPDVTIV',
    callback: 'http://localhost:8080'
});

app.post('/twitterInfo', function(req, res) {
    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
        if (error) {
            console.log("Error getting OAuth request token : " + error);
        } else {
            res.send({requestToken: requestToken, requestTokenSecret: requestTokenSecret});
        }
    });
});

var PORT = 8080;

app.listen(PORT, function() {
  console.log('listening on port ' + PORT);
});
