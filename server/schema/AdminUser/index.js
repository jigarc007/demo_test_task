const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AdminUserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    collection: "AdminUser",
    timestamps: true,
  }
);

module.exports = mongoose.model("AdminUser", AdminUserSchema);
