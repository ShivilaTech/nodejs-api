const fo = require('../models/forgetRequest.model');

exports.forgetRequest = async (req, res) => {
  try {
    console.log("5",req.body)
    fo.forgetRequest(req.body, (err, data) => {
        console.log('6')
      
      if (err) {
        console.log("9")
        return res.status(500).send({
          message: "Internal error"
        });
      } else {
       
        return res.status(200).json({
            result: true,
            message: 'A code is sent'
          });
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ result: false, message: 'Internal server error', user: null });
  }
};
