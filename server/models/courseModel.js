// courseModel.js
var mongoose=require('mongoose');
// Setup schema
var courseSchema=mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  courseOwnName: {
    type: String,
    required: true
  },
});

let Campaign=module.exports=mongoose.model('course', courseSchema);

module.exports.get=function (callback, limit) {
  Campaign.find(callback).limit(limit);
}
