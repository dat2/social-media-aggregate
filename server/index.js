var path = require('path');
var express = require('express');
var app = express();
var twitterAPI = require('node-twitter-api');
var instagramAPI = require('instagram-node').instagram();

// instagramAPI.use({
//   client_id: YOUR_CLIENT_ID,
//   client_secret: YOUR_CLIENT_SECRET
// });

// var redirect_uri = 'http://yoursite.com/handleauth';

// exports.authorize_user = function(req, res) {
//   res.redirect(instagramAPI.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
// };

// exports.handleauth = function(req, res) {
//   instagramAPI.authorize_user(req.query.code, redirect_uri, function(err, result) {
//     if (err) {
//       console.log(err.body);
//       res.send("Didn't work");
//     } else {
//       console.log('Yay! Access token is ' + result.access_token);
//       res.send('You made it!!');
//     }
//   });
// };

// // This is where you would initially send users to authorize
// app.get('/authorize_user', exports.authorize_user);
// // This is your redirect URI
// app.get('/handleauth', exports.handleauth);


app.use(express.static(path.resolve(__dirname, '../client/public')));

var twitter = new twitterAPI({
    consumerKey: 'aAG0jYGwxKSHwdQ2tSfDRMskR',
    consumerSecret: '3w2JOgJDHulIXZtdB1WZPjJZXjbLNGkH0eG2H1RNehIyPDVTIV',
    callback: 'oob'
});

app.post('/twitterInfo', function(req, res) {
    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
        if (error) {
            console.log("Error getting OAuth request token : ");
            console.dir(error);
        } else {
            res.json({requestToken: requestToken, requestTokenSecret: requestTokenSecret});
        }
    });
});

var PORT = 3000;

app.listen(PORT, function() {
  console.log('listening on port ' + PORT);
});
