const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

const Country = require('./models/country.model');

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function populateDatabase() {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data;

    for (const country of countries) {
      const newCountry = new Country({
        name: country.name.common,
        capital: country.capital ? country.capital[0] : 'N/A',
        population: country.population,
        region: country.region,
        subregion: country.subregion,
        flags: country.flags
      });

      await newCountry.save();
    }

    console.log('Database populated successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error populating database:', error);
    mongoose.connection.close();
  }
}

populateDatabase();