const Koa = require('koa');
const app = new Koa();
const routerApi = require('./routers/api');
const { server } = require('./conf');

app.use(routerApi.routes());
app.listen(server.port);