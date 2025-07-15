import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Upload, User, LogOut, Settings } from 'lucide-react';

export const ResumeUpload = () => {
  const [user, setUser] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    
    // Get user details from users table
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    setUser(userData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    if (selectedFile.type !== 'application/pdf') {
      toast({ title: 'Error', description: 'Please upload a PDF file only', variant: 'destructive' });
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({ title: 'Error', description: 'File size must be less than 5MB', variant: 'destructive' });
      return;
    }
    
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    
    setUploading(true);
    try {
      // Simulate resume processing and skill extraction
      const mockSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'];
      
      // Insert extracted skills into resume_analysis table
      const skillInserts = mockSkills.map(skill => ({
        user_id: user.id,
        skill,
        extracted_from: 'resume',
        created_at: new Date().toISOString()
      }));
      
      const { error } = await supabase
        .from('resume_analysis')
        .insert(skillInserts);
      
      if (error) throw error;
      
      setResumeUploaded(true);
      toast({ title: 'Success', description: 'Resume uploaded and analyzed successfully!' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const handleCategorySelect = (category: string) => {
    navigate(`/assessment/${category}`);
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">Interview Cracker</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Chat with Us</span>
              <span className="text-sm text-gray-600">Contact Us</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome, {user.full_name} 👋</h2>
          
          {/* Profile Section */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Resume Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Upload Resume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="resume">Upload PDF (Max 5MB)</Label>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  disabled={resumeUploaded}
                />
              </div>
              
              {file && !resumeUploaded && (
                <Button onClick={handleUpload} disabled={uploading}>
                  {uploading ? 'Processing...' : 'Upload & Analyze'}
                </Button>
              )}
              
              {resumeUploaded && (
                <div className="text-green-600 font-medium">
                  ✅ Resume uploaded and analyzed successfully!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Assessment Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-20"
                disabled={!resumeUploaded}
                onClick={() => handleCategorySelect('technical')}
              >
                Technical
              </Button>
              <Button
                variant="outline"
                className="h-20"
                disabled={!resumeUploaded}
                onClick={() => handleCategorySelect('managerial')}
              >
                Managerial
              </Button>
              <Button
                variant="outline"
                className="h-20"
                disabled={!resumeUploaded}
                onClick={() => handleCategorySelect('behavioral')}
              >
                Behavioral
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};