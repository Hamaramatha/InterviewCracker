import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, HelpCircle, MessageCircle, Book, Video } from 'lucide-react';

interface HelpPageProps {
  onBack: () => void;
}

export const HelpPage = ({ onBack }: HelpPageProps) => {
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            onClick={onBack} 
            variant="ghost" 
            className="text-white hover:bg-slate-800 mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-white">Help Center</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Book className="h-5 w-5 mr-2" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="space-y-2">
                <li>• Upload your resume to get personalized assessments</li>
                <li>• Take practice interviews in different categories</li>
                <li>• Review your performance and improve</li>
                <li>• Track your progress over time</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Video className="h-5 w-5 mr-2" />
                How to Use
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="space-y-2">
                <li>• Click on any assessment card to start</li>
                <li>• Answer questions naturally and confidently</li>
                <li>• Get instant AI-powered feedback</li>
                <li>• Practice regularly for best results</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                FAQ
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-white">Q: How accurate is the AI feedback?</p>
                  <p className="text-sm">A: Our AI is trained on thousands of interviews and provides industry-standard feedback.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Q: Can I retake assessments?</p>
                  <p className="text-sm">A: Yes, you can practice as many times as you want to improve your skills.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">Need more help? Contact our support team:</p>
              <div className="space-y-2">
                <p>Email: support@interviewcracker.com</p>
                <p>Response time: 24-48 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};