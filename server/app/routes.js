var Twitter = require('twitter');
var auth = require('../config/auth');

module.exports = function(app, passport) {
  // auth routes
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/twitter/failed',
    failureFlash: true
  }));

  app.get('/user', function(req, res) {
    res.json(req.user);
  });

  app.get('/tweets', function(req, res) {
    var client = new Twitter({
      consumer_key: auth.twitterNick.consumerKey,
      consumer_secret: auth.twitterNick.consumerSecret,
      access_token_key: req.user.token,
      access_token_secret: req.user.tokenSecret
    });

    client.get('statuses/user_timeline', { screen_name: 'kryczko' }, function(error, tweets, response) {
      if(error) {
        res.status(500).send(error);
      } else {
        res.json({ tweets: tweets });
      }
    });
  });
};

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
