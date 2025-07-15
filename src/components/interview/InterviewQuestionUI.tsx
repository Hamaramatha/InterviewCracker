import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Volume2, VolumeX, Mic, MicOff, CheckCircle, Eye, EyeOff, BarChart3, ArrowRight, Send } from 'lucide-react';

interface InterviewQuestionUIProps {
  question: any;
  answer: string;
  setAnswer: (answer: string) => void;
  isQuestionPlaying: boolean;
  isAnswerPlaying: boolean;
  isRecording: boolean;
  transcript: string;
  submitted: boolean;
  showSampleAnswer: boolean;
  showValidation: boolean;
  sampleAnswer: string;
  validationResult: {score: number, feedback: string} | null;
  isLastQuestion: boolean;
  loadingSample: boolean;
  handleQuestionSpeak: () => void;
  handleAnswerSpeak: () => void;
  toggleRecording: () => void;
  handleSubmit: () => void;
  onSubmitAssessment: () => void;
  getSampleAnswer: () => void;
  validateAnswer: () => void;
  onNext: () => void;
}

export const InterviewQuestionUI = ({
  question,
  answer,
  setAnswer,
  isQuestionPlaying,
  isAnswerPlaying,
  isRecording,
  transcript,
  submitted,
  showSampleAnswer,
  showValidation,
  sampleAnswer,
  validationResult,
  isLastQuestion,
  loadingSample,
  handleQuestionSpeak,
  handleAnswerSpeak,
  toggleRecording,
  handleSubmit,
  onSubmitAssessment,
  getSampleAnswer,
  validateAnswer,
  onNext
}: InterviewQuestionUIProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              Interview Question
            </CardTitle>
            <Badge variant={question.category === 'technical' ? 'default' : 
                          question.category === 'behavioral' ? 'secondary' : 'outline'}>
              {question.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <p className="text-lg flex-1">{question.question}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleQuestionSpeak}
                className="shrink-0"
              >
                {isQuestionPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Answer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here or use voice recording..."
                className="min-h-[150px] resize-none"
                disabled={submitted}
              />
              {isRecording && transcript && (
                <div className="absolute top-2 right-2 bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                  Live: {transcript}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={isRecording ? 'destructive' : 'outline'}
                size="sm"
                onClick={toggleRecording}
                className="flex items-center gap-2"
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleAnswerSpeak}
                disabled={!answer.trim()}
              >
                {isAnswerPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              {!submitted && (
                <Button onClick={handleSubmit} className="ml-auto">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Answer
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {submitted && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={getSampleAnswer}
              disabled={loadingSample}
              className="flex items-center gap-2"
            >
              {showSampleAnswer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {loadingSample ? 'Loading...' : (showSampleAnswer ? 'Hide' : 'Show')} Sample Answer
            </Button>
            
            <Button
              variant="outline"
              onClick={validateAnswer}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              {showValidation ? 'Hide' : 'Show'} Validation
            </Button>
          </div>

          {showSampleAnswer && sampleAnswer && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-700">AI-Generated Sample Answer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-gray-700">{sampleAnswer}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {showValidation && validationResult && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Answer Validation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Score:</span>
                    <Badge variant={validationResult.score >= 70 ? 'default' : 
                                  validationResult.score >= 50 ? 'secondary' : 'destructive'}>
                      {validationResult.score}/100
                    </Badge>
                  </div>
                  <p className="text-gray-600">{validationResult.feedback}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Separator />
          
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={onSubmitAssessment}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Submit Assessment
            </Button>
            
            {!isLastQuestion && (
              <Button onClick={onNext} className="flex items-center gap-2">
                Next Question
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};