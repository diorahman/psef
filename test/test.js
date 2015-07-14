var psef = require('../');
describe('ps -ef', function() {
  it ('should run ps -ef', function(done) {
    psef(function(err, arr){
      if (err)
        return done(err);
      var ps = arr.pop();
      ps.CMD.should.equal('ps');
      done();
    });
  });
  it ('should error', function(done) {
    process.env['COMMAND'] = 'hihihihi';
    psef(function(err, arr){
      err.should.be.an.instanceof(Error);
      done();
    });
  });
});
