const lo = require('../models/login.model');

exports.login = async (req, res) => {
  try {
    console.log("5",req.body)
    lo.login(req.body, (err, data) => {
        console.log('6')
      
      if (err) {
        console.log("9")
        return res.status(500).send({
          message: "Error login"
        });
      } else {
       
        return res.status(201).json({
          result: true,
          message: 'Registration Successful. Please verify and log in to your account.',
          user_id: data.userId,
          token: data.token
        });
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ result: false, message: 'Internal server error', user: null });
  }
};
