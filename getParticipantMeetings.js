const Meetings = require("./meetingModel.js");


const getParticipantMeetings = async (req, res) => {
    try {
     const email = req.query.participant;


     //checking the validity of email
     if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
     return res.status(400).json({msg: "The email is not valid"});

    const meetings = await Meetings.find();

    const participantMeetings = meetings.filter(meet => {
      let emails = meet.participants.map(participant=> participant.email);
      if (emails.indexOf(email)>=0) return true;
      else return false;
    });

     return res.status(200).json(participantMeetings);

    } catch (e) {
      return res.status(500).json({msg: e.message});
    }
};

module.exports = getParticipantMeetings;
