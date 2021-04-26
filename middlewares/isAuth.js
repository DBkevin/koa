exports = module.exports = () => {
    return async (ctx, next)=>{
        console.log('走登陆判定');
        console.log(ctx.session.user);
        if (ctx.session.user !== 'undefined'||ctx.session.user!==null) {
            console.log(ctx.session.user);
            ctx.session.info = {
                danger:"已经登陆,无法再次登陆"
            }
            await ctx.redirect('back', '/');
        } else {
            await next();
        }
    }
}