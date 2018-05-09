const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User =require('../models/user');
const Ofertas =require('../models/ofertas');

const respuestasSchema = new schema ({
    offer: { type:Schema.Types.ObjectId, ref: 'Ofertas'},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    prof: { type: Schema.Types.ObjectId, ref: 'User' },
    postalCode: Number
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

  respuestasSchema.index({ location: "2dsphere" });

const Respuestas = mongoose.model('Respuestas', respuestasSchema);
module.exports = Respuestas;
