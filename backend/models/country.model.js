const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: { type: String, required: true },
  capital: { type: String },
  population: { type: Number },
  region: { type: String },
  subregion: { type: String },
  flags: {
    svg: { type: String },
    png: { type: String }
  }
}, {
  timestamps: true,
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;