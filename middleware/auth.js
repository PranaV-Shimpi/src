const jwt = require("jsonwebtoken");
const Hosp = require("../models/Hosp");

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const data = jwt.verify(token, process.env.JWT_KEY);
  try {
    const hosp = await Hosp.findOne({ _id: data._id, "tokens.token": token });
    if (!hosp) {
      throw new Error();
    }
    req.hosp = hosp;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
module.exports = auth;
