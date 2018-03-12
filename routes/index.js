var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('', function(req, res, next) {
  res.redirect('/msg/list');
});
router.get('404',function(req,res) {
	res.status('404').format({
		html:function() {
			res.render('404');
		},
		json:function() {
			res.send({message:"page not found!"});
		},
		xml:function() {
			res.write('<error>\n');
			res.write('  <message>page not found!</message>\n');
			res.write('</error>');
		},
		text:function() {
			res.send('page not found!')
		}
	});
})
module.exports = router;
