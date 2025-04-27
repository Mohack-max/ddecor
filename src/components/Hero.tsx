import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
const Hero: React.FC = () => {
  return <div className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop)'
    }}>
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      <div className="container relative z-10 flex h-full flex-col items-start justify-center space-y-6 text-white">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
            Discover Your Perfect Space
          </h1>
          <p className="mb-8 text-lg md:text-xl">
            Luxury properties and interior design solutions tailored to your lifestyle.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link to="/buy">
              <Button size="lg" className="bg-decor-gold hover:bg-decor-gold/90">
                Explore Properties
              </Button>
            </Link>
            <Link to="/design">
              <Button size="lg" variant="outline" className="border-white hover:bg-white/20 text-orange-300">
                Design Your Space
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
export default Hero;