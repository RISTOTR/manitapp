const express = require("express");
const _ = require("lodash");
const router = express.Router();
const User = require("../models/user");

const fields = Object.keys(_.omit(User.schema.paths, ["__v", "_id"]));

// Retrive ALL
router.get("/", (req, res, next) => {
  User.find()
    .then(user => res.json(user))
    .catch(e => next(e));
});

// Create
router.post("/", (req, res, next) => {
  const ph = _.pick(req.body, fields);
  User.create(ph)
    .then(user => res.json(user))
    .catch(e => next(e));
});

// Retrive DETAIL
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(e => next(e));
});

// Update
router.put("/:id", (req, res, next) => {
  const updates = _.pick(req.body, fields);

  User.findByIdAndUpdate(req.params.id, updates, { new: true })
    .then(user => res.json(user))
    .catch(e => next(e));
});

// Delete
router.delete("/:id", (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => res.json({ message: `SUCESSFUL DELETE ${req.params.id}` }))
    .catch(e => next(e));
});

module.exports = router;
