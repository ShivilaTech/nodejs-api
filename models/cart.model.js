const db = require("./db.js");
const comman = require("./comman.model.js");


exports.delete = async (id) =>{     
    try {   

      return new Promise((resolve, reject)=>{        
        const sql = 'delete FROM carts  WHERE id = ?';   
        db.query(sql,id,(error, elements)=>{
              if(error){
                  return reject(error);
              }             
              if(elements.affectedRows>0){
                return resolve({message:"successfully deleted"});
              }else {
                return resolve({message:"id not found"});
              }              
          });
      });
      
     } catch(err) {
      console.log(err);     
     }    
  };

exports.changeQuantity = async (id,quantity) =>{
    try {   
      const inputData=({'quantity':quantity})
      return new Promise((resolve, reject)=>{  
        
        const sql = 'UPDATE carts SET ? WHERE id = ?';   
        db.query(sql,[inputData,id],  (error, elements)=>{
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

exports.cartUpdateTempId = async (id,user_id) =>{
  try {   
    const inputData=({'user_id':user_id})
    return new Promise((resolve, reject)=>{  
      
      const sql = `UPDATE carts SET ? WHERE temp_user_id = '${id}'`;   
      db.query(sql,[inputData],  (error, elements)=>{
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



exports.getcartByUserID = async (id) =>{
    try {  
  
      return new Promise((resolve, reject)=>{   
  
        db.query(`SELECT carts.*  , carts.id as cart_id ,  carts.discount as cart_discount ,  carts.tax as cart_tax  , products.*  FROM carts  join products on carts.product_id=products.id where carts.user_id = '${id}' or  carts.temp_user_id = '${id}'  order by carts.id desc `,  (error, elements)=>{
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

exports.cartByUserID = async (id) =>{
    try {  
  
      return new Promise((resolve, reject)=>{   
  
        db.query(`SELECT * FROM carts  where carts.user_id = ${id} `,  (error, elements)=>{
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

exports.getcartById = async (id) =>{
    try {  
  
      return new Promise((resolve, reject)=>{   
  
        db.query(`SELECT * FROM carts where carts.id = ${id} `, (error, elements)=>{
              if(error){
                  return reject(error);
              }
              return resolve(elements[0]);
          });
      });
      
     } catch(err) {
      console.log(err);     
     }
};  

exports.addCart = async (addtocart) =>{
  try {

    return new Promise((resolve, reject)=>{  

      var sql = 'INSERT INTO carts SET ?';
        db.query(sql,addtocart,  (error, elements)=>{
                      if(error){
                          return reject(error);
                      }
                      return resolve(elements);
        });       
    })
    
   } catch(err) {
    console.log(err);     
   }
};

exports.getvariant = async (ids) =>{
    try {  
  
      return new Promise((resolve, reject)=>{   
  
        db.query(`SELECT * FROM product_stocks where product_id in (${ids})  `,  (error, elements)=>{
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


exports.getvariantByvariantName = async (id,name) =>{
    try {  
  
      return new Promise((resolve, reject)=>{   
  
        db.query(`SELECT * FROM product_stocks where product_id =${id} and variant ='${name}'`,  (error, elements)=>{
              if(error){
                  return reject(error);
              }
              return resolve(elements[0]);
          });
      });
      
     } catch(err) {
      console.log(err);     
     }
};


exports.getProdct = async (id) =>{
    try {  
  
      return new Promise((resolve, reject)=>{   
  
        db.query(`SELECT * FROM products where id = ${id} `,  (error, elements)=>{
              if(error){
                  return reject(error);
              }
              return resolve(elements[0]);
          });
      });
      
     } catch(err) {
      console.log(err);     
     }
};

exports.getProdctTax = async (id) =>{
    try {  
  
      return new Promise((resolve, reject)=>{   
  
        db.query(`SELECT * FROM product_taxes  join taxes  on product_taxes.tax_id=taxes.id   where product_id = ${id} `,  (error, elements)=>{
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



