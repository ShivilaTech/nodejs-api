const { validationResult } = require("express-validator");
const cat = require("../models/category.model");

  exports.category = async ( req, res) => {

    try {
      const data = await cat.categoryGet()
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving ."
      });

  }

  };


  exports.featured = async ( req, res) => {

    try {
      const data = await cat.featured()
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving ."
      });

  } };

  exports.home = async ( req, res) => {
    try {
      const data = await cat.home()
      res.send(data);      
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving ."
      });

  } };

  exports.top = async ( req, res) => {
    try {
      const data = await cat.top()
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving ."
      });

  } };


  

  
