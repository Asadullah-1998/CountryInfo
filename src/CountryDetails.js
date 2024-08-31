import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import * as Flags from 'country-flag-icons/react/3x2'

function CountryDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const foundCountry = response.data.find(
          (country) => country.name.common === name
        );
        setCountry(foundCountry);
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    };

    fetchCountry();
  }, [name]);

  const handleBackClick = () => {
    navigate('/');
  };

  if (!country) return <div>Loading...</div>;

  // const FlagComponent = Flags[country.cca2];

  return (
    <div className="country-details">
      <button onClick={handleBackClick} className="back-button">
        &larr; Back
      </button>
      <h1><img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  className="country-flag"
                />{country.name.common}</h1>
      <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Population:</strong> {country.population}</p>
      <p><strong>Area:</strong> {country.area} km²</p>
      <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
      <p><strong>Currencies:</strong> {Object.values(country.currencies).map(currency => currency.name).join(', ')}</p>
    </div>
  );
}

export default CountryDetails;
