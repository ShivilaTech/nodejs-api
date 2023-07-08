
var express = require('express');
var router = express.Router();

const language = require("../controller/language.controller");

router.get("/languages", language.getAll);


module.exports = router;
