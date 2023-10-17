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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Property Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <Property key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Home;
