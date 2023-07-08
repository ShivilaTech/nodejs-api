
var express = require('express');
var router = express.Router();

const fo = require("../controller/forgetRequest.controller.js");

router.post("/password/forget_request", fo.forgetRequest);



module.exports = router;
