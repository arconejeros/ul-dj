// userController.js
// Import user model

const _=require('lodash');
User=require('../models/userModel');
Course=require('../models/courseModel');
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
  user.rut=req.body.rut;
  user.profile=req.body.profile;
  user.zones=req.body.zones;
  user.password='123123';
  user.logged=false;
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

exports.viewDetails=async function (req, res) {
  User.aggregate([
    {
      '$lookup': {
        'from': 'campaigns',
        'localField': '_id',
        'foreignField': 'users',
        'as': 'campaigns'
      },
    },
    {
      "$project": {
        "_id": 1,
        "create_date": 1,
        "name": 1,
        "lastName": 1,
        "email": 1,
        "rut": 1,
        "profile": 1,
        "password": 1,
        "logged": 1,
        "campaigns": 1,
      }
    },
    {
      '$lookup': {
        'from': 'courses',
        'localField': 'campaigns.course',
        'foreignField': '_id',
        'as': 'campaignss'
      },
    },
  ]).then(async (user, error) => {
    const filtered=user.find(el => el._id.toString() === req.params.user_id.toString());
    // const idString = filtered[0].curso.course.toString();
    // console.log("idString", idString)
    // const asdddd = await Course.findOne({"_id": idString});
    // return {...filtered[0], curso: {...filtered[0].curso, ...asdddd._doc}};

    let retorno ={...filtered, campaigns: _.merge(filtered.campaigns, filtered.campaignss)}
    delete retorno.password;
    delete retorno.campaignss;
    return retorno;
  }).then((qwe, error) => {
    if (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
    res.json({
      status: "success",
      message: "User By id retrieved successfully",
      data: qwe
    });
  })
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
    user.logged=true;
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
