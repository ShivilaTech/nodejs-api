
var express = require('express');
var router = express.Router();

const color = require("../controller/color.controller");

router.get("/colors",color.color);


module.exports = router;
