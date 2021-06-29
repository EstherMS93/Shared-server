var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const eventModel = require("../models/eventModel");


router.post("/", (req, res, next) => {
  const postEvent = { ...req.body };
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
    console.log(req.body)
    eventModel.findById(req.params.id)
      .then((eventList) => {
        if (!eventList)
          return res.status(404).json({ message: "This event does not exist :(" });

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
          .then((deletedEvent) => {
           return res.status(204).json(deletedEvent);
          })
          .catch(next);
      });

module.exports = router;
