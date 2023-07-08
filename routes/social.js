
var express = require('express');
var router = express.Router();

const so = require("../controller/social.controller");

router.post("/social-login", so.login);



module.exports = router;
