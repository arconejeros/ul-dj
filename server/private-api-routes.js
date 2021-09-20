let router=require('express').Router();

router.get('/', function (req, res) {
  res.json({
    status: 'API OK',
    message: 'lml',
  });
});

var userController=require('./controllers/userController');
var courseController=require('./controllers/courseController');
var campaignController=require('./controllers/campaignController');
var mailController=require('./controllers/mailController');

router.route('/users')
  .get(userController.index)
  .post(userController.new);

router.route('/pass/:user_id')
  .patch(userController.updatePass)

router.route('/users/:user_id')
  .get(userController.viewDetails)
  .patch(userController.update)
  .put(userController.update)
  .delete(userController.delete);

router.route('/courses')
  .get(courseController.index)
  .post(courseController.new);


router.route('/courses/:student_id')
  .get(courseController.view)
  .patch(courseController.update)
  .put(courseController.update)
  .delete(courseController.delete);


router.route('/campaigns')
  .get(campaignController.index)
  .post(campaignController.new);


router.route('/campaigns/:campaign_id')
  .get(campaignController.view)
  .patch(campaignController.update)
  .put(campaignController.update)
  .delete(campaignController.delete);

router.route('/sendmail')
  .post(mailController.sendmail)

module.exports=router;
