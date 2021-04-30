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
    static async create(content, id) {
        const post = await Models.Posts.create({centent: content,user_id:id})
        if (post) {
            console.log(post);
            return post;
        } else {
            return false;
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
