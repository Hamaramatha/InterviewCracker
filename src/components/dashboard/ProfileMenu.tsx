import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut, Eye, HelpCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { EditablePhotoCircle } from './EditablePhotoCircle';

interface ProfileMenuProps {
  onViewProfile: () => void;
  onHelp: () => void;
  onFeedback: () => void;
  onLogout: () => void;
}

export const ProfileMenu = ({ onViewProfile, onHelp, onFeedback, onLogout }: ProfileMenuProps) => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();

  const handlePhotoUpdate = async (photoUrl: string) => {
    try {
      await updateProfile({ photo_url: photoUrl });
    } catch (error) {
      console.error('Failed to update photo:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
          <EditablePhotoCircle
            photoUrl={profile?.photo_url}
            onPhotoUpdate={handlePhotoUpdate}
            size="sm"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700" align="end">
        <DropdownMenuItem onClick={onViewProfile} className="text-white hover:bg-slate-700">
          <Eye className="mr-2 h-4 w-4" />
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onHelp} className="text-white hover:bg-slate-700">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onFeedback} className="text-white hover:bg-slate-700">
          <MessageSquare className="mr-2 h-4 w-4" />
          Feedback
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout} className="text-white hover:bg-slate-700">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};