
var express = require('express');
var router = express.Router();

const lo = require("../controller/login.controller");

router.post("/login", lo.login);



module.exports = router;
