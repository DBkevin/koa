const router = require('koa-router')();
const isAuth = require('../middlewares/isAuth');
const Auth = require("../middlewares/Auth");
module.exports = (app) => {
    router.get('/', async (ctx, next) => {
      await  ctx.render('common/default', {
            title:'首页',
            pagename: '../index'
        });
    });
    router.get('/signup', isAuth(),require('./auth').signup);
    router.post('/signup',isAuth(), require('./auth').signup);
    router.post('/signout',Auth(),require('./auth').signout);
    router.get('/login', isAuth(), require('./auth').login);
    router.post('/login', isAuth(), require('./auth').login);
    router.get("/users/:id/edit", Auth(), require('./users').edit);
    router.post("/users/:id/edit", Auth(), require('./users').edit);
    router.get('/users', require('./users').index);
    app.use(router.routes());
    app.use(router.allowedMethods());
}