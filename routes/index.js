const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    icon: 'DDS',
    title: 'DDS | Station Service des Alpes',
  });
});

module.exports = router;
