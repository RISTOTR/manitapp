const express = require("express");
const _ = require("lodash");
const router = express.Router();
const User = require("../models/User");
const Offer = require("../models/Offer");
const loggedin = require("../utils/isAuthenticated");
const myOffer = require("../utils/myOffers");
const fields = Object.keys(_.omit(Offer.schema.paths, ["__v", "_id"]));

const googleMapsClient = require("@google/maps").createClient({
  key: process.env.GOOGLEAPI,
  Promise: Promise
});

//Retrive ALL
router.get("/", (req, res, next) => {
  Offer.find()
    .then(user => res.json(user))
    .catch(e => next(e));
});

//show one
router.get("/detail/:id", (req, res, next) => {
  Offer.findById(req.params.id)
  .populate("prof")
    .then(object => res.json(object))
    .catch(e => next(e));
});

// Create
router.post("/new", loggedin, (req, res, next) => {
  const prof = req.user.id;
  const {
    name,
    offerTitle,
    offerDescription,
    price,
    address,
    city,
    postalcode
  } = req.body;

  const geo = address + " " + city + " " + postalcode;
  googleMapsClient
    .geocode({ address: geo })
    .asPromise()
    .then(data => {
      lat = data.json.results[0].geometry.viewport.northeast.lat;
      lng = data.json.results[0].geometry.viewport.northeast.lng;
      var location = { type: "Point", coordinates: [lat, lng] };

      const newOffer = new Offer({
        name,
        offerTitle,
        offerDescription,
        price,
        prof,
        address,
        city,
        postalcode,
        location
      });

      newOffer
        .save()
        .then(user => res.status(200).json(user))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });
});

//Editar perfil

router.get("/edit/:id", loggedin, myOffer, (req, res, next) => {
  Offer.findById(req.params.id)
  .populate("prof")
    .then(offer => {
      console.log("entra");
      return res.status(200).json(offer);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

router.put("/edit/:id", loggedin, (req, res, next) => {
  if (req.user._id.toString() !== req.body.prof) {
    return res.status(500).json("Bad privileges");
  }
  const updates = _.pick(req.body, fields);
  Offer.findByIdAndUpdate(req.params.id, updates, { new: true })
    .then(offer => res.status(200).json(offer))
    .catch(err => {
      console.log(err);
      return res.status(500).json(err);
    });
});

//Borrar oferta

router.delete("/delete/:id", loggedin, (req, res, next) => {
  Offer.findById(req.params.id)
    .then(offer => {
      if (req.user._id.toString() == offer.user.toString()) {
        Offer.findByIdAndRemove(req.params.id)
          .then(offerDelete => res.status(200).json(offerDelete))
          .catch(err => {
            return res.status(500).json(err);
          });
      } else {
        return res
          .status(500)
          .json({ err: "You cannot delete other peoples profiles" });
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Retrieve Near you passing KM as a param
router.post("/near", (req, res, next) => {
  
  Offer.find({
    location: {
      $near: {
        $geometry: req.body.currentLocation,
        $minDistance: 10,
        $maxDistance: 1000
      }
    }
  }).then(offers => {
      return res.json(offers);
    })
    .catch(e => {
      console.log(e);
      next(e);
    });
});

router.get("/by-pro", (req, res, next) => {
  const { searchTerm,location } = req.query;
  console.log(location)
  let location2 = location.split(",").reverse().join(",")
  console.log(location2)
  
  Offer.find()
    .populate("prof")
    .then(offers => {
      let filteredOffers = _.pickBy(
        offers,
        e => e.prof.professionType == searchTerm
      );
      console.log(filteredOffers);
       res.status(200).json(filteredOffers);
    })
    .catch(e => console.log(e));
});

module.exports = router;
