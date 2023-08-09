const db = require("./db.js");

exports.currencyGet = () =>{
    return new Promise((resolve, reject)=>{   

      db.query(`SELECT * FROM currencies `,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
  
};
