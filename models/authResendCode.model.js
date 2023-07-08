const db = require('./db');
// const AppEmailVerificationNotification = require('./AppEmailVerificationNotification');
// const OTPVerificationController = require('./OTPVerificationController');

module.exports.authResendCode = (body, result) => {
  try {
    console.log("7",body)
    const { user_id, verify_by } = body;
getUserById(user_id, (error, user) => {
      if (error) {
        console.error('Database error:', error);
        return result({ result: false, message: 'Internal server error' }, null);
      }
      if (!user) {
        return result({ result: false, message: 'User is not found' }, null);
      }

      console.log("18",user)
      user.verification_code = generateVerificationCode();

    //   if (verify_by === 'email') {
    //     const emailNotification = new AppEmailVerificationNotification();
    //     emailNotification.sendNotification(user);
    //   } else {
    //     const otpController = new OTPVerificationController();
    //     otpController.sendCode(user);
    //   }

      updateUser(user, (error) => {
        if (error) {
          console.error('Database error:', error);
          return result({ result: false, message: 'Internal server error' }, null);
        }

        return result(null, {
          result: true,
          message: 'Verification code is sent again'
        });
      });
    });
  } catch (error) {
    console.error('Error:', error);
    return result({ result: false, message: 'Internal server error' }, null);
  }
};

function getUserById(user_id, callback) {
  const query = 'SELECT * FROM users WHERE id = ? LIMIT 1';
  db.query(query, [user_id], (error, rows) => {
    if (error) {
      return callback(error, null);
    }

    const user = rows[0];
    callback(null, user);
  });
}

function updateUser(user, callback) {
  const query = 'UPDATE users SET verification_code = ? WHERE id = ?';
  db.query(query, [user.verification_code, user.id], (error) => {
    if (error) {
      return callback(error);
    }

    callback(null);
  });
}

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}
