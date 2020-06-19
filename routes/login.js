var express = require('express');
var router = express.Router();

/* post login listing. */
router.post('/', function(req, res) {
    console.log('post login root!');
    console.log('body', req.body);
    console.log('body data',req.body.data);
    res.json(req.body);
    
});

// router.get('/', function (req, res) {
//     res.send('POST request to the homepage');
//   });

router.get('/', function(req, res, next) {
    console.log('get login!');
    console.log('body', req.body);
    //res.send(req);
    res.end();
});




module.exports = router;