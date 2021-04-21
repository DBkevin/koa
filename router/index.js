const router = require('koa-router')();
module.exports = (app) => {
    router.get('/', async (ctx, next) => {
        ctx.redirect('/signup');
    });
    router.get('/signup', require('./auth').signup);
    router.post('/signup', require('./auth').signup);
    /*router.get('/login', require('./auth').login);
    router.post('/login', require('./auth').login);
    router.get('/signout', require('./auth').signout);
    */
    app.use(router.routes());
    app.use(router.allowedMethods());
}