var koa = require('koa'),
  app = koa(),
  combo = require('./index');

app.use(combo(['example-parts/']));

app.listen(3000);