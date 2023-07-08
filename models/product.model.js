const db = require("./db.js");

module.exports={ 

getProduct: function (result) {
    let query = "SELECT * FROM products";  
     
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
