const db = require("./db.js");

exports.bannersGet = () =>{
    return new Promise((resolve, reject)=>{   

      db.query(`SELECT * FROM banners`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
  
};
