import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard, { Property } from '@/components/PropertyCard';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Saved = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('favorites');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  
  // Mock data for saved properties
  const mockSavedProperties: Property[] = [
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
  ];

  const mockRecentViews: Property[] = [
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
      id: '5',
      title: 'Mountain View Chalet',
      type: 'House',
      location: 'Aspen, CO',
      price: 2800000,
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2065&auto=format&fit=crop'
    },
  ];

  useEffect(() => {
    // Simulate checking if user is logged in
    const checkLoginStatus = () => {
      // In a real app, this would check auth state
      setIsLoggedIn(true); // For demo, we'll assume logged in
      
      // Load saved properties
      if (activeTab === 'favorites') {
        setSavedProperties(mockSavedProperties);
      } else {
        setSavedProperties(mockRecentViews);
      }
    };
    
    checkLoginStatus();
  }, [activeTab]);

  const removeSavedProperty = (id: string) => {
    setSavedProperties(prev => prev.filter(property => property.id !== id));
    
    toast({
      title: "Property removed",
      description: "This property has been removed from your saved list.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-12">
        <h1 className="mb-6 text-3xl font-bold md:text-4xl">Saved Properties</h1>
        
        {isLoggedIn ? (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="favorites">
                {mockSavedProperties.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {savedProperties.map(property => (
                      <PropertyCard 
                        key={property.id} 
                        property={property} 
                        isFavorite={true} 
                        onToggleFavorite={removeSavedProperty}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="mb-2 text-xl font-semibold">No favorites yet</h3>
                    <p className="mb-6 text-muted-foreground">
                      You haven't added any properties to your favorites yet.
                    </p>
                    <Button asChild>
                      <a href="/buy">Browse Properties</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="recent">
                {mockRecentViews.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {savedProperties.map(property => (
                      <PropertyCard 
                        key={property.id} 
                        property={property}
                        isFavorite={mockSavedProperties.some(p => p.id === property.id)} 
                        onToggleFavorite={id => {
                          // If already in favorites, remove it
                          if (mockSavedProperties.some(p => p.id === id)) {
                            removeSavedProperty(id);
                          } else {
                            // Otherwise, we'd add to favorites in a real app
                            toast({
                              title: "Added to favorites",
                              description: "This property has been added to your favorites.",
                            });
                          }
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="mb-2 text-xl font-semibold">No recent views</h3>
                    <p className="mb-6 text-muted-foreground">
                      You haven't viewed any properties recently.
                    </p>
                    <Button asChild>
                      <a href="/buy">Browse Properties</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            <Separator className="my-12" />
            
            <div className="rounded-xl bg-muted p-6">
              <h2 className="mb-4 text-2xl font-semibold">Looking for something specific?</h2>
              <p className="mb-6 text-muted-foreground">
                Set up a saved search alert to be notified when new properties matching your criteria become available.
              </p>
              <Button className="bg-decor-gold hover:bg-decor-gold/90">Create Alert</Button>
            </div>
          </>
        ) : (
          <Alert>
            <AlertTitle>Please sign in to view your saved properties</AlertTitle>
            <AlertDescription>
              You need to be logged in to view your saved properties and recently viewed listings.
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Saved;
