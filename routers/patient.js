const express = require("express");
const Patient = require("../models/Patient");
const router = express.Router();

router.post("/patients", async (req, res) => {
  // Create a new patient
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send({ patient });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/patients/allpatients", async (req, res) => {
  // get all patient details
  try {
    const patients = await Patient.find({});
    res.status(201).send({ patients });
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/patients/:id", async (req, res) => {
  //get single patient details
  try {
    const patient = await Patient.findById(req.params.id);
    res.status(201).send({ patient });
  } catch (err) {
    res.status(501).send({ message: "Patient not found!" });
  }
});

router.delete("/patients/:id", async (req, res) => {
  //delete one patient
  try {
    const patient = await Patient.findByIdAndRemove(req.params.id);
    res.status(201).send({ message: "The user was removed" });
  } catch (err) {
    res.status(501).send({ error: "Check Patient ID Again" });
  }
});
//-------------------------------------------------------------
router.post("/patients/updatewardbed/:id", async (req, res) => {
  //update patient bed number and ward number

  try {
    await Patient.findByIdandUpdate(req.params.id, {
      $set: { bedNumber: req.body.bedNumber, wardNumber: req.body.wardNumber },
    });
    res.status(201).send("updated bed and ward number successfully");
  } catch (err) {
    res.status(501).send({ error: "Check Patient ID Again" });
  }
});

//update patient health survey ( old survey sholud also display if required)

// get complete patient health survey

//upload reports by clicking picture

// get all reports history from database

module.exports = router;
