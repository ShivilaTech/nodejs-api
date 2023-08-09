const model = require("../models/subCategories.model");


  exports.subCategories = async ( req, res) => {

    try {
      const data = await model.subCategoriesGet(req.params.id);
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }

  };

