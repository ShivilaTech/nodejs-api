const db = require('./db');
// const OTPVerificationController = require('./OTPVerificationController');
// const AppEmailVerificationNotification = require('./AppEmailVerificationNotification');

module.exports = {
  forgetRequest: async (body, result) => {
    try {
      const { send_code_by, email_or_phone } = body;

      let user;
      if (send_code_by === 'email') {
        user = await getUserByEmail(email_or_phone);
      } else {
        user = await getUserByPhone(email_or_phone);
      }

      if (!user) {
        return result({
          result: false,
          message: 'User is not found'
        });
      }

      // Update user verification code and send notification
      user.verification_code = generateVerificationCode();
      console.log("26", user)
      await updateUser(user);
    //   await sendNotification(send_code_by, user);

      return result(null, {
        result: true,
        message: 'A code is sent'
      });
    } catch (error) {
      console.error('Error:', error);
      return result({
        result: false,
        message: 'Internal server error'
      });
    }
  }
};

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
    db.query(query, [email], (error, rows) => {
      if (error) {
        reject(error);
      } else {
        const user = rows[0];
        resolve(user);
      }
    });
  });
}

function getUserByPhone(phone) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE phone = ? LIMIT 1';
    db.query(query, [phone], (error, rows) => {
      if (error) {
        reject(error);
      } else {
        const user = rows[0];
        resolve(user);
      }
    });
  });
}

function updateUser(user) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET verification_code = ? WHERE id = ?';
    db.query(query, [user.verification_code, user.id], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

// function sendNotification(send_code_by, user) {
//   return new Promise((resolve, reject) => {
//     if (send_code_by === 'phone') {
//       const otpController = new OTPVerificationController();
//       otpController.sendCode(user, (error) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve();
//         }
//       });
//     } else {
//       const emailNotification = new AppEmailVerificationNotification();
//       emailNotification.sendNotification(user, (error) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve();
//         }
//       });
//     }
//   });
// }
