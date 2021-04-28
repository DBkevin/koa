/**
 * @descriptiion 用户数据访问对象
 * @author Lee
 */
const Models = require('../models/index');
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
            const user = {};
            const salt = bcrypt.genSaltSync(10);
            user.name = name;
            user.email = email;
            user.password = bcrypt.hashSync(password, salt);
            const userInfo = await Models.Users.create(user);
            return {
                userInfo
            }
        }
    }

    /**
     * 验证密码
     * @static
     * @memberof  UsersServer
     * @param     {string}    name             用户名
     * @param     {string}    plainPassword    用户密码
     *
     * @return    {(boolean|Object)}           错误或不存在返回false,正确返回包含用户信息的对象           
     */
    static async verify(name, plainPassword) {
        //查询用户是否存在
        const user = await Models.Users.findOne({
            where: {
                name:name
            }
        });
        if (!user) {
            return false;
        } else {
            console.log(user.password);
            let currPass = user.password;
            //验证密码是否正确
            const correct = bcrypt.compareSync(plainPassword, currPass);
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
     * @memberof UsersServer
     * @param     {int}    id    用户ID
     *
     * @return   {(boolean|object)}          不存在用户或错误,返回false,否则返回包含用户信息的对象
     */
    static async details(id,InClude='Posts') {
        const scope = "noPass";
        const user = await Models.Users.scope(scope).findOne({
            where: {
                id
            },
            include: [
                {
                    association: 'Posts',
                }
            ],
            order:[['Posts','id','desc']]
            
        }
        );
        if (!user) {
            return false;
        } else {
            return user;
        }
    }
    /**
     * 查找名称是否唯一
     *
     * @param     {string}   name    要查询的name
     * @memberof UsersServer
     * @return    {boolean}          存在返回true,否则返回false
     */
    static async isUniqueName(name) {
       const  isUni = await Models.Users.findOne({
            where: {
                name: name
            }
       })
        console.log(isUni);
        return isUni;
       
    }

    /**
     * 查找email是否唯一
     *
     * @param     {string}   name    要查询的email
     * @memberof UsersServer
     * @return    {boolean}          存在返回true,否则返回false
     */
    static async isUniqueEmail(email) {
       const isEmail = await Models.Users.findOne({
            where: {
                email: email
            }
        });
        console.log(isEmail);
        return isEmail;
    }
    /**
     * 更新密码
     *
     * @param     {string}    password    新密码
     * @param     {int}    id          要修改的用户ID
     *
     * @return    {(object|false)}         修改成功返回user对象,否则false       
     */
    static async updatePassword(password,id) {
         const salt = bcrypt.genSaltSync(10);
        let user = await Models.Users.update({ password: bcrypt.hashSync(password, salt) }, {
            where: {
                id: id
            }
        });
        return user;
    }
    static async getAll(page=1) {
        const pageSize = 5;

        const Users = await Models.Users.findAndCountAll({
            limit: pageSize,
            offset: (page - 1) * page,
        });
        return Users;
    }

}
exports = module.exports = {
    UsersServer
}
