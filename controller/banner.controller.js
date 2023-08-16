const model = require("../models/banner.model");


  exports.banners = async ( req, res) => {

    try {
      const data = await model.home_banner1_images();
      const data1 = await model.home_banner2_images();
      const data2 = await model.home_banner3_images();
      const data3 = await model.home_banner4_images();
      res.send({home1:data,home2:data1,home3:data2,home4:data3});
      
     } catch(err) {
      console.log(err);     
      res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Course."
      });

  }

  };

