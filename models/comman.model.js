const db = require("./db.js");
const nodemailer = require('nodemailer');


exports.objectToCommaSeparatedValueOnly = (obj) =>{

 
  const keys = Object.keys(obj);
  const values = keys.map(key => `'${obj[key]}'` );
  return values.join(',');
  //return keys.join(',')
};

exports.objectToCommaSeparatedKeyOnly = (obj) =>{
  const keys = Object.keys(obj);
  return keys.join(',')
};


exports.businessSettings = (key, lang = false) =>{
  return new Promise((resolve, reject)=>{

    let sql;
    if (lang == false) {
        sql=`SELECT * FROM business_settings where type = '${key}' `;
    }else {
        sql=`SELECT * FROM business_settings where type = '${key}' and lang= '${lang}' `;
    }

    db.query(sql,  (error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements);
      });
  });
};


  exports.getTotal = (table,condition='') =>{
    return new Promise((resolve, reject)=>{  
      let sql;    
         
      sql =`SELECT Count(*) as total FROM ${table} ${condition}`;
  
      db.query(sql, (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
  };


  exports.getImagebyId = async (ids) =>{

    try {
      
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

  exports.uploadImages = async (data) =>{

    try {  
      return new Promise((resolve, reject)=>{      
  
        var sql = 'INSERT INTO uploads SET ?';
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


  exports.updateuserImage= async (inputData,id) =>{

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
  


exports.sendmail = (data)=>{
  
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
	auth: {
		user:'krishnashivila@gmail.com',
		pass:'shtrzhwdzlpczbbd'
	}
});




const mailConfigurations = {
	// It should be a string of sender/server email
	from: 'krishnashivila@gmail.com',
	to:  data.to ,// 'krishnashivila@gmail.com',
	subject: data.subject,
	html:data.message	
};

transporter.sendMail(mailConfigurations, function(error, info){
	if (error) throw Error(error);
  
	//console.log('Email Sent Successfully');
	//console.log(info);
 
});
}


