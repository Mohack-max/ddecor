
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Link } from 'react-router-dom';

export interface Property {
  id: string;
  title: string;
  type: 'Villa' | 'House' | 'Flat' | 'Land';
  location: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  imageUrl: string;
}

interface PropertyCardProps {
  property: Property;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  isFavorite = false,
  onToggleFavorite = () => {},
}) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card 
      className="property-card overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-300"
          style={{
            transform: isHovering ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div className="absolute right-2 top-2">
          <Badge className="bg-decor-gold text-white">{property.type}</Badge>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(property.id);
          }}
          className="absolute right-2 bottom-2 rounded-full bg-white/80 p-1.5 hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isFavorite ? "text-red-500" : "text-gray-600"}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-1 text-lg font-semibold">{property.title}</h3>
        <p className="mb-2 text-sm text-muted-foreground">{property.location}</p>
        <p className="mb-4 text-xl font-bold text-decor-brown">{formatPrice(property.price)}</p>
        <div className="flex items-center justify-between text-sm">
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path>
                <path d="M2 20h.01"></path>
              </svg>
              {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 7l9-4 9 4"></path>
                <path d="M21 15a9 9 0 1 1-18 0"></path>
              </svg>
              {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
            </div>
          )}
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9.5L9 4l6 5.5a3 3 0 0 1 0 4.24l-6 5.5-6-5.5a3 3 0 0 1 0-4.24z"></path>
            </svg>
            {property.area} sqft
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-secondary/50 px-4 py-3">
        <Link to={`/property/${property.id}`} className="w-full">
          <Button variant="default" className="w-full bg-decor-brown hover:bg-decor-brown/90">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
