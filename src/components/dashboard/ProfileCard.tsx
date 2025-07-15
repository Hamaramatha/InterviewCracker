import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit2, Save, X } from 'lucide-react';
import { useState } from 'react';

interface ProfileCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  onSave: (value: string) => void;
  type?: 'text' | 'email' | 'date' | 'tel' | 'select';
  options?: string[];
}

export const ProfileCard = ({ title, value, icon, onSave, type = 'text', options }: ProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center justify-between text-sm">
          <div className="flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
          </div>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-white"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-3">
            {type === 'select' ? (
              <Select value={editValue} onValueChange={setEditValue}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={type}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            )}
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-white">{value || 'Not set'}</p>
        )}
      </CardContent>
    </Card>
  );
};