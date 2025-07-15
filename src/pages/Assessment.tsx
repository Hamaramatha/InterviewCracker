import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InterviewSession } from '@/components/interview/InterviewSession';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const Assessment = () => {
  const { category } = useParams<{ category: string }>();
  const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showInterview, setShowInterview] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchResumeData();
  }, [user]);

  const fetchResumeData = async () => {
    try {
      const { data, error } = await supabase
        .from('resume_uploads')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (!data || data.length === 0) {
        setResumeData(null);
      } else {
        setResumeData(data[0]);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to load resume data.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartInterview = () => {
    if (!resumeData) {
      toast({
        title: 'Resume Required',
        description: 'Please upload a resume before starting the assessment.',
        variant: 'destructive'
      });
      navigate('/dashboard');
      return;
    }
    setShowInterview(true);
  };

  const handleInterviewComplete = (score: number) => {
    toast({
      title: 'Assessment Complete!',
      description: `You scored ${score}% on your ${category} assessment.`
    });
    navigate('/assessments');
  };

  const handleBack = () => {
    if (showInterview) {
      setShowInterview(false);
    } else {
      navigate('/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading assessment...</div>
      </div>
    );
  }

  if (showInterview && resumeData) {
    return (
      <InterviewSession
        interviewType={category || 'technical'}
        resumeText={resumeData.file_content}
        onBack={handleBack}
        onComplete={handleInterviewComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button onClick={handleBack} variant="ghost" className="text-white hover:bg-slate-800 mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-white capitalize">{category} Assessment</h1>
        </div>

        {!resumeData ? (
          <Card className="bg-slate-800 border-slate-700 p-8">
            <div className="text-center">
              <AlertTriangle className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-4">
                Resume Required
              </h2>
              <p className="text-gray-300 mb-6">
                You need to upload a resume before starting the assessment.
                Please go back to the dashboard and upload your resume first.
              </p>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg"
              >
                Go to Dashboard
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="bg-slate-800 border-slate-700 p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Ready to start your {category} interview?
              </h2>
              <p className="text-gray-300 mb-6">
                This assessment will include 10 questions tailored to your resume and experience.
                Each question will have speech recognition for answers and text-to-speech for questions.
              </p>
              <div className="bg-slate-700 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium text-white mb-2">Assessment Features:</h3>
                <ul className="text-gray-300 text-left space-y-1">
                  <li>• AI-generated questions based on your resume</li>
                  <li>• Voice recognition for answering questions</li>
                  <li>• Text-to-speech for questions and answers</li>
                  <li>• Sample answers and validation feedback</li>
                  <li>• Automatic scoring and progress tracking</li>
                </ul>
              </div>
              <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
                <p className="text-green-400 text-sm">
                  ✓ Resume uploaded: {resumeData.file_name}
                </p>
              </div>
              <Button 
                onClick={handleStartInterview}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                Start {category} Interview
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};