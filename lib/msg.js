/*
* created by liguang 
* @dec:描述消息的发送模型
 */

var redis = require('redis');
var db = redis.createClient();

function Msg(opt) {
	for(var key in opt){
		this[key] = opt[key];
	}
}

Msg.prototype = {
	save:function(fn) {//将JSON字符串保存到Redis列表中
		var self = this;
		var data = JSON.stringify(self);//将保存的消息转换成JSON字符串
		db.lpush('msg',data,function(err) {
			if(err) return fn(err);
			fn();
		})
	},
	getRange:function(from,to,fn) {
		db.lrange('msg',from,to,function(err,items){
			if(err) return fn(err);
			var arr = [];
			items.forEach(function(item) {
				arr.push(JSON.parse(item));//解码之前保存为JSON的消息记录
			});
			fn(null,arr);
		})
	},
	getTotal:function(fn) {
		db.llen('msg',fn);
	}
}

module.exports = Msg;