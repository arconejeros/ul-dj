let router = require('express').Router();

router.get('/', function (req, res) {
  res.json({
    status: 'API OK',
    message: 'lml',
  });
});

var authController = require('./controllers/authController');

router.route('/auth/login')
  .post(authController.login);

module.exports = router;
