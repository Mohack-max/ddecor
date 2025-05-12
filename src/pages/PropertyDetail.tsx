import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch property details using the id
  // For now, we'll just display the id
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-12">
        <h1 className="text-3xl font-bold">Property Details</h1>
        <p>Property ID: {id}</p>
        {/* Add more details here */}
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetail;