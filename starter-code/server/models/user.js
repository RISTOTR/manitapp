const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  lastname: String,
  isProf: {type:Boolean, default:false},
  professionaType: {type: String, enum:["Electrician", "Plumber", "Persianero", "Other"]},
  imgProfile: {
    type: String,
    // default:
    //   "http://res.cloudinary.com/deavo73zk/image/upload/v1524561053/anonimo-icon.png"
  },
  location: { 
    type: String, 
    coordinates: [Number]
  },
  //postalCode: Number

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

userSchema.index({ location: "2dsphere" });

const User = mongoose.model('User', userSchema);
module.exports = User;