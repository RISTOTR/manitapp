const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User =require('../models/User');

const offerSchema = new Schema ({
    offerTitle: String,
    offerDescription: String,
    price: Number,
    prof: { type: Schema.Types.ObjectId, ref: 'User' },
    address: String,
    city: String,
    postalcode: String,
    location: { type: { type: String }, coordinates: [Number] }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

  offerSchema.index({ location: "2dsphere" });

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;