
var express = require('express');
var router = express.Router();

const lo = require("../controller/authResendCode.controller");

router.post("/resend_code", lo.authResendCode);



module.exports = router;
