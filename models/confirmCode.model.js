const db = require('./db');

module.exports.confirmCode = (body, result) => {
  try {
    const { user_id, verification_code } = body;

    getUserById(user_id, (error, user) => {
      if (error) {
        console.error('Database error:', error);
        return result({ result: false, message: 'Internal server error' }, null);
      }

      if (!user) {
        return result({ result: false, message: 'User is not found' }, null);
      }

      if (user.verification_code === verification_code) {
        user.email_verified_at = new Date().toISOString();
        user.verification_code = null;

        updateUser(user, (error) => {
          if (error) {
            console.error('Database error:', error);
            return result({ result: false, message: 'Internal server error' }, null);
          }

          return result(null, {
            result: true,
            message: 'Your account is now verified. Please login'
          });
        });
      } else {
        return result(null, {
          result: false,
          message: 'Code does not match. You can request for resending the code'
        });
      }
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
  const query = 'UPDATE users SET email_verified_at = ?, verification_code = ? WHERE id = ?';
  db.query(query, [user.email_verified_at, user.verification_code, user.id], (error) => {
    if (error) {
      return callback(error);
    }

    callback(null);
  });
}
