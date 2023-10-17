import React from 'react';

const Property = ({ property }) => {
  return (
    <div className="property">
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>Price: ${property.price}</p>
      <img src={property.imageurl} alt={property.title} />
    </div>
  );
};

export default Property;
