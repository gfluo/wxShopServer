const Koa = require('koa');
const app = new Koa();
const routerApi = require('./routers/api');
const { server } = require('./conf');
const bodyParser = require('koa-bodyparser');

app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(routerApi.routes());
app.listen(server.port);
console.log(`server is on port ${server.port}`)