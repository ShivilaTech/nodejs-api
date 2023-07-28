
var express = require('express');
var router = express.Router();

const products = require("../controller/product.controller");

router.get("/products", products.get);
router.get("/products/admin", products.admin);
router.get("/products/todays-deal", products.todaysDealProduct);
router.get("/products/featured", products.featuredProduct);
router.get("/products/best-seller", products.bestSellerProduct);
router.get("/products/home", products.homeProduct);








module.exports = router;
