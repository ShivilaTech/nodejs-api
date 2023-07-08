const re = require('../models/resendCode.model');


exports.resendCode = async (req, res) => {
  try {
    console.log("5",req.body)
    re.resendCode(req.body, (err, data) => {
        console.log('6')
      
      if (err) {
        console.log("9",err)
        return res.status(500).send({

          message: err.message
        });
      } else if(data.result == false){

        console.log("18",data)
        return res.status(500).send({

            message: "user is not found"
          });
      } else{

       console.log("15",data)
        return res.status(200).json({
            result: true,
            message: 'Your password is reset. Please login',
          });

      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ result: false, message: 'Internal server error', user: null });
  }
};
