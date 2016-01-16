var TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../app/models/user.js');

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
                username: profile.username,
                displayName: profile.displayName
              }
            });
            newUser.save(function(err) {
              if(err) {
                throw err
              } else {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );
};
