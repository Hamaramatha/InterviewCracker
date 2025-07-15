import { useState, useEffect } from 'react';
import { InterviewQuestion } from './InterviewQuestion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface InterviewSessionProps {
  interviewType: string;
  resumeText: string;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export const InterviewSession = ({ interviewType, resumeText, onBack, onComplete }: InterviewSessionProps) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [startTime] = useState(new Date());
  const [submittingAssessment, setSubmittingAssessment] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = async () => {
    try {
      const mockQuestions = generateMockQuestions(interviewType);
      setQuestions(mockQuestions);
      setAnswers(new Array(mockQuestions.length).fill(''));
      setLoading(false);
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate questions. Please try again.',
        variant: 'destructive'
      });
      setLoading(false);
    }
  };

  const generateMockQuestions = (type: string) => {
    const questionSets = {
      technical: [
        { id: 1, question: 'Explain the difference between let, const, and var in JavaScript.', category: 'technical' },
        { id: 2, question: 'What is the difference between SQL and NoSQL databases?', category: 'technical' },
        { id: 3, question: 'Describe the concept of object-oriented programming.', category: 'technical' },
        { id: 4, question: 'What is the purpose of version control systems like Git?', category: 'technical' },
        { id: 5, question: 'Explain the concept of API and REST services.', category: 'technical' }
      ],
      behavioral: [
        { id: 1, question: 'Tell me about a time when you had to work under pressure.', category: 'behavioral' },
        { id: 2, question: 'Describe a situation where you had to resolve a conflict with a team member.', category: 'behavioral' },
        { id: 3, question: 'How do you handle constructive criticism?', category: 'behavioral' },
        { id: 4, question: 'Tell me about a time when you failed and how you handled it.', category: 'behavioral' },
        { id: 5, question: 'Describe your approach to learning new technologies.', category: 'behavioral' }
      ],
      managerial: [
        { id: 1, question: 'How do you motivate your team members?', category: 'managerial' },
        { id: 2, question: 'Describe your approach to performance management.', category: 'managerial' },
        { id: 3, question: 'How do you handle underperforming team members?', category: 'managerial' },
        { id: 4, question: 'Tell me about a time when you had to make a difficult decision.', category: 'managerial' },
        { id: 5, question: 'How do you ensure effective communication within your team?', category: 'managerial' }
      ]
    };

    return questionSets[type as keyof typeof questionSets] || questionSets.technical;
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      await submitAssessment();
    }
  };

  const submitAssessment = async () => {
    if (submittingAssessment) return;
    
    setSubmittingAssessment(true);
    
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const endTime = new Date();
      const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60);
      const score = calculateScore();
      const attemptedQuestions = answers.filter(answer => answer && answer.trim().length > 0).length;

      const assessmentData = {
        user_id: user.id,
        type: interviewType,
        questions: questions,
        answers: answers,
        score: score,
        duration_minutes: duration,
        attempted_questions: attemptedQuestions,
        total_questions: questions.length,
        completed_at: new Date().toISOString(),
        status: 'completed'
      };

      console.log('Submitting assessment data:', assessmentData);

      const { data, error } = await supabase
        .from('assessments')
        .insert([assessmentData])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      console.log('Assessment submitted successfully:', data);

      toast({
        title: 'Assessment Completed',
        description: `Your ${interviewType} assessment has been submitted successfully! Score: ${score}%`
      });

      onComplete(score);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast({
        title: 'Submission Error',
        description: error instanceof Error ? error.message : 'Failed to submit assessment. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSubmittingAssessment(false);
    }
  };

  const calculateScore = () => {
    const answeredQuestions = answers.filter(answer => answer && answer.trim().length > 0);
    if (answeredQuestions.length === 0) return 0;
    
    const baseScore = (answeredQuestions.length / questions.length) * 100;
    const avgAnswerLength = answeredQuestions.reduce((sum, answer) => sum + answer.length, 0) / answeredQuestions.length;
    const lengthBonus = Math.min(avgAnswerLength / 50, 1) * 10;
    return Math.round(Math.min(baseScore + lengthBonus, 100));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800 border-slate-700 p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white">Generating personalized questions...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800 border-slate-700 p-8">
          <div className="text-center">
            <p className="text-white mb-4">Failed to generate questions.</p>
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={onBack} variant="ghost" className="text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Interview
            </Button>
            <h1 className="text-xl font-semibold text-white capitalize">
              {interviewType} Interview
            </h1>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          </div>
        </div>
      </div>

      <div className="py-8">
        {submittingAssessment ? (
          <div className="max-w-4xl mx-auto px-6">
            <Card className="bg-slate-800 border-slate-700 p-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-white">Submitting your assessment...</p>
              </div>
            </Card>
          </div>
        ) : (
          <InterviewQuestion
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onSubmitAssessment={submitAssessment}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
            questionIndex={currentQuestionIndex}
          />
        )}
      </div>
    </div>
  );
};