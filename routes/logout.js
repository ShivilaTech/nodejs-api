
var express = require('express');
var router = express.Router();

const lo = require("../controller/logout.controller");

router.get("/logout", lo.logout);



module.exports = router;
