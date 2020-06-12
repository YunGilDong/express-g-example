var express = require('express');
const { json } = require('express');
var router = express.Router();
const mdbConn = require('../mariadb/database.js');

/* GET group */
router.get('/', function(req, res, next) {

  mdbConn.getGroup()
  .then((rows) => {
    console.log(rows);
    res.json(rows);
  })
  .catch((errMsg) => {
    console.log(errMsg);
  });  
});

module.exports = router;