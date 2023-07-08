
var express = require('express');
var router = express.Router();

const cat = require("../controller/category.controller");

router.get("/categories", cat.category);
router.get("/categories/featured", cat.featured);
router.get("/categories/home", cat.home);
router.get("/categories/top", cat.top);


module.exports = router;
