import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AssessmentDetailProps {
  assessment: any;
  onBack: () => void;
}

export const AssessmentDetail = ({ assessment, onBack }: AssessmentDetailProps) => {
  const [sampleAnswers, setSampleAnswers] = useState<{[key: number]: string}>({});
  const [loadingAnswers, setLoadingAnswers] = useState<{[key: number]: boolean}>({});
  const { toast } = useToast();

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

  const generateSampleAnswer = async (questionIndex: number, question: any) => {
    if (sampleAnswers[questionIndex]) return;
    
    setLoadingAnswers(prev => ({ ...prev, [questionIndex]: true }));
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-sample-answer', {
        body: { 
          question: question.question, 
          category: question.category 
        }
      });

      if (error) throw error;
      
      setSampleAnswers(prev => ({ ...prev, [questionIndex]: data.sampleAnswer }));
    } catch (error) {
      console.error('Error generating sample answer:', error);
      toast({ 
        title: 'Error', 
        description: 'Failed to generate sample answer. Please try again.', 
        variant: 'destructive' 
      });
    } finally {
      setLoadingAnswers(prev => ({ ...prev, [questionIndex]: false }));
    }
  };

  const calculateQuestionScore = (userAnswer: string, category: string, questionText: string) => {
    if (!userAnswer || !userAnswer.trim()) return 0;
    
    const answer = userAnswer.toLowerCase();
    let score = 0;
    const wordCount = userAnswer.trim().split(' ').length;
    
    if (wordCount >= 50) score += 25;
    else if (wordCount >= 30) score += 15;
    else if (wordCount >= 15) score += 10;

    if (category === 'technical') {
      const techKeywords = ['implement', 'code', 'system', 'technology', 'solution'];
      score += techKeywords.filter(keyword => answer.includes(keyword)).length * 8;
    } else if (category === 'behavioral') {
      const behavioralKeywords = ['situation', 'task', 'action', 'result', 'example'];
      score += behavioralKeywords.filter(keyword => answer.includes(keyword)).length * 8;
    } else if (category === 'managerial') {
      const managerialKeywords = ['team', 'lead', 'manage', 'decision', 'strategy'];
      score += managerialKeywords.filter(keyword => answer.includes(keyword)).length * 8;
    }

    if (answer.includes('example')) score += 10;
    if (answer.length > 200) score += 10;
    
    return Math.min(Math.round(score), 100);
  };

  useEffect(() => {
    // Pre-generate sample answers for all questions
    if (assessment.questions) {
      assessment.questions.forEach((question: any, index: number) => {
        generateSampleAnswer(index, question);
      });
    }
  }, [assessment]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="ghost" className="text-white">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assessments
        </Button>
        <Badge className={getScoreBadge(assessment.score)}>
          Overall Score: {assessment.score}%
        </Badge>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white capitalize">
            {assessment.type} Assessment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center text-gray-400">
              <Trophy className="h-4 w-4 mr-2" />
              <span className={getScoreColor(assessment.score)}>Score: {assessment.score}%</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Clock className="h-4 w-4 mr-2" />
              Duration: {assessment.duration_minutes}m
            </div>
            <div className="flex items-center text-gray-400">
              <CheckCircle className="h-4 w-4 mr-2" />
              Questions: {assessment.attempted_questions || 0}/{assessment.total_questions || assessment.questions?.length || 0}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {assessment.questions?.map((question: any, index: number) => {
          const userAnswer = assessment.answers?.[index] || '';
          const sampleAnswer = sampleAnswers[index];
          const questionScore = calculateQuestionScore(userAnswer, question.category, question.question);
          const isLoading = loadingAnswers[index];
          
          return (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Question {question.id}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-gray-300">
                      {question.category}
                    </Badge>
                    <Badge className={getScoreBadge(questionScore)}>
                      {questionScore}%
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-gray-300 font-medium mb-2">Question:</h4>
                  <p className="text-gray-400">{question.question}</p>
                </div>
                
                <div>
                  <h4 className="text-blue-400 font-medium mb-2">Your Answer:</h4>
                  <p className="text-gray-300 bg-slate-700 p-3 rounded">
                    {userAnswer || 'No answer provided'}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                    AI-Generated Sample Answer:
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  </h4>
                  <div className="text-gray-300 bg-slate-700 p-3 rounded">
                    {isLoading ? (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating detailed sample answer...
                      </div>
                    ) : (
                      <div className="prose prose-sm max-w-none text-gray-300">
                        <p className="whitespace-pre-wrap">
                          {sampleAnswer || 'Sample answer not available'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};