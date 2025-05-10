
import React from 'react';

export interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  price: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  imageUrl: string;
}

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isFavorite, onToggleFavorite }) => {
  return (
    <div className="property-card">
      <img src={property.imageUrl} alt={property.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{property.title}</h3>
        <p>{property.location}</p>
        <p>{property.price}</p>
        <button onClick={onToggleFavorite}>
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
