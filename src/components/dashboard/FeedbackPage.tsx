import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MessageSquare, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FeedbackPageProps {
  onBack: () => void;
}

export const FeedbackPage = ({ onBack }: FeedbackPageProps) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast({
        title: "Error",
        description: "Please provide your feedback",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Thank you!",
      description: "Your feedback has been submitted successfully"
    });
    
    setFeedback('');
    setRating(0);
    setIsSubmitting(false);
  };

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
          <h1 className="text-3xl font-bold text-white">Feedback</h1>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Share Your Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Rate your experience</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-1 rounded ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Your feedback</label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us about your experience with InterviewCracker..."
                  className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 min-h-[120px]"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};