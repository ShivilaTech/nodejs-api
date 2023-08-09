const db = require("./db.js");
const comman = require("./comman.model.js");
const setting= require("../config/setting.js");

console.log(setting.home_categories,"setting")

exports.categoryGet = (id) =>{
  return new Promise((resolve, reject)=>{
    db.query(`SELECT categories.*,uploads.file_original_name ,uploads.file_name, uploads.extension FROM categories  left join uploads on categories.icon=uploads.id  `,  (error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements);
      });
  });
};

exports.featured = () =>{
  return new Promise((resolve, reject)=>{
    db.query('SELECT categories.*,uploads.file_original_name ,uploads.file_name, uploads.extension FROM categories  left join uploads on categories.icon=uploads.id where categories.featured ="1" ',  (error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements);
      });
  });
};


exports.home = async() =>{
  
  try {
    const data = await comman.businessSettings('home_categories');
    const arr=JSON.parse(data[0].value);  
    const ids=arr.toString();

    return new Promise((resolve, reject)=>{
      db.query(`SELECT categories.*,uploads.file_original_name ,uploads.file_name, uploads.extension FROM categories  left join uploads on categories.icon=uploads.id where categories.id IN (${ids}) `,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
    
   } catch(err) {
    console.log(err);     
   }

};

exports.top = async() =>{

  try {
    const data = await comman.businessSettings('home_categories');
    const arr=JSON.parse(data[0].value);  
    const ids=arr.toString();

    return new Promise((resolve, reject)=>{
      db.query(`SELECT categories.*,uploads.file_original_name ,uploads.file_name, uploads.extension FROM categories  left join uploads on categories.icon=uploads.id where categories.id IN (${ids}) limit 20 `,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
    
   } catch(err) {
    console.log(err);     
   }

};



