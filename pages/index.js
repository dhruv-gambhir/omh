import React, { useState, useEffect } from 'react';
import Property from '../components/Property';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch(
          `https://m9ojazlunf.execute-api.ap-southeast-1.amazonaws.com/test?offset=${offset}&limit=${limit}`
        );

        if (response.ok) {
          const data = await response.json();
          setProperties((prevProperties) => [...prevProperties, ...data.list]);
          setHasMore(data.hasMore);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchProperties();
  }, [offset, limit]);

  function handleLoadMore() {
    if (hasMore) {
      setOffset((prevOffset) => prevOffset + 4);
    }
  }

  function renderLoadMoreButton() {
    if (hasMore) {
      return (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      );
    }
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Property Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <Property key={property.id} property={property} />
        ))}
      </div>
      {hasMore && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;
