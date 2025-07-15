import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Camera, User } from 'lucide-react';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface EditablePhotoCircleProps {
  photoUrl?: string;
  onPhotoUpdate: (photoUrl: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const EditablePhotoCircle = ({ 
  photoUrl, 
  onPhotoUpdate, 
  size = 'lg' 
}: EditablePhotoCircleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24'
  };

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
      onPhotoUpdate(result);
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      <div
        className={`relative cursor-pointer ${sizeClasses[size]} rounded-full overflow-hidden`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handlePhotoClick}
      >
        <Avatar className={`${sizeClasses[size]} transition-all duration-200`}>
          <AvatarImage src={photoUrl} alt="Profile" />
          <AvatarFallback className="bg-slate-700 text-white">
            <User className={size === 'lg' ? 'h-8 w-8' : size === 'md' ? 'h-6 w-6' : 'h-4 w-4'} />
          </AvatarFallback>
        </Avatar>
        
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
            <Edit className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};