var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const commentModel = require("../models/commentModel");

router.post("/", (req, res, next) => {
    const comment = { ...req.body };
    //console.log(postComment);
    commentModel.create(comment)
        .then((commentModel) => {
            res.status(201).json(commentModel);
        })
        .catch(next);
});

//We can write whatever we want in the promise parameters, but it can't be empty. Otherwise, it does not return the results.
router.get("/", (req, res, next) => {
    commentModel.find({})
        .then((comments) => {
            res.status(200).json(comments);
        })
        .catch(next);
});

router.get("/:id", (req, res, next) => {
    commentModel.findById(req.params.id)
      .then((comments) => {
        res.status(200).json(comments);
      })
      .catch(next);
  });
//We req body to post new information. 

router.patch("/:id", (req, res, next) => {
    const comment = { ...req.body };
    console.log(req.body)
    commentModel.findById(req.params.id)
        .then((comments) => {
            if (!comments)
                return res.status(404).json({ message: "No comments so far" });;
        });

    commentModel.findByIdAndUpdate(req.params.id, comment, { new: true })
        .then((updatedComment) => {
            return res.status(200).json(updatedComment);
        })
        .catch(next);
});

//In the delete route, the parameters can be empty since we have no content to return. Hence, status 204 (no content).
router.delete("/:id", (req, res, next) => {

    commentModel.findByIdAndDelete(req.params.id)
        .then(() => {
            return res.status(204).json();
        })
        .catch(next);
});

module.exports = router;