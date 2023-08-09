const db = require("./db.js");

exports.businessSettingsGet = () =>{
    return new Promise((resolve, reject)=>{   

      db.query(`SELECT * FROM business_settings`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
  
};
