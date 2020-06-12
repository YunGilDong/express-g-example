var express = require('express');
const { json } = require('express');
var router = express.Router();
const mdbConn = require('../mariadb/database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('GET home page');
  res.send('hello world');  
});

module.exports = router;