import React from 'react';

const Property = ({ property }) => {
  return (
    <div className="property border p-4 m-4">
      <img src={property.imageurl} alt={property.title} className="max-w-full" />
      <h2 className="text-xl font-semibold">{property.title}</h2>
      <p className="text-gray-600">{property.description}</p>
      <p className="text-purple-700">Price: ${property.price}</p>
    </div>
  );
};

export default Property;
