import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Upload, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PhotoUploadProps {
  currentPhoto?: string;
  onPhotoUpdate: (photoUrl: string) => void;
}

export const PhotoUpload = ({ currentPhoto, onPhotoUpdate }: PhotoUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState(currentPhoto);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please select an image smaller than 5MB',
        variant: 'destructive'
      });
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please select a JPEG, PNG, GIF, or WebP image',
        variant: 'destructive'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      onPhotoUpdate(result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    setPreviewUrl('');
    onPhotoUpdate('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Camera className="h-5 w-5 mr-2" />
          Profile Photo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={previewUrl} alt="Profile" />
            <AvatarFallback className="bg-slate-700 text-white text-xl">
              <Camera className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button
              onClick={handleUploadClick}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              {previewUrl ? 'Change Photo' : 'Upload Photo'}
            </Button>
            {previewUrl && (
              <Button
                variant="outline"
                onClick={handleRemovePhoto}
                className="ml-2"
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-400">
          Max file size: 5MB. Supported formats: JPEG, PNG, GIF, WebP
        </p>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
};