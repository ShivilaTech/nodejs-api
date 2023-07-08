const lo = require('../models/social.model');

exports.login = async (req, res) => {
  try {
    console.log("5",req.body)
    lo.login(req.body, (err, data) => {
        console.log('7c3')
      
      if (err) {
        console.log("10",err)
        return res.status(500).send({
          message: "Error in social login"
        });
      } else {
        console.log("15",data)
       
        return res.status(201).json({
          result: true,
          message: 'social login successfully done',
          data:data
        });
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ result: false, message: 'Internal server error', user: null });
  }
};
