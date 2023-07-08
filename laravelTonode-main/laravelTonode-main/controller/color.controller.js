const color = require("../models/color.model");


  exports.color = async ( req, res) => {

    try {
      const data = await color.colorGet();
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }

  };

