Campaign=require('../models/campaignModel');

exports.index=function (req, res) {
  Campaign.get(function (campaigns, err) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Campaigns retrieved successfully",
      data: campaigns
    });
  });
};
// Handle create campaign actions
exports.new=async function (req, res) {
  var campaign=new Campaign();
  campaign.course=req.body.course;
  campaign.users=req.body.users;
  campaign.save(function (err) {
    if (err)
      res.json(err);
    else
      res.json({
        error: null,
        data: campaign
      });
  });
};
// Handle view campaign info
exports.view=function (req, res) {
  Campaign.findById(req.params.campaign_id, function (err, campaign) {
    if (err)
      res.send(err);
    res.json({
      message: 'Campaign details loading..',
      data: campaign
    });
  });
};
// Handle update campaign info
exports.update=function (req, res) {
  Campaign.findById(req.params.campaign_id, function (err, campaign) {
    if (err)
      res.send(err);
    campaign.course=req.body.course;
    campaign.users=req.body.users;
    campaign.save(function (err) {
      if (err)
        res.json(err);
      res.json({
        message: 'Campaign Info updated',
        data: campaign
      });
    });
  });
};
// Handle delete campaign
exports.delete=function (req, res) {
  Campaign.remove({
    _id: req.params.campaign_id
  }, function (err, campaign) {
    if (err)
      res.send(err);
    res.json({
      status: "success",
      message: 'Campaign deleted'
    });
  });
};
