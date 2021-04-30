const { UsersServer } = require('../server/users_server');
const pages = require('../middlewares/pages');
const { PostsServer } = require('../server/posts_server');
const Can= require('../middlewares/can');
module.exports = {
    async edit(ctx, next) {
        let ejsconfig = {
            title: '编辑',
            pagename: '../users/edit',
        }
        if (ctx.method === 'GET') {
            let { id } = ctx.params;
            let user = await UsersServer.details(id);
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
        let users = await UsersServer.getAll(page);
        ejsconfig['users'] = users.rows;
        ejsconfig['pages'] = pages(users.count, '/users', page, 5);
        await ctx.render('common/default',ejsconfig)
    },
    async show(ctx, next) {
        let ejsconfig = {
            PAGENAME: '../users/show',
        };
        let { id } = ctx.params;
        let { page } = ctx.query;
        let user = await UsersServer.details(id, page);
       let pagetions=pages(user.count,`/users/${id}`,page,5)
        if (user) {
            await ctx.render('common/default', {
                pagename: '../users/show',
                user,
                title: `${user.name}`,
                posts: user.Posts,
                pages:pagetions
            });
        }
    },
    async create(ctx, next) {
        const { centent } = ctx.request.body;
        let id = ctx.session.user.id;
        let post = PostsServer.create(centent, id);
        if (post) {
            ctx.session.info = {
                success: '发布成功'
            };
            ctx.redirect("back", '/');
        } else {
            ctx.session.info = {
                danger:'error,错误'
            }
            ctx.redirect('back', '/');
        }

    },
    async home(ctx, next) {
        let isAuth = Can();
        let ejsConfig = {
            title: '首页',
            
        }
        if (isAuth) {
            //登陆状态
        } else {
            //未登录
        }

    }
}