const db = require("./db.js");

exports.subCategoriesGet = (id) =>{
    return new Promise((resolve, reject)=>{   

      db.query(`SELECT * FROM categories where parent_id =${id}`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
  
};
