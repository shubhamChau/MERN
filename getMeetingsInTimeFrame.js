const Meetings = require("./meetingModel.js");


const getMeetingsInTimeFrame = async (req, res) => {
  try {
    const {start, end} = req.query;
    if (start>=end) return res.status(400).json({msg: "Start time should fall before end time"});

    const timeBoundMeetings = await Meetings.find({startTime: {$gte: start}, endTime: {$lte: end}});
    return res.status(200).json(timeBoundMeetings);

  }  catch (e) {
    return res.status(500).json({msg: e.message});
  }
};

module.exports = getMeetingsInTimeFrame;
