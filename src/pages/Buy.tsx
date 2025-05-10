
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyGrid from '@/components/PropertyGrid';
import { Property } from '@/components/PropertyCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Buy = () => {
  const { toast } = useToast();
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 6000000]);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string | null>(null);
  const [bathrooms, setBathrooms] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState("featured");
  
  // Fetch properties from database
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      
      try {
        let query = supabase
          .from('property_listings')
          .select('*');
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        if (data) {
          // Transform database results to Property type
          const mappedProperties: Property[] = data.map(item => ({
            id: item.id,
            title: item.title,
            type: item.property_type,
            location: item.location,
            price: item.price,
            bedrooms: item.bedrooms,
            bathrooms: item.bathrooms,
            area: item.area,
            imageUrl: getRandomImage(item.property_type)
          }));
          
          
           //setAllProperties(mappedProperties);
           setAllProperties(getMockProperties());
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        toast({
          title: 'Error',
          description: 'Failed to load property listings.',
          variant: 'destructive',
        });
        
        // Fall back to mock data if database fetch fails
        setAllProperties(getMockProperties());
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProperties();
  }, [toast]);
  
  // Function to get random image URL based on property type
  const getRandomImage = (propertyType: string) => {
    const images = {
      'House': [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2065&auto=format&fit=crop',
      ],
      'Villa': [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      ],
      'Flat': [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop',
      ],
      'Land': [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=1974&auto=format&fit=crop',
      ],
    };
    
    const typeImages = images[propertyType as keyof typeof images] || images['House'];
    return typeImages[Math.floor(Math.random() * typeImages.length)];
  };
  
  // Fallback mock data
  const getMockProperties = (): Property[] => [
    {
      id: '1',
      title: 'Luxury Oceanfront Villa',
      type: 'Villa',
      location: 'Guntur ',
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
      location: 'Vijayawada ',
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
      location: 'Guntur, India',
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
      location: 'Gujarat',
      price: 2300000,
      area: 12000,
      imageUrl: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=1974&auto=format&fit=crop'
    },
    {
      id: '5',
      title: 'Mountain View Chalet',
      type: 'House',
      location: 'Guntur ',
      price: 2800000,
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2065&auto=format&fit=crop'
    },
    {
      id: '6',
      title: 'Urban Penthouse',
      type: 'Flat',
      location: 'Delhi, India',
      price: 3200000,
      bedrooms: 3,
      bathrooms: 3,
      area: 2300,
      imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: '7',
      title: 'Waterfront Land',
      type: 'Land',
      location: 'Mangalagiri, WA',
      price: 1850000,
      area: 9600,
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop'
    },
    {
      id: '8',
      title: 'Tuscan Style Villa',
      type: 'Villa',
      location: 'Guntur, CA',
      price: 5100000,
      bedrooms: 6,
      bathrooms: 7,
      area: 5600,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
    },
  ];

  // Apply filters
  const filteredProperties = allProperties.filter(property => {
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesType = propertyType === null || property.type === propertyType;
    const matchesLocation = location === "" || property.location.toLowerCase().includes(location.toLowerCase());
    const matchesBedrooms = bedrooms === null || 
      (property.bedrooms && property.bedrooms >= parseInt(bedrooms));
    const matchesBathrooms = bathrooms === null || 
      (property.bathrooms && property.bathrooms >= parseInt(bathrooms));
    
    return matchesPrice && matchesType && matchesLocation && matchesBedrooms && matchesBathrooms;
  });
  
  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortOrder) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        // In a real app, you'd sort by creation date
        // Here we'll just use the ID as a proxy for "newest"
        return a.id < b.id ? 1 : -1;
      case 'featured':
      default:
        // Random sort for featured
        return 0.5 - Math.random();
    }
  });

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop)' }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="container relative z-10 flex h-full flex-col items-center justify-center space-y-6 text-center text-white">
          <div className="max-w-2xl">
            <h1 className="mb-2 text-4xl font-bold md:text-5xl">
              Find Your Dream Property
            </h1>
            <p className="text-lg md:text-xl">
              Browse our exclusive collection of luxury properties
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Filters</h2>
              
              <Accordion type="single" collapsible defaultValue="price" className="w-full">
                <AccordionItem value="price">
                  <AccordionTrigger>Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                      <Slider
                        defaultValue={[0, 6000000]}
                        max={6000000}
                        step={1000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="my-4"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="type">
                  <AccordionTrigger>Property Type</AccordionTrigger>
                  <AccordionContent>
                    <Select value={propertyType || undefined} onValueChange={setPropertyType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Flat">Flat</SelectItem>
                        <SelectItem value="Land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="location">
                  <AccordionTrigger>Location</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Label htmlFor="location">Search Location</Label>
                      <Input
                        id="location"
                        placeholder="Enter city or state..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="bedsbaths">
                  <AccordionTrigger>Beds & Baths</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bedrooms">Bedrooms (min)</Label>
                        <Select value={bedrooms || undefined} onValueChange={setBedrooms}>
                          <SelectTrigger id="bedrooms" className="w-full">
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1+</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                            <SelectItem value="5">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bathrooms">Bathrooms (min)</Label>
                        <Select value={bathrooms || undefined} onValueChange={setBathrooms}>
                          <SelectTrigger id="bathrooms" className="w-full">
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1+</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                            <SelectItem value="5">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-6 flex flex-col space-y-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([0, 6000000]);
                    setPropertyType(null);
                    setLocation("");
                    setBedrooms(null);
                    setBathrooms(null);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Properties Grid */}
          <div className="md:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-60">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <>
                <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
                  <h2 className="text-2xl font-semibold">
                    {sortedProperties.length} {sortedProperties.length === 1 ? 'Property' : 'Properties'} Found
                  </h2>
                  <Select defaultValue="featured" onValueChange={setSortOrder}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                      <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                      <SelectItem value="newest">Newest Listed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {sortedProperties.length > 0 ? (
                  <PropertyGrid properties={sortedProperties.map(property => ({
                    ...property,
                    price: formatPrice(property.price)
                  }))} />
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="mb-2 text-xl font-semibold">No properties found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters to find properties.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Buy;
