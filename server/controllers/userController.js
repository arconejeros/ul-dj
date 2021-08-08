// userController.js
// Import user model
User=require('../models/userModel');
// Handle index actions
exports.index=function (req, res) {
  User.get(function (err, users) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Users retrieved successfully",
      data: users
    });
  });
};
// Handle create user actions
exports.new=async function (req, res) {
  var user=new User();
  user.name=req.body.name ? req.body.name : user.name;
  user.lastName=req.body.lastName ? req.body.lastName : user.lastName;
  user.email=req.body.email;
  user.profile=req.body.profile;
  user.zones=req.body.zones;
  user.password='123123';
  user.logged = false;
  const isEmailExist=await User.findOne({email: req.body.email});
  if (isEmailExist) {
    return res.status(400).json(
      {error: 'Email ya registrado'}
    )
  }
// save the user and check for errors
  user.save(function (err) {
    // Check for validation error
    if (err)
      res.json(err);
    else
      res.json({
        error: null,
        data: user
      });
  });
};
// Handle view user info
exports.view=function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err)
      res.send(err);
    res.json({
      message: 'User details loading..',
      data: user
    });
  });
};
// Handle update user info
exports.update=function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err)
      res.send(err);
    user.name=req.body.name ? req.body.name : user.name;
    user.lastName=req.body.lastName ? req.body.lastName : user.lastName;
    user.email=req.body.email;
    user.profile=req.body.profile;
    user.zones=req.body.zones;
// save the user and check for errors
    user.save(function (err) {
      if (err)
        res.json(err);
      res.json({
        message: 'User Info updated',
        data: user
      });
    });
  });
};
//Update Password
exports.updatePass=function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err)
      res.send(err);
    user.password=req.body.password;
    user.logged = true;
// save the user and check for errors
    user.save(function (err) {
      if (err)
        res.json(err);
      res.json({
        message: 'User Info updated',
        data: user
      });
    });
  });
};
// Handle delete user
exports.delete=function (req, res) {
  User.remove({
    _id: req.params.user_id
  }, function (err, user) {
    if (err)
      res.send(err);
    res.json({
      status: "success",
      message: 'User deleted'
    });
  });
};
