
var express = require('express');
var router = express.Router();

const sl = require("../controller/signup.controller");

router.post("/signup", sl.signup);



module.exports = router;
