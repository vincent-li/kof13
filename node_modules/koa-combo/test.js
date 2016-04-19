var request = require('supertest'),
  koa = require('koa'),
  combo = require('./index');

describe('Koa Combo', function() {
  it('should work', function(done) {
    var app = koa();
    app.use(combo(['example-parts']));
    request(app.listen())
      .get('/?combo=example-parts/part1.js,example-parts/part2.js')
      .expect('/**\n * Koa-combo example script part1\n */\nfunction part1() {\n  console.log(\'Part1\');\n}\n/**\n * Koa-combo example script part2\n */\nfunction part2() {\n  console.log(\'Part2\');\n}\n', 
        done);
  });
});