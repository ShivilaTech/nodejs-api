
var express = require('express');
var router = express.Router();

const controller = require("../controller/homeCategories.controller");

router.get("/home-categories",controller.homeCategories);


module.exports = router;
