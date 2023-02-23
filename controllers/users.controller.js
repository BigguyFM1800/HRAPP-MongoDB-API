const db = require("../configs/db.config");
const User = require("../models/user.models");

// Create and save a new employee
exports.create = async (req, res) => {
  // Validate request
  if (
    !req.body.firstname &&
    !req.body.lastname &&
    !req.body.email &&
    !req.body.password
  ) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // Create a new user
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });

  // Save User in the database
  await user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

// Get all users
exports.findAll = async (req, res) => {
  console.log("all users");
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Get a single user by id
exports.findOne = async (req, res) => {
  console.log("single user");
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found user with id=" + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving user with id=" + id });
    });
};

// Update details of a user by id
exports.update = async (req, res) => {
  console.log("update");
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }
  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a user by id
exports.delete = async (req, res) => {
  console.log("delete");
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete User with id=" + id,
      });
    });
};
