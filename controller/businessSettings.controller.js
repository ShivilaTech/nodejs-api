const model = require("../models/businessSettings.model");


  exports.businessSettings = async ( req, res) => {

    try {
      const data = await model.businessSettingsGet();
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }

  };

