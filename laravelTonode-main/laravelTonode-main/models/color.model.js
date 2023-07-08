const db = require("./db.js");
const comman = require("./comman.model.js");

exports.colorGet = () =>{
    return new Promise((resolve, reject)=>{   

      db.query(`SELECT * FROM colors `,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
  
};
