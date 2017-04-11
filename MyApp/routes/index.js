var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');

/* GET home page. */
router.get('/', function (req, res, next) {
  mongoClient.connect("mongodb://localhost:27017/mwa", function (err, db) {
    if (err) throw err;
      db.collection('homework7').findOne({}, function (err, doc) {
        if (err) throw err;
        
        const decipher = crypto.createDecipher('aes256', 'asaadsaad');
        const encrypted = doc.message;
        
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        console.dir(doc.message);
        console.log(decrypted);

        res.render('index', { title: 'Express', message: decrypted });
        res.end();
      });
  });
  
});

module.exports = router;
