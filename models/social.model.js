const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

module.exports = {
  login: function (body, result) {
    const { email, name, provider } = body;
    console.log("55");

    try {
      const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
      db.query(query, [email], (error, rows) => {
        if (error) {
          console.error('Database error:', error);
          return result({ result: false, message: 'Internal server error', user: null });
        }

        const user = rows[0];
        console.log("19", rows);

        if (user) {
          return loginSuccess(result, user);
        } else {
          console.log("24");
          const newUser = {
            name: name,
            email: email,
            provider_id: provider,
            email_verified_at: new Date().toISOString()
          };

          const insertQuery = 'INSERT INTO users SET ?';
          db.query(insertQuery, newUser, (error, results) => {
            if (error) {
              console.error('Database error:', error);
              return result({ result: false, message: 'Internal server error', user: null });
            }

            const newUserId = results.insertId;
            console.log("44", results);

            const customer = { user_id: newUserId };
            db.query('INSERT INTO customers SET ?', customer, (error, custm) => {
              console.log("44", custm);

              newUser.id = newUserId;
              return loginSuccess(result, newUser);
            });
          });
        }
      });
    } catch (error) {
      console.error('Database error:', error);
      return result({ result: false, message: 'Internal server error', user: null });
    }
  }
};

function loginSuccess(result, user) {
    const token = jwt.sign({ user_id: user.id }, 'your_jwt_secret');
  
    const expiresInDays = 100 * 7; // Adjusted to match the 100 weeks in PHP code
    const expirationTime = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString();
  
    result(null, {
      result: true,
      message: 'Successfully logged in',
      access_token: token,
      token_type: 'Bearer',
      expires_at: expirationTime,
      user: {
        id: user.id,
        type: user.user_type,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        // avatar_original: api_asset(user.avatar_original),
        phone: user.phone
      }
    });
  }
  
