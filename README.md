## 本示例要实现的功能
- 用户的注册登陆
- 用户个人信息的更改
- 使用管理员删除用户
- 发布微博
- 关注用户
- 查看用户的微博动态
# 安装项目
## *本示例使用自动热重载nodemon*
-----------
## 基础设置
###	安装 nodemon koa koa-bodyparser  koa-views ejs koa-static koa-router  mysql
	yarn add nodemon koa-bodyparser koa-views ejs koa-static koa-router mysql --save-dev
### 配置启动脚本
	在package.json的scripts中添加  "start":nodemon ./index.js" 
	然后就可以是用npm run statr 启动脚本了。由于使用了nodemon,修改后会自动重启
### 配置 koa
``` js
	 const koa=require('koa');
	 const app=new nka();
```
### 配置bodyparser
``` js
	const bodyParser = require('koa-bodyparser');
	app.use(bodyParser());
```
### 设置模板为ejs
### 配置静态页面并结合路由，用于测试
``` js
	const router = require("koa-router")();
	const views = require('koa-views');
	app.use(views(path.join(__dirname, './views'), {
	    extension: 'ejs',
	}));
	router.get('/', async (ctx, next) => {
   		await ctx.render('index', {
    	    title: '首页',
    	    msg: "欢迎来到我的博客"
    	});
	});
	router.get("/about", async (ctx, next) => {
    	await ctx.render('about', {
    	    title: '关于我们',
    	    msg: '关于我们xxxx'
    });
	});
	router.get("/help", async (ctx, next) => {
	    await ctx.render('help', {
	        title: '帮助页',
	        msg: '需要帮助？点击xxxz'
	    })
	});
	app.use(router.routes());
```
在views分别新建3个ejs文件，index.ejs,about.ejs,help.ejs 内容如下
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <%= title %>
    </title>
</head>

<body>
    <%= msg %>
</body>

</html>
```
打开浏览器分别输入 /about /help 就能看到页面了。表示我们已经完成了模板引擎和路由的配置。
#### 使用通用模板
 上面几个ejs文件内容基本重复，显得不够灵活。把多余的代码从视图里面抽取出来，单独创建一个默认模板来进行存放代码。
 在views 文件夹中新建一个common文件夹，并且新建一个default.ejs
 ``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <%= title %>
    </title>
</head>
 ```
 然后再刚才的三个视图文件里面写上
```html
	<%- include("common/default.ejs") %>

    <body>
        <%= msg %>
    </body>

    </html>
```
然后重新访问一下刚才的页面，发现效果一样。 关于ejs更多用法，[点击这里，查看文档](https://ejs.bootcss.com/)
## 配置样式
------------
本实例采用[bootstarp](https://www.bootcss.com/) 作为演示应用的前端框架。采用外部CDN方式引入css和JS文件.
打开 `common/default.ejs ` 在head 区域写上
```
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
<!-- jQuery and JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-LCPyFKQyML7mqtS+4XytolfqyqSlcbB3bvDuH9vX2sdQMxRonb/M3b9EmhCNNNrV" crossorigin="anonymous"></script>
```
这样就引入了bootstatpde 的css和 js以及jQuery.
接下来来更改基础页面的视图结构，为应用添加顶部导航、并加入帮助页和登录页的链接.
在 `common `新建head.ejs
``` html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand" href="/">Weibo App</a>
        <ul class="navbar-nav justify-content-end">
            <li class="nav-item"><a class="nav-link" href="/help">帮助</a></li>
            <li class="nav-item"><a class="nav-link" href="#">登录</a></li>
        </ul>
    </div>
</nav>
```
然后再 ` common/default.ejs `中引入 head.ejs
`    <%- include('head.ejs') %> `
修改index.ejs。添加
``` html	
    <div class="container">
        <div class="jumbotron">
            <h1>Hello node</h1>
            <p class="lead">
                你现在所看到的是 <a href="#">Koa.js 入门教程</a> 的示例项目主页。
            </p>
            <p>
                一切，将从这里开始。
            </p>
            <p>
                <a class="btn btn-lg btn-success" href="#" role="button">现在注册</a>
            </p>
        </div>
    </div>
```
刷新首页，查看效果如下：	
![首页示例图片_1][index_test_1Str]
现在看到样式已经出来，但是稍微不够用，我们引用自定义样式
先配置静态文件设置 ` koa-static `.  
_index.js_ 
``` js
const path=require('path');
const static = require('koa-static');
app.use(static(path.join(__dirname), './public'));
```
这样就把public 文件夹 当成静态文件处理。接下来新建一个public文件夹，并在下面分别创建 css js images 文件夹
再css文件夹下面新建一个app.css。样式如下：
``` css
body {
    font-size: 14px;
    font-weight: normal;
}
nav.navbar.navbar-expand-lg {
    margin-bottom: 20px;
}
```
并且在views/common/default.ejs 里面引入 app.css
`   <link rel="stylesheet" href="/public/css/app.css"> `
刷新首页即可看到效果.
接下来配置 底部通用模板，在view/common 新建footer.ejs.
``` html	
<footer class="footer">
    <img class="brand-icon" src="https://cdn.learnku.com/uploads/sites/KDiyAbV0hj1ytHpRTOlVpucbLebonxeX.png">
    <a href="#" target=_blank>
        刻意练习，每日精进
    </a>
    <div class="float-right">
        <a href="/about">关于</a>
    </div>
</footer>
```
设置footer的样式
_public/css/app.css_
``` css	
footer {
  margin-top: 45px;
  padding-top: 5px;
  border-top: 1px solid #eaeaea;
  color: #777;
  font-size: 13px;
  font-weight: bold;

  a {
    color: #555;
  }

  a:hover {
    color: #222;
  }

  img.brand-icon {
    width: 17px;
    height: 17px;
  }
}
```
接着在模板文件中引入footer
` <%- include('common/footer.ejs') %> `
重新刷新页面即可看到footer 已经被引入。
## 配置独立路由
之前的路由全部写在了index.js中，数量少还能看，数量过多就会成一团乱码，接下来，我们把路由给独立出来.
新建一个router 文件夹，这个文件夹作为所有路由的目录.在router文件夹里面新建一个index.js.作为总路由入口。
``` js
const router = require('koa-router');
module.exports = (app) => {
    router.get('/signup', require('./auth').signup);
    app.use(router.routes());
    app.use(router.allowedMethods());
}
```
以上代码，表示引入router组件，并且注册到app实例上.` router.get('/signup',require('./auth').signup) ` 我们把每个不同的模块给分成不同的文件.
然后通过router/index.js 引入即可。
接下来我们写注册登陆等功能。新建一个auth.js
```js
module.exports = {
    async signup(ctx, next) {
        await ctx.render("auth/signup", {
            title: '注册',
        });
    }
}
```
接下来在view下新建一个auth文件夹并新建signup.ejs。
``` html
<%- include("../common/default.ejs") %>
    <div class="container">
        <div class="offset-md-1 col-md-10">
            <h1>注册</h1>
            <%- include("../common/footer.ejs") %>
        </div>
    </div>
    </body>
    </htm>
```
接下来修改首页里面的注册按钮链接。
` <a class="btn btn-lg btn-success" href="/signup" role="button">现在注册</a> `
接下来要把主路由入口挂载到app上.打开index.js,引入主路由并挂载.
先把之前三个路由删除并移入到router/index.js 中。由于路由主入口引入了router组件，index.js 里面可以删掉
``` js
const Router = require('./router/index');
Router(app);
```
接下来刷线首页，点击现在注册，即可跳转到注册页.现在可以正常的跳转到注册页了，但是注册页还没有任何内容，接下来我们开始编辑注册表单.
打开 views/auth/signup.ejs.
``` html
<%- include("../common/default.ejs") %>
    <div class="container">
        <div class="offset-md-2 col-md-8">
            <div class="card ">
                <div class="card-header">
                    <h5>注册</h5>
                </div>
                <div class="card-body">
                    <form method="POST" action="/signup">
                        <div class="form-group">
                            <label for="name">名称：</label>
                            <input type="text" name="name" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label for="email">邮箱：</label>
                            <input type="text" name="email" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label for="password">密码：</label>
                            <input type="password" name="password" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label for="password_confirmation">确认密码：</label>
                            <input type="password" name="password_confirmation" class="form-control" value="">
                        </div>

                        <button type="submit" class="btn btn-primary">注册</button>
                    </form>
                </div>
            </div>
            <%- include("../common/footer.ejs") %>
        </div>
    </div>
    </body>

    </html>
```
刷新一下注册页，看看表单是否正常显示。
# 用户注册，登陆，修改信息
接下来。创建用户表单的sql结构。参考`sql/users.sql`文件.

## 配置mysql
#### 采取单独的配置文件来保存配置信息。 
    根目录新建`config`文件夹，并新建`index.js`.用于配置你的`mysql`链接信息。内容如下:
``` js
module.exports = {
    database: {
        dbName: 'blog1',
        dbHost: '你的地址',
        port: 3306,
        dbUser: '你的mysql帐号',
        dbPass: '你的mysql密码',
    }
}
```
*第一版不使用ORM*
### 开始配置mysql.新建core文件夹，并且新建db.js
  mysql 采取进程池模式，并且使用Prosemise 来进行同步读取插入。在跟目录下，新建一个 `core` 文件夹。里面新建一个 `db.js`. 用于mysql数据的增删改查。内容如下:
``` js
const { dbName, dbHost, port, dbUser, dbPass } = require('../config/index').database;
const mysql = require('mysql');
let pools = {};
//创建一个connection
query = (sql, host = "127.0.0.1") => {
    if (!pools.hasOwnProperty(host)) {
        pools[host] = mysql.createPool({
            host: dbHost,
            prot: port,
            user: dbUser,
            password: dbPass,
            database: dbName,
        });
    }
    return new Promise((resolve, reject) => {
        pools[host].getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, (err, result) => {
                    if (err) reject(err);
                    if (result.length === 0) {
                        resolve(false);
                    } else {
                        let string = JSON.stringify(result);
                        let data = JSON.parse(string);
                        resolve(data);
                    }
                    connection.release();
                });
            }
        });
    });
}
module.exports = query;
```
接下来处理注册页面传递来的数据。koa接收到的post参数并不是json格式的，使用`koa-bodyparser`转换为json。确认安装并引入`koa-bodyparser`
``` bash
yarn add kao-bodyparser
```
在`ctx.request.body`中就可以获取请求参数了,在入口文件`index.js`中引入`koa-bodyparser` 
```js
...
...
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
```
接下来，在`router/auth.js`中接收注册信息，并入库。密码加密方式使用`bcrypt` [点击这里，查看文档](https://www.npmjs.com/package/bcryptjs)
```js
const db = require('../core/db');
const bcrypt = require('bcryptjs');
module.exports = {
    async signup(ctx, next) {
        if (ctx.method === 'GET') {
            await ctx.render("auth/signup", {
                title: '注册',
            });
            return;
        }
        let { name, password, email } = ctx.request.body;
        //TODO对合法性验证
        let sql = `select * from users where name="${name}"`;
        let user = await db(sql);
        console.log(user);
        //对密码进行加密;
        if (!user) {
            // 生成salt
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            // 拼接新增语句
            let userSQL = `insert into blog1.users(NAME,PASSWORD,EMAIL) values("${name}","${password}","${email}")`;
            // 存储到数据库
            await db(userSQL).then((result) => {
                console.log(result);
                //TODO 自动登陆
                ctx.redirect('/');
            }).catch((err) => {
                console.log(err);
            });
        } else {
            ctx.redirect('/');
        }
    }
}
```





















