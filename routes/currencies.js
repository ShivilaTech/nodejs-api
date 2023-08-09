
var express = require('express');
var router = express.Router();

const currency = require("../controller/currencies.controller");

router.get("/currencies",currency.currency);


module.exports = router;
