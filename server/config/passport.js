var TwitterStrategy = require('passport-twitter').Strategy;
var RememberMeStrategy = require('passport-remember-me').Strategy;

var User = require('../app/models/user.js');
var Token = require('../app/models/token.js');

var auth = require('./auth');

module.exports = function(passport) {
  // serializes to the cookie
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize from the cookie
  passport.deserializeUser(function(id, done) {
    User.findById(id, done);
  });

  // twitter strategy
  passport.use(
    new TwitterStrategy(
      auth.twitterNick,
      function(token, tokenSecret, profile, done) {
        User.findOne({ 'twitter.id': profile.id }, function(err, user) {
          if(err) {
            return done(err);
          }

          if(user) {
            return done(null, user);
          } else {
            var newUser = new User({
              twitter: {
                id: profile.id,
                token: token,
                tokenSecret: tokenSecret,
                username: profile.username,
                displayName: profile.displayName
              }
            });
            newUser.save(function(err) {
              if(err) {
                throw err
              }

              return done(null, newUser);
            });
          }
        });
      }
    )
  );

  // RememberMe: save a remember token, and then when the user comes to the website
  // automatically try to get the token, and authenticate
  passport.use(
    new RememberMeStrategy(
      // consume the remember me token
      function(token, done) {
        Token.consume(token, function(err, user) {
          if(err) {
            return done(err);
          }
          if(!user) {
            return done(null, false);
          }
          return done(null, user);
        });
      },
      // reissue a new one
      function(user, done) {
        Token.save(user, function(err, token) {
          if(err) {
            return done(err);
          }
          return done(null, token);
        });
      }
    )
  );
};
