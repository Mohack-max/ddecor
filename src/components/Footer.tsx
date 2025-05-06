
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from './ui/separator';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted py-8">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-serif text-xl font-bold">De Decor</h3>
            <p className="mb-4 text-muted-foreground">
              Luxury real estate and interior design solutions tailored to your lifestyle.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-medium">Properties</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/buy" className="hover:text-primary">Buy Properties</Link></li>
              <li><Link to="/sell" className="hover:text-primary">Sell Properties</Link></li>
              <li><Link to="/design" className="hover:text-primary">Interior Design</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-medium">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-medium">Contact</h4>
            <address className="text-muted-foreground">
              <p>1234 Luxury Lane</p>
              <p>Mumbai, Maharashtra 400001</p>
              <p className="mt-2">Contact Number : +91 7866921605</p>
              <p>Email: kroy8331@gmail.com</p>
            </address>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} De Decor. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
