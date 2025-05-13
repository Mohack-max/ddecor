
import React, { useState, useEffect } from 'react';
import { Upload, X, File, FileImage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export const DocumentUpload = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<{ name: string; url: string; type: string }[]>([]);
  const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number

  useEffect(() => {
    const fetchUploadedFiles = async () => {
      if (!user) return;
      try {
        const { data: docData, error: docError } = await supabase
          .storage
          .from('property-documents')
          .list(`${user.id}/`);
        if (docError) throw docError;
        const docFiles = docData?.map(file => ({
          name: file.name,
          url: supabase.storage.from('property-documents').getPublicUrl(`${user.id}/${file.name}`).data.publicUrl,
          type: 'document'
        })) || [];
        setFiles(docFiles);
      } catch (error) {
        console.error('Error fetching uploaded files:', error);
      }
    };
    fetchUploadedFiles();
  }, [user]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'You must be signed in to upload files.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    try {
      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('property-documents')
        .upload(filePath, file);
    
      if (uploadError) {
        throw uploadError;
      }
    
      const { data } = supabase.storage
        .from('property-documents')
        .getPublicUrl(filePath);
    
      setFiles([...files, { 
        name: file.name, 
        url: data.publicUrl,
        type: 'document'
      }]);
      
      // Update the property listing with the phone number
      const { error: updateError } = await supabase
        .from('property_listings')
        .update({ phoneNumber })
        .eq('user_id', user.id);
      
      if (updateError) {
        throw updateError;
      }

      toast({
        title: 'Success',
        description: 'File uploaded successfully!',
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Error uploading file.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Documents & Images</h3>
        <Button
          variant="outline"
          size="sm"
          disabled={uploading || !user}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </>
          )}
        </Button>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileUpload}
        />
      </div>

      {/* New input field for phone number */}
      <div className="space-y-2">
        <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
          Contact Phone Number
        </label>
        <input
          id="phone-number"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {files.length > 0 ? (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-secondary rounded-md"
            >
              <div className="flex items-center gap-2">
                {file.type === 'image' ? (
                  <FileImage className="h-4 w-4 text-blue-500" />
                ) : (
                  <File className="h-4 w-4 text-orange-500" />
                )}
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {file.name}
                </a>
              </div>
              <Button
                variant="ghost"
                size="sm"
                disabled={uploading}
                onClick={() => removeFile(index, file.url)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-6 border border-dashed rounded-md">
          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Drag and drop files here or click the upload button
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Supported formats: JPG, PNG, PDF, DOC
          </p>
        </div>
      )}
    </div>
  );
};
