const db = require('./db');
const bcrypt = require('bcrypt');

module.exports = {
  confirmReset: async (body, result) => {
    console.log("6",body)
    try {
      const { verification_code, password } = body;

      const user = await getUserByVerificationCode(verification_code);

      if (user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await updateUserPassword(user.id, hashedPassword);

        return result(null, {
          result: true,
          message: 'Your password is reset. Please login',
        });
      } else {
        return result(null, {
          result: false,
          message: 'No user is found',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      return result({
        result: false,
        message: 'Internal server error',
      });
    }
  },
};

function getUserByVerificationCode(verificationCode) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE verification_code = ? LIMIT 1';
    db.query(query, [verificationCode], (error, rows) => {
      if (error) {
        reject(error);
      } else {
        const user = rows[0];
        resolve(user);
      }
    });
  });
}

function updateUserPassword(userId, password) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET verification_code = NULL, password = ? WHERE id = ?';
    db.query(query, [password, userId], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
