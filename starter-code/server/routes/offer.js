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

// router.get("/offers", loggedin, (req, res, next) => {
//     Offer.find({ user: req.user._id })
//       .then(offer => {
//         return res.status(200).json(offer);
//       })
//       .catch(err => {
//         return res.status(500).json(err);
//       });
//   });

//show one
router.get("/:id", (req, res, next) => {
  Offer.findById(req.params.id)
    .then(object => res.json(object))
    .catch(e => next(e));
});

// Create
router.post("/new", loggedin, (req, res, next) => {
  console.log(req.body);
  const prof = req.user.id;
  const {
    offerTitle,
    offerDescription,
    price,
    address,
    city,
    postalcode
    //location,
    } = req.body;

    

  const newOffer = new Offer({
    offerTitle,
    offerDescription,
    price,
    prof,
    address,
    city,
    postalcode
   // location,
     
  });
      
  newOffer
    .save()
    .then(user => res.status(200).json(user))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    });
  
});


//Editar perfil

router.get("/edit/:id", loggedin, myOffer, (req, res, next) => {
  Offer.findById(req.params.id)
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
  console.log(updates);
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

router.get('/near', function(req, res) {
  // Process the data received in req.body
  res.redirect('3000');
});

// Retrieve Near you passing KM as a param
router.post("/near/:km", (req, res, next) => {
  console.log("Retrieve near you");
  console.log(req.body.currentLocation.coordinates);
  if(req.params.km == undefined || req.params.km > 3000 ){
    req.params.km = 3000;
  }
   Offer.find({
     "location": {
       "$near": {
         "$geometry": {
           "type": "Point",
           "coordinates":req.body.currentLocation.coordinates
        },
         "$maxDistance": req.params.km
       }
    }
    })

  .then(objects => res.json(objects))
  .catch(e => next(e));
});

module.exports = router;
