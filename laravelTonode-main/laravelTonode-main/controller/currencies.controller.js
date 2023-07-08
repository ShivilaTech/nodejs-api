const currency = require("../models/currencies.model");


  exports.currency = async ( req, res) => {

    try {
      const data = await currency.currencyGet();
      res.send(data);
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }

  };

