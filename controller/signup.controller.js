const si = require('../models/signup.model');

exports.signup = async (req, res) => {
  try {
    si.signup(req.body, (err, data) => {
      
      if (err) {
        return res.status(500).send({
          message: "Error Registration"
        });
      } else if(
        data.result == false){
          return res.status(400).json({
            result: true,
            message: 'user already exists'
          })
      } else {
       
        return res.status(201).json({
          result: true,
          message: 'Registration Successful. Please verify and log in to your account.',
          user_id: data.userId
        });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
