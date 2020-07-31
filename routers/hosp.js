const express = require("express");
const Hosp = require("../models/Hosp");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/hosps", async (req, res) => {
  // Create a new hosp
  try {
    const hosp = new Hosp(req.body);
    await hosp.save();
    const token = await hosp.generateAuthToken();
    res.status(201).send({ hosp, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/hosps/login", async (req, res) => {
  //Login a registered hosp
  try {
    const { email, password } = req.body;
    const hosp = await Hosp.findByCredentials(email, password);
    if (!hosp) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await hosp.generateAuthToken();
    res.status(201).send({ hosp, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//middleware

router.get("/hosps/me", auth, async (req, res) => {
  // View logged in hosp profile
  res.send(req.hosp);
});

router.post("/hosps/me/logout", auth, async (req, res) => {
  // Log hosp out of the application
  try {
    req.hosp.tokens = req.hosp.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.hosp.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/hosps/me/logoutall", auth, async (req, res) => {
  // Log hosp out of all devices
  try {
    req.hosp.tokens.splice(0, req.hosp.tokens.length);
    await req.hosp.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
