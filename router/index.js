const router = require('koa-router')();
module.exports = (app) => {
    router.get('/', async (ctx, next) => {
        await ctx.render('index', {
            title: '首页',
        });
    });
    router.get("/about", async (ctx, next) => {
        await ctx.render('about', {
            title: '关于我们',
        });
    });
    router.get("/help", async (ctx, next) => {
        await ctx.render('help', {
            title: '帮助页',
        })
    });
    router.get('/signup', require('./auth').signup);
    router.post('/signup', require('./auth').signup);
    router.get('/login', require('./auth').login);
    router.post('/login', require('./auth').login);
    router.get('/signout', require('./auth').signout);
    app.use(router.routes());
    app.use(router.allowedMethods());
}