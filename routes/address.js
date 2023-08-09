
var express = require('express');
var router = express.Router();

const controller = require("../controller/address.controller");

router.get("/user/shipping/address/:id",controller.userAddress);
router.get("/cities",controller.getCity);
router.get("/countries",controller.getCountries);
router.get("/cities-by-state/:id",controller.getCitiesByState);
router.get("/states-by-country/:id",controller.getStatesByCountry);
router.post("/update-address",controller.updateAddress);
router.post("/save-address",controller.saveAddress);
router.post("/set-default",controller.updateDefault);
router.delete("/delete-address/:id",controller.delete);



module.exports = router;
