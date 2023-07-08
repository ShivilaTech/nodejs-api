
var express = require('express');
var router = express.Router();

const sl = require("../controller/slider.controller");

router.get("/sliders", sl.slider);



module.exports = router;

