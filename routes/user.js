var express = require('express');
const multer = require("multer");
var router = express.Router();

const controller = require("../controller/user.controller");
const { adddataValidationChild } = require('../validator/course.validation');


  //upload=multer({ dest: "uploads/child" });

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/child");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
  }); 

  const upload = multer({
    storage: multerStorage,
  });


router.post("/addChild/:id",upload.single("childImage"),adddataValidationChild, controller.create);
router.get("/getUserById/:id", controller.getUserById);
router.get("/getChildById/:id", controller.getChildById);
router.post("/login", controller.login);
//router.get("/delete/:id", course.delete);
//router.put("/update/:id", adddataValidation,course.update);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
