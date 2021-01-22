const Meetings = require("./meetingModel.js");


const getMeetingById = async (req, res) => {
    try {
      const id = req.url.split("/").pop();

      const meeting = await Meetings.findOne({id: id});
      res.status(200).json(meeting);

    } catch (e) {
      return res.status(500).json({msg: e.message});
    }
};

module.exports = getMeetingById;
