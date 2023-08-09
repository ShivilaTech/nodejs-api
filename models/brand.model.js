const db = require("./db.js");
const comman = require("./comman.model.js");

exports.topBrandGet = () =>{
    return new Promise((resolve, reject)=>{   

      db.query(`SELECT * FROM brands where top = 1`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
  
};

exports.brandGet = async (name,offset,limit) =>{
    try {
       sql= `SELECT * FROM brands `;
       let condition='';
       if(name != undefined){
        condition=`where name like '%${name}%' limit ${offset} , ${limit}`
       }
       
        const total = await comman.getTotal(table="brands",condition=condition);

        return new Promise((resolve, reject)=>{            
                db.query(sql+condition,  (error, elements)=>{
                    if(error){
                        return reject(error);
                    }
                    return resolve({data:elements , ...total[0]});
                });                 
        });        
    } catch (error) {
        console.log(error)        
    }  
};
