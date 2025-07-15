import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Users, Settings, Lock } from 'lucide-react';

interface AssessmentCardsProps {
  isResumeUploaded: boolean;
  onStartAssessment: (type: string) => void;
}

export const AssessmentCards = ({ isResumeUploaded, onStartAssessment }: AssessmentCardsProps) => {
  const assessments = [
    {
      id: 'technical',
      title: 'Technical',
      description: 'Test your programming and technical skills',
      icon: Brain,
      color: 'bg-blue-500'
    },
    {
      id: 'behavioral',
      title: 'Behavioral',
      description: 'Practice behavioral interview questions',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      id: 'managerial',
      title: 'Managerial',
      description: 'Leadership and management scenarios',
      icon: Settings,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {assessments.map((assessment) => {
        const Icon = assessment.icon;
        return (
          <Card 
            key={assessment.id} 
            className={`bg-slate-800 border-slate-700 transition-all duration-200 ${
              !isResumeUploaded ? 'opacity-50 cursor-not-allowed' : 'hover:border-slate-600'
            }`}
          >
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <div className={`p-2 rounded-lg ${assessment.color}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                {assessment.title}
                {!isResumeUploaded && (
                  <Lock className="h-4 w-4 text-gray-500 ml-auto" />
                )}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {assessment.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => onStartAssessment(assessment.id)}
                disabled={!isResumeUploaded}
                className={`w-full ${
                  isResumeUploaded 
                    ? 'bg-teal-500 hover:bg-teal-600 text-white' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isResumeUploaded ? 'Start' : 'Upload Resume First'}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};