/*
* created by liguang
* @dec :处理中间层的请求
 */

var express = require('express');
var User =    require('../lib/user');

exports.auth = express.basicAuth(User.prototype.authenticate);

exports.user = function(req,res,next) {
	User.prototype.get(req.params.id,function(err,user) {
		if(err) return next(err);
		if(!user.id) return res.send(404);
		res.JSON(user);
	})

}