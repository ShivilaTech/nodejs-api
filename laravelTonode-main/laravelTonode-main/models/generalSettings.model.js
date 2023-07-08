const db = require("./db.js");

exports.generalSettingsGet = () =>{
    return new Promise((resolve, reject)=>{   

      db.query(`SELECT * FROM general_settings `,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
  
};
