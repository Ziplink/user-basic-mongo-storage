var chai = require('chai'),
  expect = chai.expect,
  User = require('../index.js');
  
const TEST_DATA = [
  {
    displayName: 'Test Name',
    authentication: {
      provider: 'google',
      ID: 'testID'
    }
  }
];

describe('API v0.1', function(){
  
  describe('create(user, callback)', function(){
    
    TEST_DATA.forEach(function(testData, index){
      
      it('creates User from TEST_DATA[' + index + ']', function(done){

        User.create(testData, function(err, user){
          
          expect(user).to.exist;
          expect(user.name).to.equal(testData.name);
            
          if(user)
            testData.ID = user.ID;
            
          done(err);
        });
        
      });
      
    });
    
  });
  
  describe('findByAuthentication(authentication)', function(){
    
    TEST_DATA.forEach(function(testData, index){
      
      it('finds correct User from TEST_DATA[' + index + ']', function(done){
        User.findByAuthentication(testData.authentication, function(err, user){
          
          expect(user).to.exist;
          expect(user.name).to.equal(testData.name);
          expect(user.ID).to.equal(testData.ID);
          
          done(err);
          
        });
        
      });
      
    });
    
  });
  
});