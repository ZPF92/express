const {Schema} = require('mongoose');

//定义用户的表结构,并输出
module.exports = new Schema({
	//用户名
	username : String,
	//密码
	password : String
});