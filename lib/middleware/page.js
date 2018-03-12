/*
* created by liguang
* @dec:分页中间件
* @params：
* 	pageIndex   :  页面索引
* 	pagesize    :  页面大小
* 	from        :  起始页码
* 	to          :  终止页码
* 	total       :  总记录数
* 	pageCount   :  总页码数目
 */

module.exports = function(fn,pagesize) {
  var pagesize    = pagesize || 10;
  return function(req,res,next) {
     var pageIndex   = req.param('page') || 1;
     fn(function(err,total) {
     	if(err) return next(err);
     	var pageCount = Math.ceil(total/pagesize);
     	req.page = res.locals.page = {
     		pageIndex:pageIndex,
     		pagesize:pagesize,
     		total:total,
     		pageCount:pageCount,
     		from:(pageIndex - 1)*pagesize,//索引从0开始
     		to:pageIndex == pageCount ? total-1 : pageIndex*pagesize -1
     	};
     	next();
     });    
  }
}

