const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hospSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  /*address: {
    type: String,
    required: true,
    trim: true,
  },*/
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

hospSchema.pre("save", async function (next) {
  // Hash the password before saving the hosp model
  const hosp = this;
  if (hosp.isModified("password")) {
    hosp.password = await bcrypt.hash(hosp.password, 8);
  }
  next();
});

hospSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the hosp
  const hosp = this;
  const token = jwt.sign({ _id: hosp._id }, process.env.JWT_KEY);
  hosp.tokens = hosp.tokens.concat({ token });
  await hosp.save();
  return token;
};

hospSchema.statics.findByCredentials = async (email, password) => {
  // Search for a hosp by email and password.
  const hosp = await Hosp.findOne({ email });
  if (!hosp) {
    throw new Error({ error: "Invalid login credentials" });
  }
  const isPasswordMatch = await bcrypt.compare(password, hosp.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login credentials" });
  }
  return hosp;
};

const Hosp = mongoose.model("Hosp", hospSchema);

module.exports = Hosp;
