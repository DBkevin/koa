exports = module.exports = () => {
    return async (ctx, next) => {
        if (ctx.session.user !== null) {
            await next();
        } else {
            ctx.session.info = {
                warning:'还未登陆,请先登陆',
            }
            await ctx.redirect("/login", '/');
        }
    }
}