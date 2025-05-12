
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Home, Calendar, Mail, Phone } from 'lucide-react';
import PropertyCard, { Property } from '@/components/PropertyCard';
import { Separator } from '@/components/ui/separator';

const Profile = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [listedProperties, setListedProperties] = useState<Property[]>([]);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user properties and saved properties
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        // Fetch properties listed by the user
        const { data: userListings, error: listingsError } = await supabase
          .from('property_listings')
          .select('*')
          .eq('user_id', user.id);
          
        if (listingsError) throw listingsError;
        
        // Transform to Property type
        const mappedListings = userListings.map(listing => ({
          id: listing.id,
          title: listing.title,
          type: listing.property_type,
          location: listing.location,
          price: listing.price,
          bedrooms: listing.bedrooms,
          bathrooms: listing.bathrooms,
          area: listing.area,
          imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop'
        }));
        
        setListedProperties(mappedListings);
        
        // Fetch saved properties
        const { data: savedProps, error: savedError } = await supabase
          .from('saved_properties')
          .select(`
            property_id,
            property_listings (*)
          `)
          .eq('user_id', user.id);
          
        if (savedError) throw savedError;
        
        if (savedProps && savedProps.length > 0) {
          // Transform to Property type
          const mappedSaved = savedProps.map((saved: any) => ({
            id: saved.property_listings.id,
            title: saved.property_listings.title,
            type: saved.property_listings.property_type,
            location: saved.property_listings.location,
            price: saved.property_listings.price,
            bedrooms: saved.property_listings.bedrooms,
            bathrooms: saved.property_listings.bathrooms,
            area: saved.property_listings.area,
            imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
          }));
          
          setSavedProperties(mappedSaved);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading || isLoading) {
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

  if (!user) {
    return null;
  }

  const handleRemoveSavedProperty = async (propertyId: string) => {
    try {
      const { error } = await supabase
        .from('saved_properties')
        .delete()
        .eq('user_id', user.id)
        .eq('property_id', propertyId);
        
      if (error) throw error;
      
      // Update the local state
      setSavedProperties(prevSaved => prevSaved.filter(property => property.id !== propertyId));
    } catch (error) {
      console.error('Error removing saved property:', error);
    }
  };

  const handleViewProperty = (propertyId: string) => {
    navigate(`/property/${propertyId}`); // Ensure this path matches your route definition
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-3xl font-bold md:text-4xl">My Profile</h1>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Profile Card */}
            <Card className="md:col-span-1 bg-card">
              <CardHeader className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src={profile?.avatar_url || '/placeholder.svg'} alt={profile?.full_name || 'User'} />
                  <AvatarFallback className="bg-decor-gold text-white text-2xl">
                    {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{profile?.full_name || 'User'}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                {profile?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span>Member</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
                
                <div className="pt-4 flex flex-col gap-4">
                  <Button 
                    onClick={() => navigate('/settings')} 
                    variant="outline" 
                    className="w-full"
                  >
                    Edit Profile
                  </Button>
                  <Button 
                    onClick={() => signOut()} 
                    variant="destructive" 
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Activity Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>My Properties</CardTitle>
              </CardHeader>
              <CardContent>
                {listedProperties.length > 0 ? (
                  <div className="space-y-4">
                    {listedProperties.map((property) => (
                      <div key={property.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <h3 className="font-medium">{property.title}</h3>
                          <p className="text-sm text-muted-foreground">{property.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(property.price)}</p>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigate(`/property/${property.id}`)}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4">
                      <Button 
                        className="w-full bg-decor-gold hover:bg-decor-gold/90"
                        onClick={() => navigate('/sell')}
                      >
                        List New Property
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <h3 className="text-xl font-semibold mb-2">No Properties Listed</h3>
                    <p className="text-muted-foreground mb-6">You haven't listed any properties for sale yet.</p>
                    <Button 
                      className="bg-decor-gold hover:bg-decor-gold/90"
                      onClick={() => navigate('/sell')}
                    >
                      List Your First Property
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Saved Properties</CardTitle>
              </CardHeader>
              <CardContent>
                {savedProperties.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {savedProperties.map((property) => (
                      <PropertyCard 
                        key={property.id} 
                        property={property}
                        isFavorite={true}
                        onToggleFavorite={() => handleRemoveSavedProperty(property.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <h3 className="text-xl font-semibold mb-2">No Saved Properties</h3>
                    <p className="text-muted-foreground mb-6">You haven't saved any properties yet.</p>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/buy')}
                    >
                      Browse Properties
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
