const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },

    authGoogleID: {
      type: String,
      default: null,
    },
    authFacebookID: {
      type: String,
      default: null,
    },

    authType: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },

    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    // generate a salt
    if (this.authType !== "local") next();
    const salt = await bcrypt.genSalt(10);

    const passwordHashed = await bcrypt.hash(this.password, salt);
    // generate a password hash (salt + hash)
    this.password = passwordHashed;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
