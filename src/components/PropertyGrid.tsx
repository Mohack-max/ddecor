
import React, { useState } from 'react';
import PropertyCard, { Property } from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter(fav => fav !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {properties.map((property) => (
        <PropertyCard 
          key={property.id} 
          property={property} 
          isFavorite={favorites.includes(property.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;
