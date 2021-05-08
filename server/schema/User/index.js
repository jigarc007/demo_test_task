const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: Number,
      trim: true,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    gender: {
      type: Boolean,
      required: true,
    },
    dob: {
      type: Date,
      required: false,
    },
    adminUserId: {
      type: Schema.Types.ObjectId,
      ref: "AdminUser",
    },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
