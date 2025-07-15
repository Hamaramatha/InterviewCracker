import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileCard } from './ProfileCard';
import { EditablePhotoCircle } from './EditablePhotoCircle';
import { ProfileDetails } from './ProfileDetails';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

interface ViewProfileProps {
  onBack: () => void;
}

export const ViewProfile = ({ onBack }: ViewProfileProps) => {
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  const { toast } = useToast();

  const handleFieldUpdate = async (field: string, value: string) => {
    try {
      await updateProfile({ [field]: value });
      toast({
        title: 'Profile Updated',
        description: `${field.charAt(0).toUpperCase() + field.slice(1)} has been updated successfully.`
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handlePhotoUpdate = async (photoUrl: string) => {
    await handleFieldUpdate('photo_url', photoUrl);
  };

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            onClick={onBack} 
            variant="ghost" 
            className="text-white hover:bg-slate-800 mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
        </div>

        {/* Photo and Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1 flex flex-col items-center">
            <div className="mb-4">
              <EditablePhotoCircle
                photoUrl={profile?.photo_url}
                onPhotoUpdate={handlePhotoUpdate}
                size="lg"
              />
            </div>
            <p className="text-sm text-gray-400 text-center">
              Click to edit photo<br />
              Max 5MB • JPEG, PNG, GIF, WebP
            </p>
          </div>
          
          <div className="lg:col-span-2">
            <ProfileDetails
              name={profile?.username}
              email={user?.email}
              phone={profile?.phone}
              gender={profile?.gender}
              dob={profile?.date_of_birth}
            />
          </div>
        </div>

        {/* Editable Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileCard
            title="Username"
            value={profile?.username || ''}
            onSave={(value) => handleFieldUpdate('username', value)}
            type="text"
          />
          
          <ProfileCard
            title="Email"
            value={user?.email || ''}
            onSave={(value) => handleFieldUpdate('email', value)}
            type="email"
          />
          
          <ProfileCard
            title="Phone Number"
            value={profile?.phone || ''}
            onSave={(value) => handleFieldUpdate('phone', value)}
            type="tel"
          />
          
          <ProfileCard
            title="Date of Birth"
            value={profile?.date_of_birth || ''}
            onSave={(value) => handleFieldUpdate('date_of_birth', value)}
            type="date"
          />
          
          <ProfileCard
            title="Gender"
            value={profile?.gender || ''}
            onSave={(value) => handleFieldUpdate('gender', value)}
            type="select"
            options={genderOptions}
          />
        </div>
      </div>
    </div>
  );
};