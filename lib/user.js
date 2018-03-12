/*
* created by liguang 2018=03-08
* @model: 用户模型
* @dec: 用于用户的登录，注册，展示等引用
*/

var redis = require('redis');
var bcrypt = require('bcrypt');
var db = redis.createClient();

function User(opts) {
  for(var key in opts){
  	this[key] = opts[key];
  }
}
User.prototype = {
	save:function(fn) {
		var self = this;
		if(self.id){//用户已经存在
			self.update(fn);
		}else{//用户不存在
			db.incr('user:ids',function(err,id) {//创建唯一ID 
				if(err) return fn(err);
				self.id = id;//设定ID，以便保存
				self.hashPassword(function(err) {//对密码哈希
					if(err) return fn(err);
					self.update(fn);
				});
			})
		}
	},
	update:function(fn) {
		var self = this;
		var id = self.id;
		db.set('user:id:'+self.name,id,function(err) {//用名称索引用户ID 
			if(err) return fn(err);
			db.hmset('user:'+id,self,function(err) {
				fn(err);
			})
		})
	},
	hashPassword:function(fn) {//对密码加哈希
		var self = this;
		bcrypt.genSalt(12,function(err,salt) {
			if(err) return fn(err);
			self.salt = salt;
			bcrypt.hash(self.pass,salt,function(err,hash) {
				if(err) return fn(err);
				self.pass = hash;
				self.update(fn);
			})
		})
	},
	getByName:function(name,fn) {//根据用户查找用户id
		var self = this;
		self.getId(name,function(err,id) {
			if(err) return fn(err);
			self.get(id,fn);
		})
	},
	getId:function(name,fn) {
		db.get('user:id:'+name,fn);
	},
	get:function(id,fn) {
		db.hgetall('user:'+id,function(err,user) {
			if(err) return fn(err);
			fn(null,new User(user));//将普通对象转换成新的User对象
		})
	},
	authenticate:function(name,pass,fn) {//验证用户信息
		var self = this;
		self.getByName(name,function(err,user) {
			if(err) return fn(err);
			if(!user.id) return fn();
			bcrypt.hash(pass,user.salt,function(err,hash) {
				if(err) return fn(err);
				if(user.pass === hash) return fn(null,user);
				fn();
			})
		})
	},
	getInfo:function() {
		var self = this;
		return {
			id:self.id,
			name:self.name
		}
	}
}

module.exports = User;
