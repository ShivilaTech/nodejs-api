
var express = require('express');
var router = express.Router();

const us = require("../controller/user.controller");

router.get("/user", us.user);



module.exports = router;
