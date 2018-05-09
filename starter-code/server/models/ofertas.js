const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User =require('../models/user');

const ofertasSchema = new schema ({
   // offerDate: Date,
    offer: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    prof: { type: Schema.Types.ObjectId, ref: 'User' },
    //location: { type: { type: String }, coordinates: [Number] }
    //postalCode: Number
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

  ofertasSchema.index({ location: "2dsphere" });

const Ofertas = mongoose.model('Ofertas', ofertasSchema);
module.exports = Ofertas;

