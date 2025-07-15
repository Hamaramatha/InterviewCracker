import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, Clock, CheckCircle, Trophy, Play, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { AssessmentDetail } from '@/components/dashboard/AssessmentDetail';

interface Assessment {
  id: string;
  type: string;
  score: number;
  duration_minutes: number;
  created_at: string;
  completed_at: string;
  questions: any[];
  answers: string[];
  attempted_questions?: number;
  total_questions?: number;
}

export const Assessments = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

  useEffect(() => {
    fetchAssessments();
  }, [user]);

  const fetchAssessments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssessments(data || []);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const filterAssessmentsByType = (type: string) => {
    return assessments.filter(assessment => assessment.type === type);
  };

  const AssessmentCard = ({ assessment }: { assessment: Assessment }) => (
    <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span className="capitalize">{assessment.type} Assessment</span>
          <Badge className={getScoreBadge(assessment.score)}>
            {assessment.score}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-400">
            <Trophy className="h-4 w-4 mr-2" />
            <span className={getScoreColor(assessment.score)}>Score: {assessment.score}%</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Clock className="h-4 w-4 mr-2" />
            Duration: {assessment.duration_minutes}m
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            Completed: {new Date(assessment.completed_at).toLocaleDateString()}
          </div>
          <div className="flex items-center text-gray-400">
            <CheckCircle className="h-4 w-4 mr-2" />
            Questions: {assessment.attempted_questions || 0}/{assessment.total_questions || assessment.questions?.length || 0}
          </div>
        </div>
        
        <div className="pt-2">
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${assessment.score >= 80 ? 'bg-green-500' : assessment.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${assessment.score}%` }}
            ></div>
          </div>
        </div>
        
        <Button
          onClick={() => setSelectedAssessment(assessment)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ type }: { type: string }) => (
    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="p-8 text-center">
        <p className="text-gray-400 mb-4">
          {type === 'all' ? 'No assessments completed yet' : `No ${type} assessment started`}
        </p>
        <Button 
          onClick={() => navigate('/dashboard')}
          className="bg-teal-600 hover:bg-teal-700"
        >
          <Play className="h-4 w-4 mr-2" />
          Start Assessment
        </Button>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading assessments...</div>
      </div>
    );
  }

  if (selectedAssessment) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <AssessmentDetail 
            assessment={selectedAssessment} 
            onBack={() => setSelectedAssessment(null)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            onClick={() => navigate('/dashboard')} 
            variant="ghost" 
            className="text-white hover:bg-slate-800 mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-white">My Assessments</h1>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
            <TabsTrigger value="all" className="text-white">All ({assessments.length})</TabsTrigger>
            <TabsTrigger value="technical" className="text-white">
              Technical ({filterAssessmentsByType('technical').length})
            </TabsTrigger>
            <TabsTrigger value="behavioral" className="text-white">
              Behavioral ({filterAssessmentsByType('behavioral').length})
            </TabsTrigger>
            <TabsTrigger value="managerial" className="text-white">
              Managerial ({filterAssessmentsByType('managerial').length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {assessments.length === 0 ? (
              <EmptyState type="all" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assessments.map((assessment) => (
                  <AssessmentCard key={assessment.id} assessment={assessment} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="technical" className="mt-6">
            {filterAssessmentsByType('technical').length === 0 ? (
              <EmptyState type="technical" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterAssessmentsByType('technical').map((assessment) => (
                  <AssessmentCard key={assessment.id} assessment={assessment} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="behavioral" className="mt-6">
            {filterAssessmentsByType('behavioral').length === 0 ? (
              <EmptyState type="behavioral" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterAssessmentsByType('behavioral').map((assessment) => (
                  <AssessmentCard key={assessment.id} assessment={assessment} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="managerial" className="mt-6">
            {filterAssessmentsByType('managerial').length === 0 ? (
              <EmptyState type="managerial" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterAssessmentsByType('managerial').map((assessment) => (
                  <AssessmentCard key={assessment.id} assessment={assessment} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};