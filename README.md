## 本示例要实现的功能 ORM版
- 用户的注册登陆
- 用户个人信息的更改
- 使用管理员删除用户
- 发布微博
- 关注用户
- 查看用户的微博动态
# 安装项目
## *本示例使用自动热重载nodemon*
-----------
## sequelize 安装
```bash
 yarn add sequelize --save-dev
```
然后安装数据驱动(mysql)
```bash
yarn add mysql2 --save-dev
```
使用`sequelize-cli`来管理数据库.具体说明[查看教程](https://blog.csdn.net/qq_43850819/article/details/107234795)
## 简易`sequelize-cli`使用说明
安装`sequelize-cli`按下不表,开始配置`sequelize-cli`
1. 初始化`sequelize-cli` 
   1. 在项目根目录下新建`.sequelizerc`(可选,如果没有就默以根目录为基础目录)
   2. 输入`npx sequelize init` 初始化,并创建需要的目录.该命令会生成4个目录
	  1. --config :包含配置文件,它告诉CLI如何链接数据库
	  2. --models : 包含您的项目的所有模型,
	  3. --migrations : 包含所有迁移文件-数据表结构.
	  4. --seeders :包含所有[种子](https://demopark.github.io/sequelize-docs-Zh-CN/other-topics/migrations.html)文件.
   3. 配置`config/config.json` 来管理数据库.默认已经给我们添加了配置,自行吧数据库信息填充好即可
2. 新建第一个模型和数据表`users`
	1.`npx sequelize model:generate --name Users --attributes id:bigint,name:char,email:char,password:char`
	2. 在`models`下面会生成一个`users.js`.就是`users`的`model`.
	3. 在`migrations`下面会生成`xxxx(当前日期)-create-users.js`就是数据库迁移文件.
	4. 编辑`xxx-create-users.js`来确认最终生成的数据表`
	5. `npx sequelize db:migrate` 这样就导入了数据库
3. 在项目中使用`model`

