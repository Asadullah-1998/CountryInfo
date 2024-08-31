import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupedCountries, setGroupedCountries] = useState({});
  const alphabetRefs = useRef({});

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/countries');
        const sortedCountries = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCountries(sortedCountries);
        setFilteredCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const grouped = filteredCountries.reduce((acc, country) => {
      const firstLetter = country.name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(country);
      return acc;
    }, {});
    setGroupedCountries(grouped);
  }, [filteredCountries]);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, countries]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const scrollToLetter = (letter) => {
    alphabetRefs.current[letter]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="country-list-container">
      <h1>Country List</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="country-list-wrapper">
        <ul className="country-list">
          {Object.entries(groupedCountries).map(([letter, countries]) => (
            <li key={letter} ref={el => alphabetRefs.current[letter] = el}>
              <h2>{letter}</h2>
              <ul>
                {countries.map((country) => (
                  <li key={country._id}>
                    <Link to={`/country/${country.name}`}>
                      <img
                        src={country.flags.svg}
                        alt={`${country.name} flag`}
                        className="country-flag"
                      />
                      <span>{country.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="alphabet-nav">
          {Object.keys(groupedCountries).map(letter => (
            <button key={letter} onClick={() => scrollToLetter(letter)}>
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CountryList;