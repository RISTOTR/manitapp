const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/User");
const Offer = require("../models/Offer");

const hireSchema = new Schema(
  {
    offer: { type: Schema.Types.ObjectId, ref: "Offer" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    address: String,
    date: Date,
    observations: String,
    price: Number,
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: "Pending"
      }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

hireSchema.index({ location: "2dsphere" });

const Hire = mongoose.model("Hire", hireSchema);
module.exports = Hire;
