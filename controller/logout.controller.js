const jwt = require('jsonwebtoken');


// Logout
module.exports.logout = (req, res) => {
  const token = req.headers.authorization;

  jwt.verify(token, 'your_jwt_secret', (error, decoded) => {
    if (error) {
      console.error('JWT verification error:', error);
      return res.status(401).json({
        result: false,

        message: 'Invalid token'
      });
    }

    // Perform any necessary logout actions

    // Send the response
    return res.json({
      result: true,
      
      message: 'Successfully logged out'
    });
  });
};
