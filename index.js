var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  
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
    ID: {
      type: String,
      required: true,
      maxlength: [128, 'ID too long']
    }
    
  }
});

/**
 * Find User by ID
 */
userSchema.statics.findByAuthentication = function(authentication, callback) {
  if(authentication.provider && authentication.ID){
    this.findOne({'authentication.provider': authentication.provider, 'authentication.ID': authentication.ID}, function(err, user){
      return callback(err, user);
    });
  } else {
    var err = new Error('No user found from ID: ' + authentication.ID + ' and provider: ' + authentication.provider);
    callback(err);
  }
};

userSchema.statics.create = function(userData, callback){
  var newUser = new this(userData);
  
  newUser.save()
    .then(function(newZiplink){
    	callback(undefined, newZiplink);
    }).catch(callback);
};

var User = connection.model('User', userSchema);

module.exports = exports = User;