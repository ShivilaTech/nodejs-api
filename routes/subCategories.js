
var express = require('express');
var router = express.Router();

const controller = require("../controller/subCategories.controller");

router.get("/sub-categories/:id",controller.subCategories);


module.exports = router;
