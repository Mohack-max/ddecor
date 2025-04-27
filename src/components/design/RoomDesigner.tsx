
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RoomDesigner = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [roomType, setRoomType] = useState('living');
  const [designData, setDesignData] = useState({
    furniture: [],
    colors: {
      walls: '#ffffff',
      floor: '#f0f0f0',
      ceiling: '#ffffff',
    },
    dimensions: {
      width: 0,
      length: 0,
      height: 0,
    },
  });

  const handleSaveDesign = async () => {
    if (!name) {
      toast({
        title: 'Error',
        description: 'Please enter a name for your design',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase
      .from('room_designs')
      .insert([{
        name,
        room_type: roomType,
        design_data: designData,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      }]);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to save design. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Design saved successfully!',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-secondary/20 rounded-lg p-6">
          {/* This is where the 3D room preview would go */}
          <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Room Preview</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="design-name">Design Name</Label>
            <Input
              id="design-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Room Design"
            />
          </div>

          <div className="space-y-2">
            <Label>Room Type</Label>
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="living">Living Room</SelectItem>
                <SelectItem value="bedroom">Bedroom</SelectItem>
                <SelectItem value="kitchen">Kitchen</SelectItem>
                <SelectItem value="bathroom">Bathroom</SelectItem>
                <SelectItem value="office">Home Office</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Room Colors</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="wall-color" className="text-sm">Walls</Label>
                <Input
                  id="wall-color"
                  type="color"
                  value={designData.colors.walls}
                  onChange={(e) => setDesignData({
                    ...designData,
                    colors: { ...designData.colors, walls: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="floor-color" className="text-sm">Floor</Label>
                <Input
                  id="floor-color"
                  type="color"
                  value={designData.colors.floor}
                  onChange={(e) => setDesignData({
                    ...designData,
                    colors: { ...designData.colors, floor: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Room Dimensions (ft)</Label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="width" className="text-sm">Width</Label>
                <Input
                  id="width"
                  type="number"
                  value={designData.dimensions.width || ''}
                  onChange={(e) => setDesignData({
                    ...designData,
                    dimensions: { ...designData.dimensions, width: Number(e.target.value) }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="length" className="text-sm">Length</Label>
                <Input
                  id="length"
                  type="number"
                  value={designData.dimensions.length || ''}
                  onChange={(e) => setDesignData({
                    ...designData,
                    dimensions: { ...designData.dimensions, length: Number(e.target.value) }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="height" className="text-sm">Height</Label>
                <Input
                  id="height"
                  type="number"
                  value={designData.dimensions.height || ''}
                  onChange={(e) => setDesignData({
                    ...designData,
                    dimensions: { ...designData.dimensions, height: Number(e.target.value) }
                  })}
                />
              </div>
            </div>
          </div>

          <Button className="w-full" onClick={handleSaveDesign}>
            Save Design
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomDesigner;
