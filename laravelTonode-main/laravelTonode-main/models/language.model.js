const db = require("./db.js");

module.exports={ 

getAllData: function (result) {
    let query = "SELECT * FROM languages";  
     
    db.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }  
      //console.log("languages: ", res);
      result(null, res);
    });
  },


}
