const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/user");
const Offer = require("../models/offer");

const hireSchema = new Schema(
  {
    offer: { type: Schema.Types.ObjectId, ref: "Offer" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    address: String,
    date: Date,
    observations: String
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
