const model = require("../models/homeCategories.model");


  exports.homeCategories = async ( req, res) => {

    try {
      const data = await model.homeCategoriesGet();
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }

  };

