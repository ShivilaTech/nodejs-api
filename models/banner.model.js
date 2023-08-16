const db = require("./db.js");
const comman = require("./comman.model.js");


exports.home_banner1_images = async () =>{
      
    try {
      const data = await comman.businessSettings('home_banner1_images');
      const arr=JSON.parse(data[0].value);  
      const ids=arr.toString();
  
      return new Promise((resolve, reject)=>{   
  
        db.query(`SELECT * FROM uploads where id in (${ids})  `,  (error, elements)=>{
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

  exports.home_banner2_images = async () =>{
      
    try {
      const data = await comman.businessSettings('home_banner2_images');
      const arr=JSON.parse(data[0].value);  
      const ids=arr.toString();
  
      return new Promise((resolve, reject)=>{   
  
        db.query(`SELECT * FROM uploads where id in (${ids})  `,  (error, elements)=>{
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

  exports.home_banner3_images = async () =>{
      
    try {
      const data = await comman.businessSettings('home_banner3_images');
      const arr=JSON.parse(data[0].value);  
      const ids=arr.toString();
  
      return new Promise((resolve, reject)=>{   
  
        db.query(`SELECT * FROM uploads where id in (${ids})  `,  (error, elements)=>{
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

  
  exports.home_banner4_images = async () =>{
      
    try {
      const data = await comman.businessSettings('home_banner4_images');
      const arr=JSON.parse(data[0].value);  
      const ids=arr.toString();
  
      return new Promise((resolve, reject)=>{   
  
        db.query(`SELECT * FROM uploads where id in (${ids})  `,  (error, elements)=>{
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