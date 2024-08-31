const router = require('express').Router();
let Country = require('../models/country.model');

router.route('/').get((req, res) => {
  Country.find()
    .then(countries => res.json(countries))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:name').get((req, res) => {
  Country.findOne({ name: req.params.name })
    .then(country => res.json(country))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;