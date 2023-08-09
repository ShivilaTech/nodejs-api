const db = require("./db.js");


exports.save = async (data) =>{

    try {  
      return new Promise((resolve, reject)=>{ 
        let inputData;
            
             inputData =({
              user_id: data.user_id,
              address: data.address,
              country_id:data.country_id,               
              state_id:data.state_id, 
              city_id:data.city_id,
              postal_code:data.postal_code,
              phone:data.phone                               
            });                    
        var sql = 'INSERT INTO addresses SET ?';
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
  
  
  exports.update = async (data) =>{     
    const {address,country_id,state_id,city_id,postal_code,phone}=data;
    try {     
     var inputData = new Object();
   
     (address)? inputData.address=address: '';
     (country_id)? inputData.country_id=country_id:'';
     (state_id)? inputData.state_id=state_id: '';
     (city_id)? inputData.city_id=city_id: '';
     (postal_code)? inputData.postal_code=postal_code:'';
     (phone)? inputData.phone=phone:'';

      return new Promise((resolve, reject)=>{       
       
        const sql = 'UPDATE addresses SET ? WHERE id = ?'; 
  
        db.query(sql,[inputData, data.id],  (error, elements)=>{
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

  exports.updateDefault = async (data) =>{     
    const {id,set_default}=data;
    try {     
     var inputData = new Object();   
     (set_default)? inputData.set_default=set_default: '';
      return new Promise((resolve, reject)=>{        
        const sql = 'UPDATE addresses SET ? WHERE id = ?';   
        db.query(sql,[inputData,id],  (error, elements)=>{
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

  exports.delete = async (id) =>{     
    try {   

      return new Promise((resolve, reject)=>{        
        const sql = 'delete FROM addresses  WHERE id = ?';   
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

exports.userAddressGet = (id) =>{
    return new Promise((resolve, reject)=>{   

      db.query(`SELECT * FROM addresses  where user_id= ${id}`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
  
};

exports.userAddressGetByAddressId = (id) =>{
  return new Promise((resolve, reject)=>{   
     const sql = `SELECT addresses.*, countries.name as country_name ,states.name as state_name, cities.name as city_name FROM addresses 
                  join countries on addresses.country_id=countries.id 
                  join cities on addresses.city_id=cities.id 
                  join states on addresses.state_id=states.id                   
                  where addresses.id= ${id}`;
    db.query(sql,(error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements[0]);
      });
  });

};

exports.getCity = () =>{
    return new Promise((resolve, reject)=>{   

      db.query(`SELECT * FROM cities  where status = 1`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
  
};

exports.getCountries = () =>{
    return new Promise((resolve, reject)=>{   

      db.query(`SELECT * FROM countries  where status = 1`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
  
};


exports.getCitiesByState = (id) =>{
    return new Promise((resolve, reject)=>{   

      db.query(`SELECT * FROM cities  where state_id = ${id} and  status = 1`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
  
};

exports.getStatesByCountry = (id) =>{
    return new Promise((resolve, reject)=>{   

      db.query(`SELECT * FROM states  where country_id = ${id} and  status = 1`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
  
};


