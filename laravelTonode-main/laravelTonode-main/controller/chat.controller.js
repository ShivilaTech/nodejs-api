const { validationResult } = require("express-validator");
const chat = require("../models/chat.model");

//chat/conversations/{id}

exports.conversations = (req, res) => {
  chat.conversationsById(req.params.id, (err, data) => {
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


exports.messagesById = (req, res) => {
  chat.messagesById(req.params.id, (err, data) => {
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
