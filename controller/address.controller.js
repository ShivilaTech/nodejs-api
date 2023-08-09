const model = require("../models/address.model");

exports.saveAddress = async ( req, res) => {
  try {
    const data = await model.save(req.body);
    res.send(data);
    
   } catch(err) {
    console.log(err);     
    res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Course."
    });
}};

exports.updateDefault = async ( req, res) => {
  try {
    const data = await model.updateDefault(req.body);
    res.send(data);
    
   } catch(err) {
    console.log(err);     
    res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Course."
    });
}};

exports.delete = async ( req, res) => {
  try {
    const data = await model.delete(req.params.id);
    res.send(data);
    
   } catch(err) {
    console.log(err);     
    res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Course."
    });
}};


exports.updateAddress = async ( req, res) => {
  try {
    const data = await model.update(req.body);
    res.send(data);
    
   } catch(err) {
    console.log(err);     
    res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Course."
    });
}};


  exports.userAddress = async ( req, res) => {

    try {
      const data = await model.userAddressGet(req.params.id);
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }

  };


  exports.getCity = async ( req, res) => {
    try {
      const data = await model.getCity();
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });
  }

  };

  exports.getCountries = async ( req, res) => {
    try {
      const data = await model.getCountries();
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });
  }
  };

  exports.getCitiesByState = async ( req, res) => {
    try {
      const data = await model.getCitiesByState(req.params.id);
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });
  }
  };


  exports.getStatesByCountry = async ( req, res) => {
    try {
      const data = await model.getStatesByCountry(req.params.id);
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });
  }
  };
