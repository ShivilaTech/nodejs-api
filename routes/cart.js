
var express = require('express');
var router = express.Router();

const cart = require("../controller/cart.controller");

router.post("/carts/add", cart.add);
router.post("/carts/change-quantity", cart.cartChangeQuantity);
router.get("/carts/:user_id", cart.List);
router.get("/carts-summary/:user_id", cart.summary);
router.delete("/carts-delete/:id", cart.summary);




module.exports = router;
