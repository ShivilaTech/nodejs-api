const db = require("./db.js");
const comman = require("./comman.model.js");

module.exports={ 

  getByBrand: function (id,serch,result) {

    let sql='';
    if(serch.price_max>0 && serch.price_min>0){
      sql=`and unit_price BETWEEN ${serch.price_min} AND ${serch.price_max}`;
    }
    if(serch.shoe_size>0){
       sql=`and choice_options LIKE '%${serch.shoe_size}%' `;
    }
    if(serch.generator>0){
       sql=`and choice_options LIKE '%${serch.generator}%' `;
    }

    if(serch.litter>0){
       sql=`and choice_options LIKE '%${serch.generator}%' `;
    }

    let query = `SELECT json_extract(products.choice_options, '$[0].values[*]') AS choice_options, brands.name as brand_name,products.unit_price,products.name,products.id,products.discount,products.discount_type,products.discount_end_date , uploads.file_original_name ,uploads.file_name, uploads.extension, ROUND(AVG(reviews.rating)) as rating FROM  products
     left join uploads on products.thumbnail_img=uploads.id
     left join reviews on products.id =reviews.product_id
     left join brands on products.brand_id =brands.id
       where brands.slug like '%${id}%' ${sql}  GROUP by products.id`;  
     
    db.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }  
      //console.log("languages: ", res);
      result(null, res);
    });
  },
//Aashirvaad-Select-Sharbati-Whole-Wheat-Atta-5-kg-Tgvq5
  getbyCategory: function (id,serch,result) {

     let sql='';
    if(serch.price_max>0 && serch.price_min>0){
      sql=`and unit_price BETWEEN ${serch.price_min} AND ${serch.price_max}`;
    }
    if(serch.shoe_size>0){
       sql=`and choice_options LIKE '%${serch.shoe_size}%' `;
    }
    if(serch.generator>0){
       sql=`and choice_options LIKE '%${serch.generator}%' `;
    }

    if(serch.litter>0){
       sql=`and choice_options LIKE '%${serch.generator}%' `;
    }
    
    
    let query = `SELECT json_extract(products.choice_options, '$[0].values[*]') AS choice_options, brands.name as brand_name,products.unit_price, products.name,products.id,products.discount,products.discount_type,products.discount_end_date , uploads.file_original_name ,uploads.file_name, uploads.extension, ROUND(AVG(reviews.rating)) as rating FROM  products
    left join uploads on products.thumbnail_img=uploads.id
    left join reviews on products.id =reviews.product_id
    left join brands on products.brand_id =brands.id
    left join categories on products.category_id =categories.id
      where categories.slug like '%${id}%' ${sql} GROUP by products.id`; 
     
    db.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }  
      //console.log("languages: ", res);
      result(null, res);
    });
  },

getProduct: async function (offset,limit,result) {
    
    const total = await comman.getTotal(table="products",condition='');
    let query = `SELECT brands.name as brand_name,products.unit_price, products.name,products.id,products.discount,products.discount_type,products.discount_end_date,uploads.file_original_name ,uploads.file_name, uploads.extension, ROUND(AVG(reviews.rating)) as rating FROM products 
     left join uploads on products.thumbnail_img=uploads.id 
     left join brands on products.brand_id =brands.id
     left join reviews on products.id =reviews.product_id GROUP by products.id
     limit ${offset} , ${limit} `;  
     
    db.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }  
      //console.log("languages: ", res);
      const response =({res,...total[0]})
      result(null, response );
    });
  },

  search: async function (search,offset,limit,result) {


    const  condition=`where products.name like '%${search}%'`;
    const total = await comman.getTotal(table="products",condition);  

    let query = `SELECT brands.name as brand_name,products.unit_price, products.name,products.id,products.discount,products.discount_type,products.discount_end_date,uploads.file_original_name ,uploads.file_name, uploads.extension, ROUND(AVG(reviews.rating)) as rating FROM products 
     left join uploads on products.thumbnail_img=uploads.id 
     left join brands on products.brand_id =brands.id
     left join reviews on products.id =reviews.product_id ${condition} GROUP by products.id
     limit ${offset} , ${limit} `;  
     
    db.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }  
      //console.log("languages: ", res);
      const response =({res,...total[0]})
      result(null, response );
    });
  },  
   
  productDetails: async function (id,result) {
    
  let query = `SELECT categories.name as categories_name,  brands.name as brand_name,products.*, ROUND(AVG(reviews.rating)) as rating FROM products 
     left join brands on products.brand_id =brands.id
     left join categories on products.category_id =categories.id
     left join reviews on products.id =reviews.product_id where products.id= ${id}`;  
     
    db.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }  
      //console.log("languages: ", res);
     
      result(null, res[0]);
    });
  },

  

  adminProduct: function (result) {
    let query = "SELECT * FROM products where added_by= 'admin'";  
     
    db.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }  
      //console.log("languages: ", res);
      result(null, res);
    });
  },
  
  
  todaysDealProduct: function (result) {
    let query = "SELECT * FROM products where todays_deal= '1'";  
     
    db.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }  
      //console.log("languages: ", res);
      result(null, res);
    });
  },
  
  featuredProduct: function (result) {
    let query = "SELECT * FROM products where featured= '1'";  
     
    db.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }  
      //console.log("languages: ", res);
      result(null, res);
    });
  },
 
  
  bestSellerProduct: function (result) {
    let query = "SELECT * FROM products order by num_of_sale desc limit 20";  
     
    db.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }  
      //console.log("languages: ", res);
      result(null, res);
    });
  },


  homeProduct: function (result) {
    let query = "SELECT * FROM products order by num_of_sale desc limit 20";  
     
    db.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }  
      //console.log("languages: ", res);
      result(null, res);
    });
  },

  
  
  

  

  

}
