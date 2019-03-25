var express = require('express');
var router = express.Router();
const data = require('./data.json')

/* GET users listing. */
router.get('/seller', function(req, res, next) {
  res.send(data.seller);
});
router.get('/goods', function(req, res, next) {
  res.send(data.goods);
});
router.get('/ratings', function(req, res, next) {
  res.send(data.ratings);
});


module.exports = router;
