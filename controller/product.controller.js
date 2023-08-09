const { validationResult } = require("express-validator");
const product = require("../models/product.model");
const comman = require("../models/comman.model");
const cart = require("../models/cart.model");

  
exports.search = (req, res) => { 

  product.search(req.body.search,req.body.offset,req.body.limit,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Course."
      });
    else res.send(data);
  });
 };

  exports.get = (req, res) => { 

    product.getProduct(req.params.offset,req.params.limit,(err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Course."
        });
      else res.send(data);
    });
  };

  exports.productDetails = (req, res) => { 

    product.productDetails(req.params.id,async(err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Course."
        });
      else {
       
        const  productImage =  await  comman.getImagebyId(data.photos) 
        const  variant =  await cart.getvariant(data.id) 

        const response =({data,productImage,variant})
        res.send(response);

      } 
    });
  };

  exports.getbyCategory = (req, res) => {  
    
    product.getbyCategory(req.params.id,req.query,(err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Course."
        });
      else res.send(data);
    });
  };

  exports.getByBrand = (req, res) => {  
    product.getByBrand(req.params.id,req.query,(err, data) => {
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

  
  

  