import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Product name"],
      maxLength: [15, "Name cannot Exceedd 15 character"],
      minLength: [2, "Name should have more than 2 character"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please Enter your email "],
      validate: [validator.isEmail, "Please Enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minLength: [8, "password should be more than 8 character "],
      select: false,
      // validate: [validator.isStrongPassword, "Please select a Strong Password"],
    },

    //we use cloud navi which provide url and public id
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    role: {
      type: String,
      default: "user",
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//Jwt
userSchema.methods.getJWTTOKEN = function () {
  return jwt.sign({ id: this._id }, process.env.SecretKey, {
    expiresIn: "1 hour",
  });
};

// compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password  reset token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  //Hashing and adding resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // this means userScheme

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //15min
  return resetToken;
};

export const user = mongoose.model("User", userSchema);
