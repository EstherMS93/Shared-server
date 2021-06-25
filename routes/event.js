var express = require('express');
var router = express.Router();
const eventModel = require("../models/eventModel");
// const uploader = require("../configs/cloudinary");

//Create an event and allow for file upload to cloudinary. Install cloudinary package and multer-storage for it to work properly

router.post("/", (req, res, next) => {
  const postEvent = { ...req.body };
//  if (req.file) {
//    postEvent.picture = req.file.path;
//  }
//console.log(postEvent);
  eventModel.create(postEvent)
    .then((eventModel) => {
      res.status(201).json(eventModel);
    })
    .catch(next);
});


//Get all the events in DB
router.get("/", (req, res, next) => {
  eventModel.find({})
    .then((eventList) => {
      res.status(200).json(eventList);
    })
    .catch(next);
});

//Get only one event
router.get("/:id", (req, res, next) => {
  eventModel.findById(req.params.id)
    .then((eventList) => {
      res.status(200).json(eventList);
    })
    .catch(next);
});

//Update one event with patch/put verb and handle the picture like in "post" route with uploader

router.patch("/:id", (req, res, next) => {
    const event = { ...req.body };

    eventModel.findById(req.params.id)
      .then((eventList) => {
        if (!eventList)
          return res.status(404).json({ message: "This event does not exist :(" });
      //  if (req.file) {
        //  event.picture = req.file.path;
       // }
        eventModel.findByIdAndUpdate(req.params.id, event, { new: true })
          .then((updatedEvent) => {
            return res.status(200).json(updatedEvent);
          })
          .catch(next);
      })
  }
);

//Delete route
      router.delete("/:id", (req, res, next) => {

        eventModel.findByIdAndDelete(req.params.id)
          .then(() => {
           return res.status(204).json({ message: "Your event has been successfully deleted" });
          })
          .catch(next);
      });

module.exports = router;
