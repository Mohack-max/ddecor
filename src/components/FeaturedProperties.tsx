
import React from 'react';
import { Property } from './PropertyCard';
import PropertyGrid from './PropertyGrid';

const FeaturedProperties: React.FC = () => {
  // Function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Mock data for featured properties
  const featuredProperties: Property[] = [
    {
      id: '1',
      title: 'Luxury Oceanfront Villa',
      type: 'Villa',
      location: 'Goa, India', // Updated locality
      price: formatPrice(4500000), // Format price
      bedrooms: 5,
      bathrooms: 6,
      area: 4200,
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Modern Downtown Flat',
      type: 'Flat',
      location: 'Mumbai, India', // Updated locality
      price: 1950000, // Price in INR
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Countryside Estate',
      type: 'House',
      location: 'Bangalore, India', // Updated locality
      price: formatPrice(3750000), // Format price
      bedrooms: 6,
      bathrooms: 5,
      area: 5800,
      imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: '4',
      title: 'Beachfront Property',
      type: 'Land',
      location: 'Chennai, India', // Updated locality
      price: formatPrice(2300000), // Format price
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
