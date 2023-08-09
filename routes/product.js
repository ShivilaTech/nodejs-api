
var express = require('express');
var router = express.Router();

const products = require("../controller/product.controller");

router.get("/products/:offset/:limit", products.get);
router.get("/products/admin", products.admin);
router.get("/products/todays-deal", products.todaysDealProduct);
router.get("/products/featured", products.featuredProduct);
router.get("/products/best-seller", products.bestSellerProduct);
router.get("/products/home", products.homeProduct);
router.get("/products-brand/:id", products.getByBrand);
router.get("/products-category/:id", products.getbyCategory);
router.get("/products-details/:id", products.productDetails);
router.post("/products-search", products.search);








module.exports = router;
