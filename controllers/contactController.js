const path = require('path');
const Contact = require('../models/contact');
const { validationResult } = require('express-validator');

exports.getContacts = (req, res, next) => {
  Contact.find()
    .then((contacts) => {
      res
        .status(200)
        .json({ message: 'Fetched all contacts.', contacts: contacts });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });
};

exports.deleteContact = async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete({ _id: req.params.id }).then(
    (deletedContact) => {
      return res.status(201).json(deletedContact);
    }
  );
};

exports.editContact = async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: req.body._id },
    { ...req.body }
  ).then((edetedContact) => {
    return res.status(201).json(edetedContact);
  });
};

exports.createContact = (req, res, next) => {
  console.log('body=> ', req.body);
  const imageUrl = req.file.path;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  }
  if (!req.file) {
    const error = new Error('No image.');
    error.statusCode = 422;
    throw error;
  }
  const { name, role, status, email, gender, created } = req.body;

  const contact = new Contact({
    name,
    role,
    avatar: imageUrl,
    status,
    email,
    gender,
    created,
  });
  contact
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Contact was created',
        contact: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
