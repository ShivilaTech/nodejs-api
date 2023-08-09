
var express = require('express');
var router = express.Router();

const controller = require("../controller/generalSettings.controller");

router.get("/general-settings",controller.generalSettings);


module.exports = router;
