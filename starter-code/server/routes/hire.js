const express = require("express");
const _ = require("lodash");
const router = express.Router();
const User = require("../models/User");
const Offer = require("../models/Offer");
const Hire = require("../models/Hire");
const loggedin = require("../utils/isAuthenticated");
const fields = Object.keys(_.omit(Hire.schema.paths, ["__v", "_id"]));

router.post("/", (req, res, next) => {
    user= req.params.user
      
    const newHire = new Hire({
      offer,
      user,
      address,
      date,
      observations,
      price,
      status
    })
  
    
  
    newHire.save()
    .then( user => res.status(200).json(user))
    .catch( err => res.status(500).json(err));
  });

router.get("/offers", loggedin, (req, res, next) => {
    Offer.find({ user: req.user._id })
      .then(offer => {
        return res.status(200).json(offer);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  });

  module.exports = router;