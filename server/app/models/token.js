var hat = require('hat');
var mongoose = require('mongoose');

var rack = hat.rack();

var tokenSchema = mongoose.Schema({
  tokenId: String,
  userId: String
});
tokenSchema.statics.consume = function(token, cb) {
  var Token = this;

  Token.findOne({ tokenId: token }, function(err, user) {
    if(err) {
      cb(err)
    }
    Token.remove(function(err) {
      cb(err, user.userId);
    });
  });
}
tokenSchema.statics.save = function(userId, cb) {
  var Token = this;
  var tId = rack();
  var t = new Token({ tokenId: tId, userId: userId });
  t.save(function(err) {
    cb(err, tId);
  });
}

module.exports = Token = mongoose.model('Token', tokenSchema);;
