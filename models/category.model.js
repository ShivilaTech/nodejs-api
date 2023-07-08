const db = require("./db.js");

exports.categoryGet = (id) =>{
  return new Promise((resolve, reject)=>{
    db.query(`SELECT * FROM categories where  parent_id =${id}`,  (error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements);
      });
  });
};

exports.featured = () =>{
  return new Promise((resolve, reject)=>{
    db.query('SELECT * FROM categories where featured ="1" ',  (error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements);
      });
  });
};


exports.home = () =>{
  return new Promise((resolve, reject)=>{
    db.query('SELECT * FROM categories where featured ="1" ',  (error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements);
      });
  });
};

exports.top = () =>{
  return new Promise((resolve, reject)=>{
    db.query('SELECT * FROM categories where featured ="1" ',  (error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements);
      });
  });
};



