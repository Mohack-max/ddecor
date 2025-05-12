
import React from 'react';
import PropertyForm from '@/components/sell/PropertyForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Sell = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-8 flex-grow">
        <h1 className="mb-8 text-3xl font-bold text-center">List Your Property</h1>
        <PropertyForm />
      </div>

      <Footer />
    </div>
  );
};

export default Sell;
