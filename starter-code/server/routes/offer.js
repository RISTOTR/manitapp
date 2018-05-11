const express = require("express");
const _ = require("lodash");
const router = express.Router();
const User = require("../models/User");
const Offer = require("../models/Offer");
const loggedin = require("../utils/isAuthenticated");
const myOffer = require("../utils/myOffers");
const fields = Object.keys(_.omit(Offer.schema.paths, ["__v", "_id"]));

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
    const prof = req.user.id;
    const {offerTitle, offerDescription}=req.body;
    // if (!user || !buddy || !from || !to) {
    //   return res.status(500).json({ message: "" });
    // }
   
   
    const newOffer = new Offer({
      offerTitle,
      offerDescription,
      prof
      
    });
  
    newOffer
      .save()
      .then(user => res.status(200).json(user))
      .catch(err => res.status(500).json(err));
  });
  
  


  //Editar perfil 

  router.get("/edit/:id", loggedin, myOffer, (req, res, next) => {
      
    Offer.findById(req.params.id)
      .then(user => {
        return res.status(200).json(user);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  });


router.put("/edit/:id", loggedin, (req, res, next) => {
    if (req.user._id.toString() !== req.body.prof){
        return res.status(500).json('Bad privileges');
    }
    const updates = _.pick(req.body, fields);
    console.log(updates)
    Offer.findByIdAndUpdate(req.params.id, updates, {new: true})
      .then(offer => res.status(200).json(offer))
      .catch(err => {
        console.log(err)
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
  


  module.exports = router;