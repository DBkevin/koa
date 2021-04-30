exports = module.exports = () => {
    return async (ctx, next) => {
        if (typeof (ctx.session.user) != "undefined" || ctx.session.user != null) {
            return true;
        } else {
            return false;
        }
    }
}