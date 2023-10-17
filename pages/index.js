import React, { useState, useEffect } from 'react';
import Property from '../components/Property';

const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch(
          'https://m9ojazlunf.execute-api.ap-southeast-1.amazonaws.com/test'
        );

        if (response.ok) {
          const data = await response.json();
          setProperties(data.list);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchProperties();
  }, []);

  return (
    <div className="container">
      <h1>Property Listings</h1>
      <div className="property-list">
        {properties.map((property) => (
          <Property key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Home;
