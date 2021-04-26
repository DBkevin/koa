const { UsersServer } = require('../server/users_server');
const pages = require('../middlewares/pages');
module.exports = {
    async edit(ctx, next) {
        let ejsconfig = {
            title: '编辑',
            pagename: '../users/edit',
        }
        if (ctx.method === 'GET') {
            let { id } = ctx.params;
            let user = await UsersServer.detail(id);
            if (user) {
                ejsconfig['user'] = user;
                await ctx.render('common/default', ejsconfig);
                return;
            }
        }
        let { id } = ctx.params;
        let { password } = ctx.request.body;
        if (!password) {
            ctx.session.errors = [
                "密码不能为空"
            ];
            ctx.redirect('back');
            return;
        }
        let user = await UsersServer.updatePassword(password, id);
        if (user) {
            console.log(user);
            ctx.session.info = {
                success: '密码修改成功'
            };
            ctx.redirect('back', '/');
            return;
        }

    },
    async index(ctx, next) {
          let ejsconfig = {
            title: '编辑',
            pagename: '../users/index',
        }
        let { page } = ctx.query;
        console.log(ctx.query.page);
        console.log(page);
        let users = await UsersServer.getAll(page);
        ejsconfig['users'] = users.rows;
        ejsconfig['pages'] = pages(users.count, '/users', page, 5);
        console.log(ejsconfig['pages']);
        await ctx.render('common/default',ejsconfig)
    }
}