/**
 * @descriptiion 用户数据访问对象
 * @author Lee
 */
const  Models  = require('../models/index');
const bcrypt = require('bcryptjs');
/**
 * @description 用户相关的增删改查类
 * @class Users
 * @static 
 * 
 */
class UsersServer {
    //创建用户
    /**
     * 创建用户
     *
     * @param     {object}    params    要创建用户的信息的对象集合
     * @static
     * @memberof  Users
     * @return    {(boolean|object)}             创建失败或存在用户返回false,否则返回一个包含用户名称的对象;
     */
    static async create(params) {
        const { name, password, email } = params;
        const hasUser = await Models.Users.findOne({
            where: {
                email,
                name,
            }
        });
        if (hasUser) {
            return false;
        } else {
            const user = new Models.Users();
            const salt = bcrypt.genSaltSync(10);
            user.name = name;
            user.email = email;
            user.password = bcrypt.hashSync(password, salt);
            await user.save();
            return {
                user: user
            }
        }
    }

    /**
     * 验证密码
     * @static
     * @memberof  Users
     * @param     {string}    name             用户名
     * @param     {string}    plainPassword    用户密码
     *
     * @return    {(boolean|Object)}           错误或不存在返回false,正确返回包含用户信息的对象           
     */
    static async verify(name, plainPassword) {
        //查询用户是否存在
        const user = await Users.findOne({
            where: {
                email,
                name
            }
        });
        if (!user) {
            return false;
        } else {
            //验证密码是否正确
            const correct = bcrypt.compareSync(plainPassword, admin.password);
            if (!correct) {
                return false;
            } else {
                return user;
            }
        }
    }
    /**
     * 查询用户信息
     * @static
     * @memberof Users
     * @param     {int}    id    用户ID
     *
     * @return   {(boolean|object)}          不存在用户或错误,返回false,否则返回包含用户信息的对象
     */
    static async detail(id) {
        const scope = "noPass";
        const user = await Users.scope(scope).findOne({
            where: {
                id
            }
        });
        if (!user) {
            return false;
        } else {
            return user;
        }
    }
}
exports = module.exports = {
   UsersServer
}