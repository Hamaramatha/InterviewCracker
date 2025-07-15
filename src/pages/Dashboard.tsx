import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ResumeUpload } from '@/components/dashboard/ResumeUpload';
import { AssessmentCards } from '@/components/dashboard/AssessmentCards';
import { ProfileMenu } from '@/components/dashboard/ProfileMenu';
import { ViewProfile } from '@/components/dashboard/ViewProfile';
import { HelpPage } from '@/components/dashboard/HelpPage';
import { FeedbackPage } from '@/components/dashboard/FeedbackPage';
import { FileText } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type DashboardView = 'main' | 'profile' | 'help' | 'feedback';

export const Dashboard = () => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [currentView, setCurrentView] = useState<DashboardView>('main');
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  useEffect(() => {
    if (user) {
      checkExistingResume();
    }
  }, [user]);

  const checkExistingResume = async () => {
    try {
      const { data, error } = await supabase
        .from('resume_uploads')
        .select('file_name')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setResumeUploaded(true);
        setUploadedFileName(data[0].file_name);
      }
    } catch (error) {
      console.error('Error checking existing resume:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleUploadSuccess = (fileName: string) => {
    setResumeUploaded(true);
    setUploadedFileName(fileName);
  };

  const handleStartAssessment = (type: string) => {
    navigate(`/assessment/${type}`);
  };

  const handleBackToDashboard = () => {
    setCurrentView('main');
  };

  const handleMyAssessments = () => {
    navigate('/assessments');
  };

  if (currentView === 'profile') {
    return <ViewProfile onBack={handleBackToDashboard} />;
  }

  if (currentView === 'help') {
    return <HelpPage onBack={handleBackToDashboard} />;
  }

  if (currentView === 'feedback') {
    return <FeedbackPage onBack={handleBackToDashboard} />;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-xl font-bold">InterviewCracker</h1>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleMyAssessments}
              variant="outline"
              className="bg-teal-600 hover:bg-teal-700 text-white border-teal-600"
            >
              <FileText className="h-4 w-4 mr-2" />
              My Assessments
            </Button>
            
            <ProfileMenu
              onViewProfile={() => setCurrentView('profile')}
              onHelp={() => setCurrentView('help')}
              onFeedback={() => setCurrentView('feedback')}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome to Dashboard</h2>
            <p className="text-gray-400">Your AI-powered interview preparation starts here</p>
            {resumeUploaded && (
              <p className="text-teal-400 mt-2">✓ Resume uploaded: {uploadedFileName}</p>
            )}
          </div>
          
          <div className="space-y-8">
            <ResumeUpload onUploadSuccess={handleUploadSuccess} />
            <AssessmentCards 
              isResumeUploaded={resumeUploaded} 
              onStartAssessment={handleStartAssessment} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};