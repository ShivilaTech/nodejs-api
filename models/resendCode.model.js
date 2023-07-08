const db = require('./db');
// const OTPVerificationController = require('./OTPVerificationController');
// const AppEmailVerificationNotification = require('./AppEmailVerificationNotification');

module.exports = {
  resendCode: async function (body, result) {
    try {
      const { verify_by, email_or_phone } = body;

      console.log("10", body);
      let user;
      if (verify_by === 'email') {
        console.log("12", email_or_phone);
        user = await getUserByEmail(email_or_phone);
      } else {
        console.log("16", body);
        user = await getUserByPhone(email_or_phone);
      }

      if (!user) {
        console.log("21", user);
        return result({
          result: false,
          message: 'User is not found'
        }, null);
      }

      user.verification_code = generateVerificationCode();
      await updateUser(user);

      console.log("34");
    //   if (verify_by === 'email') {
    //     const emailNotification = new AppEmailVerificationNotification();
    //     emailNotification.sendNotification(user);
    //   } else {
    //     const otpController = new OTPVerificationController();
    //     otpController.sendCode(user);
    //   }

      return result(null, {
        result: true,
        message: 'A code is sent again'
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

function getUserByEmail(emailOrPhone) {
    console.log("59", [emailOrPhone]); // Log the emailOrPhone value
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
      db.query(query, [emailOrPhone], (error, rows) => {
        if (error) {
          console.log("63", error);
          reject(error);
        } else {
          console.log("67", rows);
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
