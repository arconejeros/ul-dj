let router=require('express').Router();

router.get('/', function (req, res) {
  res.json({
    status: 'API OK',
    message: 'lml',
  });
});

var userController=require('./controllers/userController');

router.route('/users')
  .get(userController.index)
  .post(userController.new);

router.route('/pass/:user_id')
  .patch(userController.updatePass)

router.route('/users/:user_id')
  .get(userController.view)
  .patch(userController.update)
  .put(userController.update)
  .delete(userController.delete);


module.exports=router;
