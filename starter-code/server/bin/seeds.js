require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

mongoose.connect(process.env.DBURL).then(() => {
  useMongoClient: true;
});

const User = require("../models/user");
const Hire = require("../models/hire");
const Offer = require("../models/offer");

const users = [
  {
    username: "Ripuli",
    password: bcrypt.hashSync("password", 10),
    name: "Risto",
    lastname: "Tapani",
    telephone: 666555444,
    ifProf: false,
    professionType: "Plumber",
    userTags: [],
    imgProfile:
      "http://www.lg.com/us/mobile-phones/g7-thinq/images/g7-lockup.png",
    location: {
      type: "Point",
      coordinates: [40.4378698, -3.8196207]
    }
  }
];

const offers = [
  {
    offerTitle: "Plumber",
    offerDescription: "Professional plumber in Madrid",
    price: 45,
   // prof: { type: Schema.Types.ObjectId, ref: "User" }
  }
];

const hires = [
  {
    //offer: { type: Schema.Types.ObjectId, ref: "Offer" },
    //user: { type: Schema.Types.ObjectId, ref: "User" },
    address: "Feliciana",
    //date: Date,
    observations: "cheap"
  }
];

User.create(users, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${users.length} users`);
});

Offer.create(offers, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${offers.length} offers`);
});

Hire.create(hires, err => {
    if (err) {
      throw err;
    }
    console.log(`Created ${hires.length} hires`);
  });
