//the various API calls  details are mentioned in README.txt.



const express = require("express");
const mongoose = require("mongoose");
const databaseURL= "mongodb+srv://shekhar201:shekhar201@cluster0.7mums.mongodb.net/split?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
const PORT = 5000;


const scheduler = require("./scheduler.js")
const getMeetingById = require("./getMeetingById.js");
const getMeetingsInTimeFrame = require("./getMeetingsInTimeFrame.js");
const getParticipantMeetings =  require("./getParticipantMeetings.js");

//listening for requests
app.listen(PORT);
console.log("Server running on port");

//connecting to database
mongoose.connect(databaseURL, {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err=>{
  if (err) throw err;
  console.log("connected to mongoDB");
});


//routing the various requests
app.post("/meetings", scheduler);
app.get("/meeting/:id", getMeetingById);

app.get("/meetings/", (req, res)=> {
  if (req.query.participant)  getParticipantMeetings(req, res);
  else if (req.query.start && req.query.end) getMeetingsInTimeFrame(req, res);
  else return res.status(400).json({msg: "please check the request API"});
});
