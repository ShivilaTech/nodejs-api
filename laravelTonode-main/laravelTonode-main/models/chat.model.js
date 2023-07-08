const db = require("./db.js");

module.exports={ 

  conversationsById: function (id, result) {
    // var numPerPage = 20;
    // var skip = (page-1) * numPerPage; 
    // var limit = skip + ',' + numPerPage;  

    db.query(`SELECT * FROM conversations WHERE sender_id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found courses: ", res[0]);
        result(null, res[0]);
        return;
      }  
     
      result({ kind: "not_found" }, null);
    });
  
},

 messagesById: function (id, result) {
  // var numPerPage = 20;
  // var skip = (page-1) * numPerPage; 
  // var limit = skip + ',' + numPerPage;  

  db.query(`SELECT * FROM messages WHERE conversation_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found courses: ", res[0]);
      result(null, res[0]);
      return;
    }  
   
    result({ kind: "not_found" }, null);
  });

},


// conversationsById: function (id, result) {
//   // var numPerPage = 20;
//   // var skip = (page-1) * numPerPage; 
//   // var limit = skip + ',' + numPerPage;  

//   db.query(`SELECT * FROM conversations WHERE sender_id = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found courses: ", res[0]);
//       result(null, res[0]);
//       return;
//     }  
   
//     result({ kind: "not_found" }, null);
//   });

// },





}
