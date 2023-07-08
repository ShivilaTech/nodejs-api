const { validationResult } = require("express-validator");
const product = require("../models/product.model");


  exports.get = (req, res) => {  
    product.getProduct((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Course."
        });
      else res.send(data);
    });
  };

  exports.admin = (req, res) => {  
    product.adminProduct((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Course."
        });
      else res.send(data);
    });
  };
   


  exports.todaysDealProduct = (req, res) => {  
    product.todaysDealProduct((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Course."
        });
      else res.send(data);
    });
  };

  exports.featuredProduct = (req, res) => {  
    product.featuredProduct((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Course."
        });
      else res.send(data);
    });
  };

  
  exports.bestSellerProduct = (req, res) => {  
    product.bestSellerProduct((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Course."
        });
      else res.send(data);
    });
  };

  exports.homeProduct = (req, res) => {  
    product.homeProduct((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Course."
        });
      else res.send(data);
    });
  };

  
  

  