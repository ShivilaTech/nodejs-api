const model = require("../models/generalSettings.model");


  exports.generalSettings = async ( req, res) => {

    try {
      const data = await model.generalSettingsGet();
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }

  };

