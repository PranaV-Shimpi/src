const mongoose = require("mongoose");
const validator = require("validator");

const patientSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  dateofbirth: {
    type: Date,
    required: true,
    trim: true,
  },
  sex: {
    // true = male
    // false = female
    type: Boolean,
    required: true,
    default: true,
    trim: true,
  },
  contact_number_1: {
    type: Number,
    trim: true,
  },

  contact_number_2: {
    type: Number,
    trim: true,
  },
  number_of_days: {
    type: Number,
    required: true,
    trim: true,
  },
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
  wardNumber: {
    type: String,
    required: true,
    trim: true,
  },
  bedNumber: {
    type: String,
    required: true,
    trim: true,
  },
  patientdischarge: [
    {
      discharge: {
        //true: patient discharged
        // fasle: not discharged

        type: Boolean,
        required: true,
        default: false,
        trim: true,
      },
      date: {
        type: Date,
      },
    },
  ],
  healthSurvey: [
    {
      temperature: {
        type: Number,
        required: true,
        trim: true,
      },
      oxygenLevel: {
        type: Number,
        required: true,
        trim: true,
      },
      healthStatus: {
        type: String,
        required: true,
        trim: true,
      },
      date: { type: Date, default: Date.now },
    },
  ],
  date: { type: Date, default: Date.now },
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
