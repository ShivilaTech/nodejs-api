const model = require("../models/brand.model");


  exports.topBrand = async ( req, res) => {
    try {
      const data = await model.topBrandGet();
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });
    }  
  };

  exports.brandGet = async ( req, res) => {
    try {
      const data = await model.brandGet(req.body.name,req.params.offset,req.params.limit);
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });
    }  
  };
//brands
