/*
* created by liguang 
*  @dec: 用于记录回话消息
 */

var express = require('express');
var res = express.response;

res.message = function(msg,type) {
  var type = type || 'info';
  var sess = this.req.session;
  sess.messages = sess.messages || [];
  sess.messages.push({type:type,string:msg});
}

res.error = function(msg) {
	return this.message(msg,'error');
}

module.exports = function(req,res,next) {
	res.locals.messages = req.session.messages || [];
	res.locals.removeMessages = function() {
		req.session.messages = [];
	}
	next();
}