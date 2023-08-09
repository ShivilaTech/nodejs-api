const db = require("./db.js");

exports.homeCategoriesGet = () =>{
    return new Promise((resolve, reject)=>{   

      db.query(`SELECT * FROM home_categories`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
  
};
