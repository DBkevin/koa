const router = require('koa-router')();
module.exports = (app) => {
    router.get('/', async (ctx, next) => {
      await  ctx.render('common/default', {
            title:'首页',
            pagename: '../index'
        });
    });
    router.get('/signup', require('./auth').signup);
    router.post('/signup', require('./auth').signup);
    router.post('/signout', require('./auth').signout);
    router.get('/login', require('./auth').login);
    router.post('/login', require('./auth').login);
    app.use(router.routes());
    app.use(router.allowedMethods());
}