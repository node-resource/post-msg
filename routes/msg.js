var express = require('express');
var router = express.Router();
var Handle = require('./route-handle');
var Msg = require('../lib/msg');

var Validate = require('../lib/middleware/validate');
var Page = require('../lib/middleware/page');

/* 消息列表. */
router.get('/list/:page?', Page(Msg.prototype.getTotal,3), Handle.msg.list.show);//?代表路由参数page是可选的，可以通过req.param('page')拿到参数

/* 添加消息 */
router.get('/add', Handle.msg.add.form);
// 通过中间件加验证
router.post('/add', Validate.required('title'),Validate.maxLen('content',1,50),Handle.msg.add.submit);



module.exports = router;
