/**
 * @description 博文数据处理
 *
 * @author Lee
 *
 */
const Models = require('../models/index');
/**
 * @description 博文相关的增删改查类
 * @class Users
 * @static 
 */
class PostsServer {
    static async create(content, user_id) {
        const post = {};
        post.content = content;
        post.user_id = user_id;
        const postInfo = await Models.Posts.create(post);
        return {
            postInfo
        }
    }
    static async details(id) {
        const post = await Models.Posts.findOne({
            where: {
                id
            }
        });
        if (!post) {
            return false;
        } else {
            return post;
        }
    }
}
exports = module.exports = {
    PostsServer
}
