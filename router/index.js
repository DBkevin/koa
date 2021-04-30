const router = require('koa-router')();
const isAuth = require('../middlewares/isAuth');
const Auth = require("../middlewares/Auth");
module.exports = (app) => {
    router.get('/', require('./users').home);
    router.get('/signup', isAuth(),require('./auth').signup);
    router.post('/signup',isAuth(), require('./auth').signup);
    router.post('/signout',Auth(),require('./auth').signout);
    router.get('/login', isAuth(), require('./auth').login);
    router.post('/login', isAuth(), require('./auth').login);
    router.get("/users/:id/edit", Auth(), require('./users').edit);
    router.post("/users/:id/edit", Auth(), require('./users').edit);
    router.get('/users', require('./users').index);
    router.get('/users/:id', require('./users').show);
    router.post('/posts/create', Auth(), require('./users').create);
    app.use(router.routes());
    app.use(router.allowedMethods());
}