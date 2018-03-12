var User = require('../lib/user');
var Msg = require('../lib/msg');

var _user;
var routes = {
	'user':{//用户路由控制
		'register':{
			'form':function(req,res) {
				res.render('register',{title:"用户注册"})
			},
			'submit':function(req,res,next) {
				var data = req.body;
				User.prototype.getByName(data.name,function(err,user) {
					if(err) return next(err);
					if(user.id){//如果用户存在
						res.error("用户名已被占用！");
						res.redirect('back');
					}else{
						_user = new User({
							name:data.name,
							pass:data.pass
						});
						_user.save(function(err,fn) {
							if(err) return next(err);
							req.session.uid = _user.id;
							res.redirect('/');
						})
					}
				})
			}
		},
		'login':{
			'form':function(req,res) {
				res.render('login',{title:"会员登录"})
			},
			'submit':function(req,res,next) {
				var data = req.body;
				User.prototype.authenticate(data.name,data.pass,function(err,user) {
					if(err) return next(err);
					if(user){
						req.session.uid = user.id;
						res.redirect('/');
					}else{
						res.error("对不起，用户名不存在！");
						res.redirect('back');
					}
				})
			},
			'logout':function(req,res){
				req.session.destroy(function(err) {
					if(err) return next(err);
					res.redirect('/');
				})
			}
		}
	},
	'msg':{
		'list':{
			'show':function(req,res,next) {
				var page = req.page;
				Msg.prototype.getRange(page.from,page.to,function(err,data) {
					res.render('msg-list',{
						title:"消息列表",
						data:data
					})
				})
			}
		},
		'add':{
			'form':function(req,res,next) {
				res.render('msg-add',{
					title:"添加消息"
				})
			},
			'submit':function(req,res,next) {
				var data = req.body;
				var item = new Msg({
					'title':data.title,
					'content':data.content,
					'author':res.locals.user.name
				});
				item.save(function(err) {
					if(err) return next(err);
					console.log('******************')
					res.redirect('/msg/list');
				});
			}
		}
	}
}

module.exports = routes;