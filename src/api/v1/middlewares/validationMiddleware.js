// src/api/v1/middlewares/validationMiddleware.js
const { body, validationResult } = require('express-validator');

const validateProduct = [
  body('name').trim().not().isEmpty().withMessage('Product name is required.'),
  body('image_url').isURL().withMessage('A valid image URL is required.'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0.'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be an integer of 0 or more.'),

  // This function handles the result of the validation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateProduct,
};