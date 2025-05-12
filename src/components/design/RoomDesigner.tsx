
import React, { useState, useEffect, useRef } from 'react';
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
import * as THREE from 'three';

interface RoomDesignerProps {
  onDesignChange?: (data: any) => void;
}

const RoomDesigner: React.FC<RoomDesignerProps> = ({ onDesignChange }) => {
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

  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (onDesignChange) {
      onDesignChange(designData);
    }
  }, [designData, onDesignChange]);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(400, 400);
    mountRef.current?.appendChild(renderer.domElement);

    let cube: THREE.Mesh;

    const createCube = () => {
      const geometry = new THREE.BoxGeometry(designData.dimensions.width, designData.dimensions.height, designData.dimensions.length);
      const material = new THREE.MeshBasicMaterial({ color: designData.colors.walls });
      cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
    };

    createCube();

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [designData]); // Ensure useEffect runs when designData changes

  const handleDimensionChange = (dimension: 'width' | 'length' | 'height', value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setDesignData(prev => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [dimension]: numericValue
        }
      }));
    }
  };

  const handleColorChange = (colorType: 'walls' | 'floor' | 'ceiling', value: string) => {
    setDesignData(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: value
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-secondary/20 rounded-lg p-6">
          {}
          <div ref={mountRef} className="bg-secondary rounded-lg flex items-center justify-center" style={{ width: '400px', height: '400px' }}>
            <p className="text-muted-foreground"></p>
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
                  onChange={(e) => handleColorChange('walls', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="floor-color" className="text-sm">Floor</Label>
                <Input
                  id="floor-color"
                  type="color"
                  value={designData.colors.floor}
                  onChange={(e) => handleColorChange('floor', e.target.value)}
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
                  onChange={(e) => handleDimensionChange('width', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="length" className="text-sm">Length</Label>
                <Input
                  id="length"
                  type="number"
                  value={designData.dimensions.length || ''}
                  onChange={(e) => handleDimensionChange('length', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="height" className="text-sm">Height</Label>
                <Input
                  id="height"
                  type="number"
                  value={designData.dimensions.height || ''}
                  onChange={(e) => handleDimensionChange('height', e.target.value)}
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

const handleSaveDesign = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!name) {
    toast({
      title: 'Error',
      description: 'Please enter a name for your design',
      variant: 'destructive',
    });
    return;
  }

  const user = (await supabase.auth.getUser()).data.user;
  if (!user) {
    toast({
      title: 'Error',
      description: 'You must be logged in to save designs',
      variant: 'destructive',
    });
    return;
  }

  try {
    const { error } = await supabase
      .from('room_designs')
      .insert([{
        name,
        room_type: roomType,
        design_data: designData,
        user_id: user.id,
      }]);
    
    if (error) throw error;
    
    toast({
      title: 'Success',
      description: 'Design saved successfully!',
    });
  } catch (error: any) {
    toast({
      title: 'Error',
      description: error.message || 'Failed to save design',
      variant: 'destructive',
    });
  }
};

const handleColorChange = (colorType: 'walls' | 'floor' | 'ceiling', value: string) => {
  setDesignData(prev => ({
    ...prev,
    colors: {
      ...prev.colors,
      [colorType]: value
    }
  }));
};

export default RoomDesigner;
