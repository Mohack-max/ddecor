
import React, { useState } from 'react';
import RoomDesigner from '@/components/design/RoomDesigner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Design = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState('living-room');
  const [designData, setDesignData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
 
  const handleSaveDesign = async () => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'You must be signed in to save room designs.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!roomName) {
      toast({
        title: 'Room name required',
        description: 'Please enter a name for your design.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('room_designs')
        .insert([
          {
            user_id: user.id,
            name: roomName,
            room_type: roomType,
            design_data: designData
          }
        ]);
        
      if (error) throw error;
      
      toast({
        title: 'Design saved',
        description: 'Your room design has been saved successfully.',
      });
      
      setDialogOpen(false);
    } catch (error: any) {
      console.error('Error saving room design:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save room design.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDesignChange = (data: any) => {
    setDesignData(data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Design Your Room</h1>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-decor-gold hover:bg-decor-gold/90">
                <Save className="mr-2 h-4 w-4" />
                Save Design
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Your Room Design</DialogTitle>
                <DialogDescription>
                  Give your design a name and select the room type to save it to your account.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="room-name">Room Name</Label>
                  <Input
                    id="room-name"
                    placeholder="My Living Room"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="room-type">Room Type</Label>
                  <Select value={roomType} onValueChange={setRoomType}>
                    <SelectTrigger id="room-type">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="living-room">Living Room</SelectItem>
                      <SelectItem value="bedroom">Bedroom</SelectItem>
                      <SelectItem value="kitchen">Kitchen</SelectItem>
                      <SelectItem value="bathroom">Bathroom</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="outdoor">Outdoor Space</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-decor-gold hover:bg-decor-gold/90"
                  onClick={handleSaveDesign}
                  disabled={isSaving || !roomName}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : 'Save Design'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Pass the design change handler to RoomDesigner */}
        <RoomDesigner onDesignChange={handleDesignChange} />
      </div>
      
      <Footer />
    </div>
  );
};

export default Design;
