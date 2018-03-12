/*
* created by liguang
* @dec:用于各种验证的中间件操作
 */
module.exports = {
	required:function(field) {
		return function(req,res,next) {
			var data = req.body[field];
			console.log(data)
			if(data.length === 0){
				res.error(field+"字段是必填项！");
				res.redirect('back');
			}else{
				next();
			}
		}
	},
	maxLen:function(field,min,max) {
		return function(req,res,next) {
			var data = req.body[field];
			console.log(data.length,max,min)
			if(data.length <min || data.length > max){
				res.error("内容字符数限制在"+min+"至"+max+"个字符之间");
				res.redirect('back');
			}else{
				next();
			}
		}
	}
}