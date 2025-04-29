
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
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
    // Redirect to home if not logged in
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-12">
        <div className="mx-auto max-w-4xl">
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
              <CardContent className="flex flex-col items-center gap-4">
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
              </CardContent>
            </Card>
            
            {/* Activity Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Email</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Full Name</span>
                    <span>{profile?.full_name || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Phone</span>
                    <span>{profile?.phone || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Joined</span>
                    <span>{new Date(user.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add more cards for saved properties, room designs, etc. */}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
