const db = require("./db.js");

module.exports={ 
    create:function(inputData,result){
    var sql = 'INSERT INTO courses SET ?'; 
    db.query(sql, inputData,function (err, res) {
  
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created course: ", { id: res.insertId, ...inputData });
      result(null, { id: res.insertId, ...inputData });
    });
  },
  
  getById: function (id, result) {
    db.query(`SELECT * FROM courses WHERE id = ${id}`, (err, res) => {
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

getAllData: function (result) {
    let query = "SELECT * FROM courses";  
     
    db.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("tutorials: ", res);
      result(null, res);
    });
  },


    
  deleteById: function (id, result) {
    db.query(`delete  FROM courses WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }   
      result(null,'sucess')
    });
  
},

 updateById: function (id,inputData, result) {

    const sql = 'UPDATE courses SET ? WHERE id = ?';  

      db.query(sql, [inputData,id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated courses: ", { id: id, ...inputData });
        result(null, { id: id, ...inputData });
      }
    );
  }


}
