
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <FeaturedProperties />
      
      {/* Services Section */}
      <section className="bg-secondary py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Our Services</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-decor-gold/20 p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-decor-gold"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Buy Property</h3>
              <p className="mb-4 text-muted-foreground">
                Discover your dream home from our exclusive selection of luxury properties.
              </p>
              <Link to="/buy" className="mt-auto">
                <Button variant="outline" className="border-decor-gold text-decor-gold hover:bg-decor-gold/10">
                  Browse Properties
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-decor-gold/20 p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-decor-gold"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Sell Property</h3>
              <p className="mb-4 text-muted-foreground">
                Get the best value for your property with our expert agents and marketing services.
              </p>
              <Link to="/sell" className="mt-auto">
                <Button variant="outline" className="border-decor-gold text-decor-gold hover:bg-decor-gold/10">
                  List Your Property
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-decor-gold/20 p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-decor-gold"
                >
                  <path d="M3 3v18h18"></path>
                  <path d="m19 9-5 5-4-4-3 3"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Interior Design</h3>
              <p className="mb-4 text-muted-foreground">
                Transform your space with our professional interior design services and virtual room planning.
              </p>
              <Link to="/design" className="mt-auto">
                <Button variant="outline" className="border-decor-gold text-decor-gold hover:bg-decor-gold/10">
                  Explore Design
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-xl bg-gradient-to-r from-decor-charcoal to-decor-brown p-8 text-white sm:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="mb-4 text-3xl font-bold">Ready to Find Your Perfect Space?</h2>
                <p className="mb-6">
                  Join thousands of satisfied clients who have found their dream properties with De Decor.
                </p>
                <Button size="lg" className="bg-decor-gold hover:bg-decor-gold/90">
                  Get Started Today
                </Button>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" 
                  alt="Luxury interior" 
                  className="h-64 w-full rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
