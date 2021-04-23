exports = module.exports = () => {
    return async (ctx, next)=>{
        if (ctx.session.user !== null) {
            ctx.session.info = {
                danger:"已经登陆,无法再次登陆"
            }
            await ctx.redirect('back', '/');
        } else {
            await next();
        }
    }
}