
var express = require('express');
var router = express.Router();

const chat = require("../controller/chat.controller");

router.get("/chat/conversations/:id", chat.conversations);

module.exports = router;
