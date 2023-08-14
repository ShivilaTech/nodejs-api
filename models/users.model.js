const db = require("./db.js");
const comman = require("./comman.model.js");
const bcrypt = require("bcrypt");

exports.sliderGet = async () =>{

  try {
    const data = await comman.businessSettings('home_slider_images');
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

exports.updateUser = async (inputData,id) =>{

  try {  
    return new Promise((resolve, reject)=>{       
     
      const sql = 'UPDATE users SET ? WHERE id = ?'; 

      db.query(sql,[inputData, id],  (error, elements)=>{
            if(error){
                return reject(error);
            }
           
            if(elements.affectedRows>0){
              return resolve({message:"successfully updated"});
            }

            
        });
    });
    
   } catch(err) {
    console.log(err);     
   }    
};

exports.getuser = async (email_or_phone) =>{

    try {  
      return new Promise((resolve, reject)=>{  
        
        sql= 'SELECT * FROM users WHERE email = ? OR phone = ? LIMIT 1', 
  
        db.query(sql,[email_or_phone, email_or_phone],  (error, elements)=>{
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


exports.updatepassword = async (inputData,id) =>{

  try {  
    return new Promise((resolve, reject)=>{       
     
      const sql = 'UPDATE users SET ? WHERE id = ?'; 

      db.query(sql,[inputData, id],  (error, elements)=>{
            if(error){
                return reject(error);
            }
           
            if(elements.affectedRows>0){
              return resolve({message:"successfully updated"});
            }

            
        });
    });
    
   } catch(err) {
    console.log(err);     
   }    
};

exports.getuserBycode = async (code) =>{

  try {  
    return new Promise((resolve, reject)=>{  
      
      sql= 'SELECT * FROM users WHERE verification_code = ?', 

      db.query(sql,[code],  (error, elements)=>{
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



exports.getwishlistUserId = async (user_id) =>{
  try {  
    return new Promise((resolve, reject)=>{  
      
      sql= 'SELECT * , products.* FROM wishlists join products on wishlists.product_id = products.id WHERE wishlists.user_id = ?', 

      db.query(sql,[user_id],  (error, elements)=>{
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

exports.getwishlistbyId = async (user_id,product_id	) =>{

  try {  
    return new Promise((resolve, reject)=>{  
      
      sql= 'SELECT * FROM wishlists WHERE user_id = ? and  product_id =?', 

      db.query(sql,[user_id,product_id],  (error, elements)=>{
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

exports.ImageListByUserId = async (user_id) =>{

  try {  
    return new Promise((resolve, reject)=>{  
      
      sql= 'SELECT * FROM uploads WHERE user_id = ?', 

      db.query(sql,[user_id],  (error, elements)=>{
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

exports.deletewishlistUserId = async (user_id,product_id	) =>{

  try {  
    return new Promise((resolve, reject)=>{  
      
      sql= 'delete FROM wishlists WHERE user_id = ? and  product_id =?', 

      db.query(sql,[user_id,product_id],  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve({message:"successfully deleted"});
        });
    });
    
   } catch(err) {
    console.log(err);     
   }    
};

exports.addwishlist = async (data) =>{

  try {  
    return new Promise((resolve, reject)=>{      

      var sql = 'INSERT INTO wishlists SET ?';
      db.query(sql,data,  (error, elements)=>{
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


exports.getcamparelistUserId = async (user_id) =>{
  try {  
    return new Promise((resolve, reject)=>{  
      
      sql= 'SELECT * , products.* FROM compare join products on compare.product_id = products.id WHERE compare.user_id = ?', 

      db.query(sql,[user_id],  (error, elements)=>{
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



exports.supportlist = async (user_id	) =>{
  try {  
    return new Promise((resolve, reject)=>{  
      
      sql= 'SELECT * FROM tickets WHERE user_id = ? ', 

      db.query(sql,[user_id],  (error, elements)=>{
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

exports.getcamparebyId = async (user_id,product_id	) =>{

  try {  
    return new Promise((resolve, reject)=>{  
      
      sql= 'SELECT * FROM compare WHERE user_id = ? and  product_id =?', 

      db.query(sql,[user_id,product_id],  (error, elements)=>{
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


exports.orderDetailsById = async (id) =>{
  try {  
    return new Promise((resolve, reject)=>{  
      
      sqlQuery= `SELECT * FROM orders join 
      order_details on orders.id=order_details.order_id
      join products on products.id = order_details.product_id
      left join uploads on products.thumbnail_img=uploads.id 
       WHERE orders.id = ? `;

      db.query(sqlQuery,[id],  (error, elements)=>{
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


exports.orderListUserId = async (user_id,query) =>{
  try {  
    return new Promise((resolve, reject)=>{

      let sql='';
      
      if(query.payment_status){
       sql = ` and payment_status = '${query.payment_status}'`         
      }
      if(query.delivery_status){
        sql = ` and delivery_status = '${query.delivery_status}'`         
       }
       if(query.delivery_status && query.payment_status){
        sql = ` and delivery_status = '${query.delivery_status}' and payment_status = '${query.payment_status}'` ;        
       }           
      
      sqlQuery= `SELECT * FROM orders  WHERE user_id = ?  ${sql}`;

      db.query(sqlQuery,[user_id],  (error, elements)=>{
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



exports.deletecampareUserId = async (user_id,product_id	) =>{

  try {  
    return new Promise((resolve, reject)=>{  
      
      sql= 'delete FROM compare WHERE user_id = ? ', 

      db.query(sql,[user_id],  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve({message:"successfully deleted"});
        });
    });
    
   } catch(err) {
    console.log(err);     
   }    
};

exports.addcamapre = async (data) =>{

  try {  
    return new Promise((resolve, reject)=>{      

      var sql = 'INSERT INTO compare SET ?';
      db.query(sql,data,  (error, elements)=>{
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




exports.update_device_token = async (inputData,id) =>{

  try {  
    return new Promise((resolve, reject)=>{       
     
      const sql = 'UPDATE users SET ? WHERE id = ?'; 

      db.query(sql,[inputData, id],  (error, elements)=>{
            if(error){
                return reject(error);
            }
           
            if(elements.affectedRows>0){
              return resolve({message:"successfully updated"});
            }

            
        });
    });
    
   } catch(err) {
    console.log(err);     
   }    
};


exports.update_setting = async (inputData,id) =>{

  try {  
    return new Promise((resolve, reject)=>{       
     
      const sql = 'UPDATE users SET ? WHERE id = ?'; 

      db.query(sql,[inputData, id],  (error, elements)=>{
            if(error){
                return reject(error);
            }
           
            if(elements.affectedRows>0){
              return resolve({message:"successfully updated"});
            }

            
        });
    });
    
   } catch(err) {
    console.log(err);     
   }    
};



exports.save = async (data,randam) =>{

    try {  
      return new Promise((resolve, reject)=>{ 
        let inputData;
        const hashedPassword = bcrypt.hashSync(data.password, 10);
       if(data.register_by =='email'){
         
         inputData =({
            name: data.name,
            email: data.email_or_phone,
            password: hashedPassword,
            user_type:data.user_type,
            verification_code: randam        
        });
        
        }else {
             inputData =({
                name: data.name,
                email: data.email_or_phone,
                password: hashedPassword,               
                user_type:data.user_type, 
                verification_code:randam     
                              
            });                       

        }
 
        var sql = 'INSERT INTO users SET ?';
        db.query(sql,inputData,  (error, elements)=>{
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


exports.doLogin = async (email_or_phone,user_type) =>{

  try {  
    return new Promise((resolve, reject)=>{  
      
      sql= 'SELECT * FROM users WHERE user_type in (?) and email = ? OR phone = ? LIMIT 1', 

      db.query(sql,[user_type,email_or_phone, email_or_phone],  (error, elements)=>{
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

exports.customerSave = async (id) =>{

  try {  
    return new Promise((resolve, reject)=>{ 
      let inputData;   
   
      inputData =({
        user_id: id                        
          });                   

      var sql = 'INSERT INTO customers SET ?';
      db.query(sql,inputData,  (error, elements)=>{
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



exports.supportadd = async (inputData) =>{

  try {  
    return new Promise((resolve, reject)=>{ 
    
      var sql = 'INSERT INTO tickets SET ?';
      db.query(sql,inputData,  (error, elements)=>{
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


exports.ordersave = async (inputData) =>{
  try {  
    return new Promise((resolve, reject)=>{ 
    
      var sql = 'INSERT INTO orders SET ?';
      db.query(sql,inputData,  (error, elements)=>{
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

exports.orderDetailsStore = async (inputData) =>{
  try {  
    return new Promise((resolve, reject)=>{ 
    
      var sql = 'INSERT INTO order_details SET ?';
      db.query(sql,inputData,  (error, elements)=>{
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

exports.CombinedOrder = async (inputData) =>{
  try {  
    return new Promise((resolve, reject)=>{ 
    
      var sql = 'INSERT INTO combined_orders SET ?';
      db.query(sql,inputData,  (error, elements)=>{
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


exports.deleteOrderId = async (order_id) =>{

  try {  
    return new Promise((resolve, reject)=>{  
      
      sql= 'delete FROM orders WHERE id = ?', 

      db.query(sql,[order_id],  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve({message:"successfully deleted"});
        });
    });
    
   } catch(err) {
    console.log(err);     
   }    
};


exports.productstockUpdate = async (id,inputData) =>{
  try {  
    return new Promise((resolve, reject)=>{     
      const sql = 'UPDATE product_stocks SET ? WHERE id = ?';
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

exports.productUpdate = async (id,inputData) =>{
  try {  
    return new Promise((resolve, reject)=>{     
      const sql = 'UPDATE products SET ? WHERE id = ?';
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


exports.getsellerbyId = async (user_id) =>{

  try {  
    return new Promise((resolve, reject)=>{  
      
      sql= 'SELECT * FROM sellers WHERE user_id = ? ', 

      db.query(sql,[user_id],  (error, elements)=>{
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

exports.sellerUpdate = async (id,inputData) =>{
  try {  
    return new Promise((resolve, reject)=>{     
      const sql = 'UPDATE sellers SET ? WHERE id = ?';
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

exports.orderUpdate = async (id,inputData) =>{
  try {  
    return new Promise((resolve, reject)=>{     
      const sql = 'UPDATE orders SET ? WHERE id = ?';
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



exports.dashboadCart = async (id) =>{
  try {  
    return new Promise((resolve, reject)=>{     
      const sql = `SELECT COUNT(id) as cartCount from carts WHERE user_id=${id}`;
      db.query(sql,  (error, elements)=>{
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

exports.dashboadWishlist = async (id) =>{
  try {  
    return new Promise((resolve, reject)=>{     
      const sql = `SELECT COUNT(id) as wishlisttCount from wishlists WHERE user_id=${id}`;
      db.query(sql,  (error, elements)=>{
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

exports.dashboaOrders = async (id) =>{
  try {  
    return new Promise((resolve, reject)=>{     
      const sql = `SELECT COUNT(id) as ordersCount from orders WHERE user_id=${id}`;
      db.query(sql,  (error, elements)=>{
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






exports.combineOrderUpdate = async (id,inputData) =>{
  try {  
    return new Promise((resolve, reject)=>{     
      const sql = 'UPDATE combined_orders SET ? WHERE id = ?';
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




exports.notificationAdd = async (inputData) =>{

  try {  
    return new Promise((resolve, reject)=>{ 
    
      var sql = 'INSERT INTO notifications SET ?';
      db.query(sql,inputData,  (error, elements)=>{
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

exports.notificationGet = async (id) =>{

  try {  
    return new Promise((resolve, reject)=>{ 
    
      var sql = `select * from notifications where notifiable_id=${id} `;
      db.query(sql,  (error, elements)=>{
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




exports.updatePaymentStatus = async (id,inputData) =>{

  try {  
    return new Promise((resolve, reject)=>{       
     
      const sql = 'UPDATE orders SET ? WHERE id = ?'; 

      db.query(sql,[inputData, id],  (error, elements)=>{
            if(error){
                return reject(error);
            }
           
            if(elements.affectedRows>0){
              return resolve({message:"successfully updated"});
            }

            
        });
    });
    
   } catch(err) {
    console.log(err);     
   }    
};