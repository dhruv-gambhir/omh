import React from 'react';
import Image from 'next/image';
const Property = ({ property }) => {
  console.log("Property")
  console.log(property.imageurl)
  return (
    <div className="property p-4 m-4">
      <img src={property.imageurl} alt='image' style={{width: 336, height: 200, borderRadius: 10}} /> 
      {/* <Image src={property.imageurl} alt={property.title} width={20} height={20}/> */}
      <h2 className="text-xl font-semibold text-black">{property.title}</h2>
      <p className="text-gray-600">{property.description}</p>
      <p className="text-gray-700">Price: ${property.price}</p>
    </div>
  );
};

export default Property;
