const db = require('../core/db');
const bcrypt = require('bcryptjs');
module.exports = {
    async signup(ctx, next) {
        if (ctx.method === 'GET') {
            await ctx.render("auth/signup", {
                title: '注册',
            });
            return;
        }
        let { name, password, email } = ctx.request.body;
        //TODO对合法性验证
        let sql = `select * from users where name="${name}"`;
        let user = await db(sql);

        //对密码进行加密;
        if (!user) {
            // 生成salt
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            // 拼接新增语句
            let userSQL = `insert into blog1.users(NAME,PASSWORD,EMAIL) values("${name}","${password}","${email}")`;
            // 存储到数据库
            await db(userSQL).then((result) => {
                //TODO 自动登陆
                ctx.session.user = {
                    id: result.insertId,
                    name: name,
                };
                ctx.redirect('/');
            }).catch((err) => {
                console.log(err);
            });
        } else {
            ctx.redirect('/');
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
                name:name
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