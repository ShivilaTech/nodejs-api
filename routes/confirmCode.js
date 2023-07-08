
var express = require('express');
var router = express.Router();

const co = require("../controller/confirmCode.controller");

router.post("/confirm_code", co.confirmCode);



module.exports = router;
