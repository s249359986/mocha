var assert = require('assert');
var run    = require('./helpers').runMochaJSON;
var args   = [];

describe('uncaught exceptions', function() {
  this.timeout(1000);

  it('handles uncaught exceptions from hooks', function(done) {
    run('uncaught.hook.js', args, function(err, res) {
      assert(!err);
      assert.equal(res.stats.pending, 0);
      assert.equal(res.stats.passes, 0);
      assert.equal(res.stats.failures, 1);

      assert.equal(res.failures[0].fullTitle,
        'uncaught "before each" hook');
      assert.equal(res.code, 1);
      done();
    });
  });

  it('handles uncaught exceptions from async specs', function(done) {
    run('uncaught.js', args, function(err, res) {
      assert(!err);
      assert.equal(res.stats.pending, 0);
      assert.equal(res.stats.passes, 0);
      assert.equal(res.stats.failures, 2);

      assert.equal(res.failures[0].title,
        'fails exactly once when a global error is thrown first');
      assert.equal(res.failures[1].title,
        'fails exactly once when a global error is thrown second');
      assert.equal(res.code, 2);
      done();
    });
  });
});
