Course=require('../models/courseModel');
exports.index=function (req, res) {
  Course.get(function (err, courses) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Courses retrieved successfully",
      data: courses
    });
  });
};

exports.new=async function (req, res) {
  var course=new Course();

  course.courseName=req.body.courseName;
  course.courseOwnName=req.body.courseOwnName;

  course.save(function (err) {
    // Check for validation error
    if (err)
      res.json(err);
    else
      res.json({
        error: null,
        data: course
      });
  });
};
// Handle view course info
exports.view=function (req, res) {
  Course.findById(req.params.course_id, function (err, course) {
    if (err)
      res.send(err);
    res.json({
      message: 'Course details loading..',
      data: course
    });
  });
};
// Handle update course info
exports.update=function (req, res) {
  Course.findById(req.params.course_id, function (err, course) {
    if (err)
      res.send(err);
    course.courseName=req.body.courseName;
    course.courseOwnName=req.body.courseOwnName;
    course.save(function (err) {
      if (err)
        res.json(err);
      res.json({
        message: 'Course Info updated',
        data: course
      });
    });
  });
};

exports.delete=function (req, res) {
  Course.remove({
    _id: req.params.course_id
  }, function (err, course) {
    if (err)
      res.send(err);
    res.json({
      status: "success",
      message: 'Course deleted'
    });
  });
};
