const express = require("express");
const history = require("./history");
const question = require("./question");

const router = express.Router();

router.use("/history", history);
router.use("/question", question);

module.exports = router;
