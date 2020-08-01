const express = require("express");
const hospRouter = require("./routers/hosp");
const patientRouter = require("./routers/patient");
const port = process.env.PORT;
require("./db/db");

const app = express();
app.use(bodyParsar.urlencoded({ extended: true }));

app.use(express.json());
app.use(hospRouter);
app.use(patientRouter);


const bodyParsar = require("body-parser");



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
