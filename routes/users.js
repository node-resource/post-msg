var express = require('express');
var router = express.Router();
var Handle = require('./route-handle');

//var api = require('./api');

/* 用户相关路由. */

//注册
router.get('/register', Handle.user.register.form);
router.post('/register', Handle.user.register.submit);

//登录
router.get('/login', Handle.user.login.form);
router.post('/login', Handle.user.login.submit);
router.get('/logout', Handle.user.login.logout);

//获取用户信息
//router.get('/:id',api.user);

module.exports = router;
