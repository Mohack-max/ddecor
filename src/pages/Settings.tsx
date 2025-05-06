
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const { user, profile, loading, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('usd');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    updates: true
  });
  const [darkMode, setDarkMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Load profile data
  useEffect(() => {
    if (profile) {
      setName(profile.full_name || '');
      setEmail(user?.email || '');
      setPhone(profile.phone || '');
    }
  }, [profile, user]);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      toast({
        title: "Authentication required",
        description: "Please sign in to access settings.",
        variant: "destructive"
      });
    }
  }, [user, loading, navigate, toast]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to update your profile.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: name,
          phone: phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update email if changed
      if (email !== user.email) {
        const { error: updateError } = await supabase.auth.updateUser({ email });
        if (updateError) throw updateError;
      }
      
      await refreshProfile();
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would save these preferences to the database
    // For now, we'll just show a toast message
    toast({
      title: "Preferences saved",
      description: "Your preferences have been updated successfully."
    });
  };
  
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Your new password and confirmation password do not match.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully."
      });
      
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast({
        title: "Error updating password",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    // This would typically involve a confirmation dialog first
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    
    if (!confirmDelete) return;
    
    setIsSaving(true);
    
    try {
      // This will trigger cascade deletion of profiles due to our setup
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      
      if (error) throw error;
      
      // Sign out the user
      await supabase.auth.signOut();
      
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully."
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error deleting account",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold md:text-4xl">Settings</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>
            
            {/* Account Settings */}
            <TabsContent value="account">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-2xl font-semibold">Account Information</h2>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">Password</h3>
                    <Button variant="outline" className="w-full sm:w-auto" onClick={() => setActiveTab('privacy')}>
                      Change Password
                    </Button>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-decor-gold hover:bg-decor-gold/90"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            {/* Preferences Settings */}
            <TabsContent value="preferences">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-2xl font-semibold">Preferences</h2>
                <form onSubmit={handleSavePreferences} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select Currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="inr">INR (₹)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                          <SelectItem value="jpy">JPY (¥)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="dark-mode"
                        checked={darkMode}
                        onCheckedChange={setDarkMode}
                      />
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">Notification Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <Switch
                          id="email-notifications"
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <Switch
                          id="push-notifications"
                          checked={notifications.push}
                          onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="marketing-notifications">Marketing Communications</Label>
                        <Switch
                          id="marketing-notifications"
                          checked={notifications.marketing}
                          onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="update-notifications">Product Updates</Label>
                        <Switch
                          id="update-notifications"
                          checked={notifications.updates}
                          onCheckedChange={(checked) => setNotifications({...notifications, updates: checked})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-decor-gold hover:bg-decor-gold/90"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : 'Save Preferences'}
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            {/* Privacy Settings */}
            <TabsContent value="privacy">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h2 className="mb-4 text-2xl font-semibold">Privacy & Security</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-xl font-semibold">Change Password</h3>
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input 
                          id="current-password" 
                          type="password" 
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <Button 
                        type="submit"
                        className="bg-decor-gold hover:bg-decor-gold/90"
                        disabled={isSaving || !newPassword || newPassword !== confirmPassword}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : 'Update Password'}
                      </Button>
                    </form>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="mb-3 text-xl font-semibold">Security Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                        <Switch id="two-factor" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account by requiring a verification code.
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="mb-3 text-xl font-semibold">Privacy Controls</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="profile-visibility">Profile Visibility</Label>
                        <Select defaultValue="public">
                          <SelectTrigger id="profile-visibility" className="w-[150px]">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="contacts">Contacts Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="search-visibility">Show in Search Results</Label>
                        <Switch id="search-visibility" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="mb-3 text-xl font-semibold">Data & Privacy</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full sm:w-auto">
                        Download Your Data
                      </Button>
                      <Button variant="outline" className="w-full sm:w-auto">
                        Privacy Policy
                      </Button>
                      <Button variant="outline" className="w-full sm:w-auto">
                        Terms of Service
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="mb-3 text-xl font-medium text-destructive">Danger Zone</h3>
                    <Button 
                      variant="destructive"
                      onClick={handleDeleteAccount}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : 'Delete Account'}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Settings;
