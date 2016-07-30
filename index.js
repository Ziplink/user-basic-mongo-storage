var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
  
var connection = mongoose.createConnection('mongodb://localhost/ziplink');

const AUTH_PROVIDERS = ['google'];

var userSchema = new Schema({
  displayName: {
    type: String,
    maxlength: [64, 'Name too long'],
    required: true
  },
  authentication: {
    provider: {
      type: String,
      required: true,
      enum: AUTH_PROVIDERS
    },
    id: {
      type: String,
      required: true,
      maxlength: [128, 'ID too long']
    }
    
  }
});

/**
 * Find User by ID
 */
userSchema.statics.findByAuthentication = function(authentication) {
  return this.findOne({'authentication.provider': authentication.provider,
    'authentication.id': authentication.id});
};

userSchema.statics.create = function(userData){
  var newUser = new this(userData);
  
  return newUser.save();
};

var User = connection.model('User', userSchema);

module.exports = exports = User;