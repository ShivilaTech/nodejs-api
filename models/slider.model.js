const db = require("./db.js");


exports.sliderGet = () =>{
  return new Promise((resolve, reject)=>{
    db.query('SELECT * FROM sliders ',  (error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements);
      });
  });

};
