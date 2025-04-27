
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import PropertyForm from '@/components/sell/PropertyForm';

const Sell = () => {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold text-center">List Your Property</h1>
      <PropertyForm />
    </div>
  );
};

export default Sell;
