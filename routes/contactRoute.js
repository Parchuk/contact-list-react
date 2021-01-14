const express = require('express');
const contactController = require('../controllers/contactController');
const { body } = require('express-validator');

const router = express.Router();

router.get('/contacts', contactController.getContacts);
router.post(
  '/contacts',
  [
    body('name', 'Name must be min 3 and max 20 characters long').isLength({
      min: 3,
      max: 20,
    }),
    body('role', 'Role must be min 4 and max 15 characters long')
      .exists()
      .isLength({ min: 4, max: 15 }),
    // body('avatar', 'Avatar must be min 1 and max 99 characters long').exists().isLength({ min: 1, max: 99 }),
    body('status', 'Status must be min 4 and max 15 characters long')
      .exists()
      .isLength({ min: 4, max: 15 }),
    body('email', 'Email is not valid').isEmail(),
    body('gender', 'Gender must be min 3 and max 5 characters long')
      .exists()
      .isLength({ min: 3, max: 5 }),
    body('created', 'Created must be min 8 characters long')
      .exists()
      .isLength({ min: 8 }),
  ],
  contactController.createContact
);
router.delete('/contacts/:id', contactController.deleteContact);
router.put('/contacts', contactController.editContact);

module.exports = router;
