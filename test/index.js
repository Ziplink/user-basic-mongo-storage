var chai = require('chai'),
  expect = chai.expect,
  User = require('../index.js');
  
const TEST_DATA = [
  {
    displayName: 'Test Name',
    authentication: {
      provider: 'google',
      id: 'testID'
    }
  }
];

describe('API v0.1', function(){
  
  describe('create(user, callback)', function(){
    
    TEST_DATA.forEach(function(testData, index){
      
      it('creates User from TEST_DATA[' + index + ']', function(done){

        User.create(testData)
          .then(function(user) {
            expect(user).to.exist;
            expect(user.name).to.equal(testData.name);
            if(user) {
              testData.id = user.id;
            }
            done();
          })
          .catch(done);
        
      });
      
    });
    
  });
  
  describe('findByAuthentication(authentication)', function(){
    
    TEST_DATA.forEach(function(testData, index){
      
      it('finds correct User from TEST_DATA[' + index + ']', function(done){
        User.findByAuthentication(testData.authentication)
          .then(function(user) {
            expect(user).to.exist;
            expect(user.name).to.equal(testData.name);
            expect(user.ID).to.equal(testData.ID);
            done();
          })
          .catch(done);
        
      });
      
    });
    
  });
  
});