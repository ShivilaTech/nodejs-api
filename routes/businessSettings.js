
var express = require('express');
var router = express.Router();

const controller = require("../controller/businessSettings.controller");

router.get("/business-settings",controller.businessSettings);


module.exports = router;
