const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const eventSchema = new Schema({

  name: String,
  picture: {
    type: String,
    default: "https://www.housingeurope.eu/image/167/sectionheaderpng/events.png"
  },
  category: {
    type: String,
    enum: ["Social", "Cultural", "Networking", "Sports"]
  },
  organizer: String,
  poster: String,
  where: String,
  when: Date,
  upcoming: {
    type: String,
    enum: ["Yes", "No"]
  },
},
  { timestamps: true }
);



const eventModel = mongoose.model("event", eventSchema);

module.exports = eventModel;