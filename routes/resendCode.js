var express = require('express');
var router = express.Router();

const re = require("../controller/resendCode.controller.js");

router.post("/password/resend_code", re.resendCode);



module.exports = router;
