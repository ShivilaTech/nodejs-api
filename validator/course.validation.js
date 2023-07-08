const { check } = require('express-validator');
 
exports.adddataValidation = [  
    check('courseName', 'courseName is requied').not().isEmpty(),
    check('courseDesc', ' courseDesc is requied').not().isEmpty(),
    check('instructorOccupation', 'instructorOccupation is requied').not().isEmpty(),
    check('instructorName', 'instructorName is requied').not().isEmpty(),
    check('instructorDesc', 'instructorDesc is requied').not().isEmpty(),
    check('price', 'price is requied').not().isEmpty(),
    check('whatYouGet', 'whatYouGet is requied').not().isEmpty()
   
]
 
exports.loginValidation = [
     check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
     check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
 
]