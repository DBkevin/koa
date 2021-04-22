const { UsersServer } = require('../server/users_server');
const users = require('../validators/users');
module.exports = {
    async signup(ctx, next) {
        let ejsconfig = {
            title: '注册',
            pagename: '../auth/signup',
        }
        if (ctx.method === 'GET') {
            await ctx.render("common/default", ejsconfig);
            return;
        }
        const { name, password, email } = ctx.request.body;
        const isUniqueName = await UsersServer.isUniqueName(name);
        if (isUniqueName) {
            ejsconfig['errors_name'] = "用户已经存在";
            await ctx.render("common/default", ejsconfig);
        } else {
            let isUniqueEmail = await UsersServer.isUniqueEmail(email);
            if (isUniqueEmail) {
                ejsconfig['errors_email'] = '邮箱已经注册';
                await ctx.render('common/default', ejsconfig);
            } else {
                let user = await UsersServer.create({
                    name: name,
                    password: password,
                    email: email
                });
                ctx.session.user = {
                    id: user.userInfo.id,
                    name: user.userInfo.name
                };
                ctx.session.info = {
                    success: '注册成功'
                }
                ctx.redirect("/");
            }
        }

    },
    async login(ctx, next) {
        let ejsconfig = {
            title: '登陆',
            pagename: '../auth/login',
        }
        if (ctx.method === "GET") {
            await ctx.render("common/default", ejsconfig);
            return;
        }
        //TODO对合法性验证
        const { name, password } = ctx.request.body;
        const User = await UsersServer.verify(name,password);
        if (User) {
            console.log(User);
             ctx.session.user = {
                    id: User.id,
                    name: User.name
                };
                ctx.session.info = {
                    success: '登陆成功'
                }
                ctx.redirect("/");
        } else {
            ctx.session.info = {
                danger: "帐号或密码错误"
            };
            await ctx.render("common/default", ejsconfig);
        }
    },
    async signout(ctx, next) {
        ctx.session.user = null;
        ctx.session.info = {
            success: '退出成功'
        };
        ctx.redirect('back', '/');
    }
}