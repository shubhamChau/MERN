const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  participants: [{
      name: {type: String, trim: true, required: [true, "name of the participant required"]},
      email: {type: String,
              match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ,
              trim: true,
              required: [true, "email of the participant required"] },
      rsvp: {type: String, enum: ["yes", "no", "maybe", "not answered"], required: [true, "rsvp of participant required"]}
  }],

  //custom validation is used for startTime
  startTime: {
    type: String,
    required: [true, "startTime required in the format dd-mm-yyyy||aa:bb"],
    trim: true,
    vaidate: {
      validator: function (v){
          let [date, time] = v.split("||");

          if (! /[0-9]{2}-[0-9]{2}-[0-9]{4}/.test(date)) return false;
          if (! /[0-9]{2}:[0-9]{2}/.test(time)) return false;


          let dateParts = date.split("-");
          let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

          if (dateParts[1]<=0 || dateParts[1]>12) return false;
          if (dateParts[0]<=0 || dateParts[0]>monthDays[+(dateParts[1]) - 1]) return false;
          if (dateParts[2]<2021) return false;

          let timeParts = time.split(":");
          if (timeParts[0]<0 || timeParts[0]>23) return false;
          if (timeParts[1]<0 || timeParts[1]>59) return false;

          return true;
      },
      message: props => "startTime required in the format dd-mm-yyyy||aa:bb"
    }
  },

  //custom validation is used for endTime
  endTime: {
    type: String,
    required: [true, "endTime required in the format dd-mm-yyyy||aa:bb"] ,
    trim: true,
    validate: {
      validator: function (v){
        let [date, time] = v.split("||");

        if (! /[0-9]{2}-[0-9]{2}-[0-9]{4}/.test(date)) return false;
        if (! /[0-9]{2}:[0-9]{2}/.test(time)) return false;


        let dateParts = date.split("-");
        let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        if (dateParts[1]<=0 || dateParts[1]>12) return false;
        if (dateParts[0]<=0 || dateParts[0]>monthDays[+(dateParts[1]) - 1]) return false;
        if (dateParts[2]<2021) return false;



        let timeParts = time.split(":");
        if (timeParts[0]<0 || timeParts[0]>23) return false;
        if (timeParts[1]<0 || timeParts[1]>59) return false;

        return true;
      },
      message: props => "endTime required in the format dd-mm-yyyy||aa:bb"
    }
  }
},  {
  timestamps: true
});

module.exports = mongoose.model("Meetings", meetingSchema);
