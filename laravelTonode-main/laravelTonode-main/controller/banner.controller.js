const model = require("../models/generalSettings.model");


  exports.banners = async ( req, res) => {

    try {
      const data = await model.bannersGet();
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }

  };

