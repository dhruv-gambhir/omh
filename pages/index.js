import React, { useState, useEffect, useRef } from 'react';
import Property from '../components/Property';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  // Ref for the container to implement infinite scrolling
  const containerRef = useRef(null);

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

  // Function to handle infinite scrolling
  function handleScroll() {
    if (containerRef.current && hasMore) {
      const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
      if (scrollHeight - scrollTop === clientHeight) {
        setOffset((prevOffset) => prevOffset + 4);
      }
    }
  }

  useEffect(() => {
    if (containerRef.current && typeof window !== 'undefined') {
      containerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (containerRef.current && typeof window !== 'undefined') {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasMore]);

  function handleLoadMore() {
    if (hasMore) {
      setOffset((prevOffset) => prevOffset + 4);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Property Listings</h1>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        ref={containerRef} // Attach the ref to the container div
      >
        {properties.map((property) => (
          <Property key={property.id} property={property} />
        ))}
      </div>
      {hasMore ? (
        // Use the "Load More" button
        <div className="text-center mt-4">
          <button
            className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
