// campaignModel.js
var mongoose=require('mongoose');
// Setup schema
var campaignSchema=mongoose.Schema({
  users: [
    {
      type: mongoose.Types.ObjectId,
    }
  ],
  course: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

let Campaign=module.exports=mongoose.model('campaign', campaignSchema);

module.exports.get=function (callback, limit) {
  Campaign.find(callback).limit(limit);
}


module.exports.get=function (callback, limit) {
  // User.find(callback).limit(limit);
  return Campaign.aggregate([
    {
      '$lookup': {
        'from': 'users',
        'localField': 'users',
        'foreignField': '_id',
        'as': 'users'
      },
    },
    {
      '$lookup': {
        'from': 'courses',
        'localField': 'course',
        'foreignField': '_id',
        'as': 'course'
      },
    },
    {
      "$project": {
        "users": 1,
        "create_date": 1,
        "course": { "$arrayElemAt": [ "$course", 0 ] }
      }
    }
  ]).then((locals, error) => {
    callback(locals, error)
  })
}
