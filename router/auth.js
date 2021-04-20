const { UsersServer } = require('../server/users_server');
module.exports = {
    async signup(ctx, next) {
        if (ctx.method === 'GET') {
            await ctx.render("auth/signup", {
                title: '注册',
            });
            return;
        }

        let { name, password, email } = ctx.request.body;
        let user = await UsersServer.create({
            name: name,
            password: password,
            email: email
        });
        if (!user) {
            ctx.redirect('back','/signp');
            ctx.body = '已经存在';
        } else {
            console.log(user);
        }
    },
    async login(ctx, next) {
        if (ctx.method === "GET") {
            await ctx.render("auth/login", {
                title: '登陆',
            });
            return;
        }
        //TODO对合法性验证
        const { name, password } = ctx.request.body;
        let querySql = `select * from users where name='${name}'`;
        const user = await db(querySql);
        if (user && await bcrypt.compare(password, user[0].password)) {
            ctx.session.user = {
                id: user[0].id,
                name: name
            }
            ctx.redirect("/");
        } else {
            ctx.body = '用户名或密码错误';
        }
    },
    async signout(ctx, next) {
        ctx.session = null;
        ctx.redirect('back', '/');
    }
}