const express = require('express');

const router = express.Router();

const User = require('../module/User');


let responseData;
router.use((req,res,next) => {
	responseData = {
		code : 0,
		message : ''
	};
	next();
});
//用户注册逻辑
/*
	1.用户名是否已经被注册
*/
router.post('/user/register',(req,res,next) => {
	let {
		username,
		password,
		repassword
	} = req.body; 

	//数据库查询
	User.findOne({
		username : username
	}).then(userInfo => {
		if(userInfo){
			responseData.code = 4;
			responseData.message = '用户名已经被注册';
			res.json(responseData);
			return;
		}else{
			let user = new User({
				username : username,
				password : repassword
			});
			return user.save();
		}
	}).then(newUserInfo => {
		responseData.message = '注册成功';
		res.json(responseData);
		return;
	});
});

module.exports = router;