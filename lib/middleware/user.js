/*
* creared by liguang 
*  @dec : 用于获取用户状态的中间件
*  
 */
var User = require('../user');
module.exports = function(req,res,next) {
  var uid = req.session.uid;
  if(!uid) return next();
  User.prototype.get(uid,function(err,user){
  	if(err) return next(err);
  	req.user = res.locals.user = user;
  	next();
  })
}