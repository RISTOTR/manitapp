const express = require("express");
const _ = require("lodash");
const router = express.Router();
const User = require("../models/User");
const Offer = require("../models/Offer");
const Hire = require("../models/Hire");
const loggedin = require("../utils/isAuthenticated");
const myHire = require("../utils/myHires");
const fields = Object.keys(_.omit(Hire.schema.paths, ["__v", "_id"]));

// new hire
router.post("/new/:idOffer", loggedin, (req, res, next) => {
  const { idOffer } = req.params;
  console.log(idOffer)
  const { user,address, date, observations, price } = req.body;
  console.log(address, date, observations, price);
   const newHire = new Hire({
      user,
      offer:idOffer,
      address,
      date,
      observations,
      price,
    });
  
    newHire
      .save()
      .then(hire => {
        console.log(hire)
        return res.status(200).json(hire)})
      .catch(err => res.status(500).json(err));
});

//   router.get("/new/:id_offer", loggedIn, (req, res, next) => {
//     const user = req.user.id;
//     const {id_offer} = req.params;
//     Reservation.findById(id_reserva)
//         .populate('user')
//         .populate('prof')
//         .populate('offer')
//         .then( reserva => res.status(200).json(reserva))
//         .catch((e) => res.status(500).json(e));
// });

// router.get("/", loggedin, (req, res, next) => {

//   Hire.findById({prof: req.params.id})
//     .then(hire => res.json(hire))
//     .catch(e => next(e));
// });

//get edit

router.get("/edit/:id", [loggedin, myHire], (req, res, next) => {
  Hire.findById(req.params.id)
    .then(hire => {
      console.log("entra");
      return res.status(200).json(hire);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

//edit
router.put("/edit/:id", loggedin, (req, res, next) => {
  console.log(req.user.id);
  console.log(req.user._id);
  if (req.user._id.toString() !== req.user.id) {
    return res.status(500).json("Bad privileges");
  }
  const updates = _.pick(req.body, fields);
  console.log(updates);
  Hire.findByIdAndUpdate(req.params.id, updates, { new: true })
    .then(offer => res.status(200).json(offer))
    .catch(err => {
      console.log(err);
      return res.status(500).json(err);
    });
});

// cambiar estado
// accepted or rejected
router.post("/status/:id", loggedin, (req, res, next) => {
  const { status } = req.body;

  var opts = { runValidators: true };
  Hire.findByIdAndUpdate(req.params.id, { status }, opts, { new: true })
    .then(hire => res.status(200).json(hire))
    .catch(err => res.status(500).json(err));
});

// router.post("/", (req, res, next) => {
//     user= req.params.user

//     const newHire = new Hire({
//       offer,
//       user,
//       address,
//       date,
//       observations,
//       price,
//       status
//     })

//     newHire.save()
//     .then( user => res.status(200).json(user))
//     .catch( err => res.status(500).json(err));
//   });

// router.get("/hires", loggedin, (req, res, next) => {
//     Hire.find({ user: req.user._id })
//       .then(hire => {
//         return res.status(200).json(hire);
//       })
//       .catch(err => {
//         return res.status(500).json(err);
//       });
//   });

module.exports = router;
