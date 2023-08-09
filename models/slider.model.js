const db = require("./db.js");
const comman = require("./comman.model.js");

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
