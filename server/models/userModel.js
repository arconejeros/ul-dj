// userModel.js
var mongoose=require('mongoose');
// Setup schema
var userSchema=mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rut: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  profile: {
    type: String,
  },
  region: {
    type: String,
  },
  commune: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 1
  },
  logged: {
    type: Boolean
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

let User=module.exports=mongoose.model('user', userSchema);

module.exports.get=function (callback, limit) {
  User.find(callback).limit(limit);
}
module.exports.getOne=function (callback, limit) {
  // User.find(callback).limit(limit);
  return User.aggregate([
    {
      '$lookup': {
        'from': 'campaigns',
        'localField': '_id',
        'foreignField': 'users',
        'as': 'asds'
      },
    },
  ]).then((locals, error) => {
    callback(locals, error)
  })
}
