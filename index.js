const koa = require('koa');
const app = new koa();
const views = require('koa-views');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const Router = require('./router/index');
const session = require('koa-session');
app.keys = ['lee'];
app.use(session({
    key:'koa:lee',
    maxAge: 86400000,
}, app));
app.use(static(
    path.join(__dirname, './public')
))
app.use(bodyParser());
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs',
}));
app.use(async (ctx, next) => {
    ctx.state.ctx = ctx;
    await next();
});
Router(app);
app.listen(3000, () => {
    console.log("启动成功");
});