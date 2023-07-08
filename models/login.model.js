const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db.js');

module.exports = {
  login: async function (body, result) {
    const { email, password, user_type, identity_matrix } = body;

    const deliveryBoyCondition = user_type === 'delivery_boy';

    let query;
    if (deliveryBoyCondition) {
      query = `SELECT * FROM users WHERE user_type IN ('delivery_boy') AND (email = ? OR phone = ?) LIMIT 1`;
    } else {
      query = `SELECT * FROM users WHERE user_type IN ('customer', 'seller') AND (email = ? OR phone = ?) LIMIT 1`;
    }

    try {
      db.query(query, [email, email], async (error, rows) => {
        if (error) {
          console.error('Database error:', error);
          return result({ result: false, message: 'Internal server error', user: null });
        }

        const user = rows[0];

        if (user) {
          const bcryptResult = await bcrypt.compare(password, user.password);

          if (bcryptResult) {
            if (!deliveryBoyCondition) {
              // Include the PayhereUtility logic here
              // if (PayhereUtility.create_wallet_reference(identity_matrix) === false) {
              //   return result({ result: false, message: 'Identity matrix error', user: null });
              // }
            }

            if (user.email_verified_at === null) {
                console.log("39")
              return result({ result: false, message: 'Please verify your account', user: null });
            }

            const token = jwt.sign({ user_id: user.id }, 'your_jwt_secret');
            return result(null, { token, user });
          } else {
            console.log("45")
            return result({ result: false, message: 'Unauthorized', user: null });
          }
        } else {
            console.log("50")
          return result({ result: false, message: 'User not found', user: null });
        }
      });
    } catch (error) {
        console.log("55")
      console.error('Exception:', error);
      return result({ result: false, message: 'Internal server error', user: null });
    }
  },
};
