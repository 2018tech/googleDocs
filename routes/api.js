var express = require('express');
var router = express.Router();
router.get('/hi', function(req, res){
  res.send('hi')
})
module.exports = router
