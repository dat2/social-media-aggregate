var path = require('path');
var express = require('express');
var app = express();
var twitterAPI = require('node-twitter-api');

app.use(express.static(path.resolve(__dirname, '../client/public')));

var twitter = new twitterAPI({
    consumerKey: 'aAG0jYGwxKSHwdQ2tSfDRMskR',
    consumerSecret: '3w2JOgJDHulIXZtdB1WZPjJZXjbLNGkH0eG2H1RNehIyPDVTIV',
    callback: 'http://localhost:3000'
});

app.post('/twitterInfo', function(req, res) {
    console.log('brah');
    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
        if (error) {
            console.log("Error getting OAuth request token : " + error);
        } else {
            res.send({requestToken: requestToken, requestTokenSecret: requestTokenSecret});
        }
    });
});

var PORT = 3000;

app.listen(PORT, function() {
  console.log('listening on port ' + PORT);
});
