var express = require('express');
var router = express.Router();
const controller = require("../controller/users.controller");
const upload = require("../controller/upload.controller");

router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.post("/updatepassword", controller.updatepassword);
router.post("/updated_evice_token", controller.updatedevice_token);
router.post("/forgotpassword", controller.forgotpassword);
router.post("/confirmReset", controller.confirmReset);
router.get("/verify/:token", controller.verify);
router.post("/resend", controller.resend);
router.post("/wishlists-add-product", controller.wishlistAdd);
router.get("/wishlists-list/:user_id", controller.wishlistUserId);
router.get("/wishlists-remove-product/:user_id/:product_id", controller.wishlistdelete);
router.post("/comapre-add-product", controller.comapreListAdd);
router.get("/comapre-list/:user_id", controller.comparelistUserId);
router.get("/comapre-remove-product/:user_id", controller.deletecomaparelist);
router.post("/support-add", controller.supportadd);
router.get("/support-list/:user_id", controller.supportlist);
router.get("/purchase-history/:user_id", controller.orderListUserId);
router.get("/purchase-history-details/:order_id", controller.orderDetailsById);
router.post('/upload-multiple/:user_id', upload.uploadSingleV2);
router.post('/upload-ImageAndUpdate/:user_id', upload.uploadAndUpdateUser);
router.post('/order-store', controller.orderStore);
router.get('/dashboard/:user_id', controller.dashboad);
router.post('/notification-add', controller.notificationAdd);
router.get('/notification-get/:id', controller.notificationGet);













module.exports = router;
