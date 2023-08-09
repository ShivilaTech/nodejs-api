
var express = require('express');
var router = express.Router();

const controller = require("../controller/brand.controller");

router.get("/brands/top",controller.topBrand);
router.get("/brands/:offset/:limit",controller.brandGet);


module.exports = router;
