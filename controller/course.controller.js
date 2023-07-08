const { validationResult } = require("express-validator");
const Course = require("../models/course.model");




exports.create = (req, res) => {

    const errors = validationResult(req);
    
        // if there is error then return Error
        if (!errors.isEmpty()) {
          return res.status(400).json({
            success: false,
            errors: errors.array(),
          });
        }
    
    const course =({
        courseName: req.body.courseName,
        courseDesc: req.body.courseDesc,
        instructorOccupation: req.body.instructorOccupation,
        instructorName: req.body.instructorName,
        instructorDesc: req.body.instructorDesc,
        courseDesc: req.body.courseDesc,
        price: req.body.price,
        whatYouGet: req.body.whatYouGet,

    });

  
    Course.create(course, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the course."
        });
        else res.send(data);
    });
};


exports.get = (req, res) => {
    Course.getById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Tutorial with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.getAll = (req, res) => {  
    Course.getAllData((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Course."
        });
      else res.send(data);
    });
  };

  exports.delete = (req, res) => {
    Course.deleteById(req.params.id, (err, data) => {
      if (err) {
     
          res.status(500).send({
            message: "Error retrieving Course with id " + req.params.id
          });
        
      } else res.send({message:"delete sucessfully"});
    });
  };


  exports.update = (req, res) => {
    // Validate Request
    const errors = validationResult(req);
    
    // if there is error then return Error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    Course.updateById(
      req.params.id,
      req.body,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Course with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Course with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.list = (req, res) => {  
    Course.getAllData((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Course."
        });
      else res.send(data);
    });
  };

  exports.listImage = (req, res) => {  
    Course.getAllData((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Course."
        });
      else res.send(data);
    });
  };
