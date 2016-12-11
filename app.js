//加载express模块
const express = require('express');
//加载模版处理模块
const swig = require('swig');
//加载数据库模块
const mongoose = require('mongoose');
//加载body-parser,用来处理post提交过来的数据
const bodyParser = require('body-parser');

//创建app应用
let app = express();
//设置静态文件托管
//当用户访问的url以public开始，那么直接返回__dirname+'/public'下的文件 
app.use('/public',express.static(__dirname+'/public'));
//配置应用模板
/*
	1.定义当前应用所使用的模板引擎
	第一个参数：模板引擎的名称，同时也是文件的后缀
	第二个参数：表示用于处理模板内容的方法
*/
app.engine('html',swig.renderFile);
/*
	2.设置模板文件存放目录
	第一个参数必须是views
	第二个参数是目录
*/
app.set('views','./views');
/*
	3.注册所使用的模板
	第一个参数必须是view engine
	第二个参数必须和app.engine方法中定义的模板名称是一致的
*/
app.set('view engine','html');
//开发过程中，需要取消模板缓存
swig.setDefaults({
	cache:false
});
//加载中间件bodyparser,设置
app.use(bodyParser.urlencoded({
	extended : true
}));

//配置路由,分模块开发
//后台处理模块
app.use('/admin',require('./routers/admin'));
//接口模块
app.use('/api',require('./routers/api'));
//前台展示模块
app.use('/',require('./routers/main'));

//连接数据库，并监听8080端口
mongoose.connect('mongodb://localhost:8888/blog',(err) => {
	if(err){
		console.log('数据库链接失败');
	}else{
		console.log('数据库链接成功');
		app.listen(8080);
	}
});

























