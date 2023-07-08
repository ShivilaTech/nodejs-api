const db = require('./db.js');
const bcrypt = require("bcrypt");

module.exports = {
  signup: async function (body, result) {
    const { name, email_or_phone, password, user_type } = body;
    console.log('147');

    // Check if the user already exists
    db.query(
      'SELECT * FROM users WHERE email = ? OR phone = ? LIMIT 1',
      [email_or_phone, email_or_phone],

      (error, results) => {
        if (error) {
          console.log("28", error);
          
          return result(error, null);
        }
        console.log('154');
        console.log("34", results.length , results);
        if (results.length > 0) {
          return result(null, {
            result: false,
            message: 'User already exists.',
            user_id: 0,
          });
        }

        console.log('163');
        const hashedPassword = bcrypt.hashSync(password, 10);
        const verificationCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

        const insertUserQuery = `
          INSERT INTO users (name, email, phone, password, verification_code, user_type, email_verified_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `;

        const register_by = /[a-zA-Z]/.test(email_or_phone) ? 'email' : 'phone';
        console.log("53", email_or_phone);
        console.log("54", register_by);

        const userValues = {
          name: name,
          email: register_by.toString() === 'email' ? email_or_phone : '',
          phone: register_by.toString() === 'phone' ? email_or_phone : '',
          password: hashedPassword,
          verification_code: verificationCode,
          user_type: user_type,
          email_verified_at: new Date(),
          register_by: register_by
        };
        console.log(userValues);

        db.query('INSERT INTO users SET ?', userValues, (error, results) => {
          if (error) {
            console.log("55");
            return result(error, null);
          }

          const userId = results.insertId;
          console.log(results);
          console.log('184');

          const customer = {
            user_id: userId,
          };

          const insertCustomerQuery = `
            INSERT INTO customers SET ?
          `;
          db.query(insertCustomerQuery, customer, (error) => {
            if (error) {
              return result(error, null);
            }
            console.log(userId, "70");
            result(null, userId);
          });
        });
      }
    );
  },
};
