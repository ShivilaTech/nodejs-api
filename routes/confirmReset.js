
var express = require('express');
var router = express.Router();

const co = require("../controller/confirmReset.controller");

router.post("/password/confirm_reset", co.confirmReset);



module.exports = router;
