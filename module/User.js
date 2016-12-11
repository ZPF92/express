const mongoose = require('mongoose');
//加载表结构
const usersSchema = require('../schemas/users');
//创建模型类，并输出
module.exports = mongoose.model('User',usersSchema);