
import React from 'react';
import { Property } from './PropertyCard';
import PropertyGrid from './PropertyGrid';

const FeaturedProperties: React.FC = () => {
  // Mock data for featured properties
  const featuredProperties: Property[] = [
    {
      id: '1',
      title: 'Luxury Oceanfront Villa',
      type: 'Villa',
      location: 'Malibu, CA',
      price: 4500000,
      bedrooms: 5,
      bathrooms: 6,
      area: 4200,
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Modern Downtown Flat',
      type: 'Flat',
      location: 'New York, NY',
      price: 1950000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Countryside Estate',
      type: 'House',
      location: 'Hamptons, NY',
      price: 3750000,
      bedrooms: 6,
      bathrooms: 5,
      area: 5800,
      imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: '4',
      title: 'Beachfront Property',
      type: 'Land',
      location: 'Miami, FL',
      price: 2300000,
      area: 12000,
      imageUrl: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=1974&auto=format&fit=crop'
    }
  ];

  return (
    <section className="container py-16">
      <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Featured Properties</h2>
      <PropertyGrid properties={featuredProperties} />
    </section>
  );
};

export default FeaturedProperties;
