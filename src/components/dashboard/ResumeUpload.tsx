import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface ResumeUploadProps {
  onUploadSuccess: (fileName: string) => void;
}

export const ResumeUpload = ({ onUploadSuccess }: ResumeUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const validateFile = (file: File): boolean => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast({ title: 'Invalid file type', description: 'Please upload PDF, JPG, JPEG, or PNG files only.', variant: 'destructive' });
      return false;
    }

    if (file.size > maxSize) {
      toast({ title: 'File too large', description: 'Please upload files smaller than 5MB.', variant: 'destructive' });
      return false;
    }

    return true;
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (file: File) => {
    if (!validateFile(file)) return;
    if (!user) {
      toast({ title: 'Authentication required', description: 'Please log in to upload resume.', variant: 'destructive' });
      return;
    }

    setUploading(true);
    try {
      const fileContent = await convertFileToBase64(file);
      
      // Delete existing resume for this user
      await supabase
        .from('resume_uploads')
        .delete()
        .eq('user_id', user.id);

      // Insert new resume
      const { error } = await supabase
        .from('resume_uploads')
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_type: file.type,
          file_content: fileContent,
          file_size: file.size
        });

      if (error) {
        console.error('Database error:', error);
        throw new Error('Failed to save resume to database');
      }

      onUploadSuccess(file.name);
      toast({ title: 'Success!', description: 'Resume uploaded successfully.' });
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: 'Upload failed', description: 'Failed to upload resume. Please try again.', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Upload Your Resume
        </CardTitle>
        <CardDescription className="text-gray-400">
          Upload your resume in PDF, JPG, JPEG, or PNG format (max 5MB)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-teal-500 bg-teal-500/10' : 'border-slate-600 hover:border-slate-500'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-white mb-2">Drag and drop your resume here</p>
          <p className="text-gray-400 mb-4">or</p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-teal-500 hover:bg-teal-600"
          >
            {uploading ? 'Uploading...' : 'Choose File'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
          <AlertCircle className="h-4 w-4" />
          <span>Supported formats: PDF, JPG, JPEG, PNG (max 5MB)</span>
        </div>
      </CardContent>
    </Card>
  );
};