const express = require("express");
const _ = require("lodash");
const router = express.Router();
const User = require("../models/User");
const loggedin = require("../utils/isAuthenticated");


const fields = Object.keys(_.omit(User.schema.paths, ["__v", "_id"]));

//Retrive ALL
// router.get("/", (req, res, next) => {
//   User.find()
//     .then(user => res.json(user))
//     .catch(e => next(e));
// });

// router.get("/:id", (req, res, next) => {
//   User.findById(req.params.id)
//     .then(user => res.json(user))
//     .catch(e => next(e));
// });

//Show profile of User
router.get("/profile", loggedin, (req, res, next) => {
  User.findById(req.user._id)
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Create
// router.post("/", (req, res, next) => {
//   const ph = _.pick(req.body, fields);
//   User.create(ph)
//     .then(user => res.json(user))
//     .catch(e => next(e));
// });



// Update
router.put("/edit", loggedin, (req, res, next) => {
  const updates = _.pick(req.body, fields);

User.findByIdAndUpdate(req.user._id, updates, {new: true})
  .then(userEdit => res.status(200).json(userEdit))
  .catch(err => res.status(500).json(err));
});

// Delete
router.delete ("/delete", loggedin, (req, res, next) => {

  User.findByIdAndRemove(req.user._id)
    .then(userDelete => res.status(200).json(userDelete))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
