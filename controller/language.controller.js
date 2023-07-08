const { validationResult } = require("express-validator");
const language = require("../models/language.model");


  exports.getAll = (req, res) => {  
    language.getAllData((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Course."
        });
      else res.send(data);
    });
  };

