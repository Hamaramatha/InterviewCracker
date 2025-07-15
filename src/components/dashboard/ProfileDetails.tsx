import { Mail, Phone, User, Calendar, UserCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ProfileDetailsProps {
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  dob?: string;
}

export const ProfileDetails = ({ 
  name, 
  email, 
  phone, 
  gender, 
  dob 
}: ProfileDetailsProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  const details = [
    {
      icon: <UserCircle className="h-4 w-4" />,
      label: 'Name',
      value: name || 'Not set'
    },
    {
      icon: <Mail className="h-4 w-4" />,
      label: 'Email',
      value: email || 'Not set'
    },
    {
      icon: <Phone className="h-4 w-4" />,
      label: 'Phone',
      value: phone || 'Not set'
    },
    {
      icon: <User className="h-4 w-4" />,
      label: 'Gender',
      value: gender || 'Not set'
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      label: 'Date of Birth',
      value: formatDate(dob)
    }
  ];

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="p-4">
        <div className="space-y-3">
          {details.map((detail, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="text-teal-400">
                {detail.icon}
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-400 uppercase tracking-wide">
                  {detail.label}
                </div>
                <div className="text-white font-medium">
                  {detail.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};