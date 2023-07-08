const slider = require("../models/slider.model");

  exports.slider = async ( req, res) => {

    try {
      const data = await slider.sliderGet();
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }

  };

