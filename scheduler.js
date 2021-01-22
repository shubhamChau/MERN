const Meetings = require('./meetingModel.js');
const uuid = require("uuid");


/**
request format: {
   title: "", participants: [{name: "", email: "", rsvp: ""}], startTime: "", endTime: ""
}
creation timestamp would be handled by the mongoose model while the meeting id will be generated inside the handler function
using uuid.
**/


const schedule = async (req, res) => {
  try {

    const {title, participants, startTime, endTime} = req.body;
    if (startTime>=endTime) return res.status(400).json({msg: "Meeting couldnt be scheduled as start time falls before end time"});
    if (participants.length<2) return res.status(401).json({msg: "There should be atleast 2 participants in the meeting"});

    const id = uuid.v4();

    const meetings = await Meetings.find();
    const emails = participants.map(p => p.email);
    let participant; let matchIndex;
    for (var i in meetings){
      for (var j in meetings[i].participants){
        participant = meetings[i].participants[j];
        if (participant.rsvp!="yes") continue;
        matchIndex = emails.indexOf(participant.email);
        if (matchIndex>=0) {
          if (startTime>=meetings[i].startTime && startTime<=meetings[i].endTime)
          return res.status(403).json({msg: "The meeting time is overlapping with another meeting time for " + participant.name + ". Hence meeting not scheduled."});

          if (endTime>=meetings[i].startTime && endTime<=meetings[i].endTime)
          return res.status(403).json({msg: "The meeting time is overlapping with another meeting time for " + participant.name + ". Hence meeting not scheduled."});

          if (startTime<=meetings[i].startTime && endTime>=meetings[i].endTime)
          return res.status(403).json({msg: "The meeting time is overlapping with another meeting time for " + participant.name + ". Hence meeting not scheduled."});
        }
      }
    }

    const newMeeting = new Meetings({id, title, participants, startTime, endTime});
    await newMeeting.save();
    return res.status(200).json(newMeeting);

  }  catch (e) {
    return res.status(500).json({msg: e.message});
  }
};

module.exports = schedule;
