const express = require("express");
const router = express.Router();

const {
    series,
    mision} = require("../../controller/carteleraController.js");

router.get("/seriesTem",series);

router.get("/mision/:palabra",mision);


module.exports = router;
