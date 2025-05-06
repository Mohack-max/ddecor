
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard, { Property } from '@/components/PropertyCard';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const Saved = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('favorites');
  const [isLoading, setIsLoading] = useState(true);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [recentViews, setRecentViews] = useState<Property[]>([]);

  // Load saved properties from Supabase
  useEffect(() => {
    const fetchSavedProperties = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        if (activeTab === 'favorites') {
          // Fetch saved properties
          const { data, error } = await supabase
            .from('saved_properties')
            .select(`
              property_id,
              property_listings (*)
            `)
            .eq('user_id', user.id);
            
          if (error) throw error;
          
          if (data && data.length > 0) {
            // Transform to Property type
            const mappedProperties = data.map((item: any) => ({
              id: item.property_listings.id,
              title: item.property_listings.title,
              type: item.property_listings.property_type,
              location: item.property_listings.location,
              price: item.property_listings.price,
              bedrooms: item.property_listings.bedrooms,
              bathrooms: item.property_listings.bathrooms,
              area: item.property_listings.area,
              imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop'
            }));
            
            setSavedProperties(mappedProperties);
          } else {
            setSavedProperties([]);
          }
        } else {
          // In a real app, you'd fetch recently viewed properties from a database table
          // For demo purposes, we'll use mockRecentViews
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
          
          setRecentViews(mockRecentViews);
        }
      } catch (error) {
        console.error('Error fetching saved properties:', error);
        toast({
          title: 'Error',
          description: 'Failed to load saved properties.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSavedProperties();
  }, [activeTab, user, toast]);

  const removeSavedProperty = async (id: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('saved_properties')
        .delete()
        .eq('user_id', user.id)
        .eq('property_id', id);
        
      if (error) throw error;
      
      // Update local state
      setSavedProperties(prev => prev.filter(property => property.id !== id));
      
      toast({
        title: "Property removed",
        description: "This property has been removed from your saved list.",
      });
    } catch (error) {
      console.error('Error removing saved property:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove property from saved list.',
        variant: 'destructive',
      });
    }
  };

  const addToFavorites = async (id: string) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'You must be signed in to save properties.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('saved_properties')
        .insert([
          { user_id: user.id, property_id: id }
        ]);
        
      if (error) throw error;
      
      toast({
        title: "Added to favorites",
        description: "This property has been added to your favorites.",
      });
      
      // Refresh the favorites list
      if (activeTab === 'favorites') {
        setActiveTab('recent');
        setTimeout(() => setActiveTab('favorites'), 10);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast({
        title: 'Error',
        description: 'Failed to add property to favorites.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-12">
        <h1 className="mb-6 text-3xl font-bold md:text-4xl">Saved Properties</h1>
        
        {user ? (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="favorites">
                {savedProperties.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {savedProperties.map(property => (
                      <PropertyCard 
                        key={property.id} 
                        property={{
                          ...property,
                          price: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(property.price)
                        }} 
                        isFavorite={true} 
                        onToggleFavorite={() => removeSavedProperty(property.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="mb-2 text-xl font-semibold">No favorites yet</h3>
                    <p className="mb-6 text-muted-foreground">
                      You haven't added any properties to your favorites yet.
                    </p>
                    <Button 
                      className="bg-decor-gold hover:bg-decor-gold/90"
                      asChild
                    >
                      <a href="/buy">Browse Properties</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="recent">
                {recentViews.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {recentViews.map(property => {
                      const isFavorite = savedProperties.some(p => p.id === property.id);
                      return (
                        <PropertyCard 
                          key={property.id} 
                          property={property}
                          isFavorite={isFavorite} 
                          onToggleFavorite={() => {
                            if (isFavorite) {
                              removeSavedProperty(property.id);
                            } else {
                              addToFavorites(property.id);
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="mb-2 text-xl font-semibold">No recent views</h3>
                    <p className="mb-6 text-muted-foreground">
                      You haven't viewed any properties recently.
                    </p>
                    <Button 
                      className="bg-decor-gold hover:bg-decor-gold/90"
                      asChild
                    >
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
              <div className="mt-4">
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-decor-gold hover:bg-decor-gold/90"
                >
                  Sign In
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Saved;
