
var express = require('express');
var router = express.Router();

const controller = require("../controller/banner.controller");

router.get("/banners",controller.banners);


module.exports = router;
