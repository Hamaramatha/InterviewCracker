import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { InterviewQuestionUI } from './InterviewQuestionUI';

interface InterviewQuestionProps {
  question: any;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  onSubmitAssessment: () => void;
  isLastQuestion: boolean;
  questionIndex: number;
}

export const InterviewQuestion = ({ question, onAnswer, onNext, onSubmitAssessment, isLastQuestion, questionIndex }: InterviewQuestionProps) => {
  const [answer, setAnswer] = useState('');
  const [isQuestionPlaying, setIsQuestionPlaying] = useState(false);
  const [isAnswerPlaying, setIsAnswerPlaying] = useState(false);
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sampleAnswer, setSampleAnswer] = useState('');
  const [validationResult, setValidationResult] = useState<{score: number, feedback: string} | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [transcript, setTranscript] = useState('');
  const [loadingSample, setLoadingSample] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setAnswer('');
    setIsQuestionPlaying(false);
    setIsAnswerPlaying(false);
    setShowSampleAnswer(false);
    setShowValidation(false);
    setSubmitted(false);
    setSampleAnswer('');
    setValidationResult(null);
    setIsRecording(false);
    setTranscript('');
    
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    
    if (recognition) {
      recognition.stop();
    }
  }, [questionIndex]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscript(finalTranscript + interimTranscript);
        setAnswer(prev => prev + finalTranscript);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        toast({ title: 'Speech recognition error', description: 'Please try again.', variant: 'destructive' });
      };
      
      recognitionInstance.onend = () => {
        setIsRecording(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, []);

  const speakText = (text: string, onStart?: () => void, onEnd?: () => void) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.volume = 0.8;
      
      utterance.onstart = () => onStart?.();
      utterance.onend = () => onEnd?.();
      
      speechSynthesis.speak(utterance);
    }
  };

  const handleQuestionSpeak = () => {
    if (isQuestionPlaying) {
      speechSynthesis.cancel();
      setIsQuestionPlaying(false);
    } else {
      speakText(
        question.question,
        () => setIsQuestionPlaying(true),
        () => setIsQuestionPlaying(false)
      );
    }
  };

  const handleAnswerSpeak = () => {
    if (!answer.trim()) {
      toast({ title: 'No answer', description: 'Please provide an answer first.', variant: 'destructive' });
      return;
    }
    
    if (isAnswerPlaying) {
      speechSynthesis.cancel();
      setIsAnswerPlaying(false);
    } else {
      speakText(
        answer,
        () => setIsAnswerPlaying(true),
        () => setIsAnswerPlaying(false)
      );
    }
  };

  const toggleRecording = () => {
    if (!recognition) {
      toast({ title: 'Speech recognition not supported', description: 'Please use a supported browser.', variant: 'destructive' });
      return;
    }
    
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      recognition.start();
      setIsRecording(true);
    }
  };

  const handleSubmit = () => {
    if (!answer.trim()) {
      toast({ title: 'Answer required', description: 'Please provide an answer before submitting.', variant: 'destructive' });
      return;
    }
    
    onAnswer(answer);
    setSubmitted(true);
  };

  const getSampleAnswer = async () => {
    if (sampleAnswer) {
      setShowSampleAnswer(!showSampleAnswer);
      return;
    }

    setLoadingSample(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-sample-answer', {
        body: { 
          question: question.question, 
          category: question.category 
        }
      });

      if (error) throw error;
      
      setSampleAnswer(data.sampleAnswer);
      setShowSampleAnswer(true);
    } catch (error) {
      console.error('Error generating sample answer:', error);
      toast({ 
        title: 'Error', 
        description: 'Failed to generate sample answer. Please try again.', 
        variant: 'destructive' 
      });
    } finally {
      setLoadingSample(false);
    }
  };

  const validateAnswer = async () => {
    if (validationResult) {
      setShowValidation(!showValidation);
      return;
    }

    if (!sampleAnswer) {
      await getSampleAnswer();
    }

    const userAnswer = answer.toLowerCase();
    let score = 0;
    const wordCount = answer.trim().split(' ').length;
    
    if (wordCount >= 50) score += 25;
    else if (wordCount >= 30) score += 15;
    else if (wordCount >= 15) score += 10;

    if (question.category === 'behavioral') {
      const starKeywords = ['situation', 'task', 'action', 'result', 'example', 'experience'];
      score += starKeywords.filter(keyword => userAnswer.includes(keyword)).length * 8;
    } else if (question.category === 'managerial') {
      const managerialKeywords = ['team', 'lead', 'manage', 'decision', 'strategy', 'motivate'];
      score += managerialKeywords.filter(keyword => userAnswer.includes(keyword)).length * 8;
    } else {
      const techKeywords = ['implement', 'code', 'system', 'technology', 'solution'];
      score += techKeywords.filter(keyword => userAnswer.includes(keyword)).length * 8;
    }

    if (userAnswer.includes('example')) score += 10;
    if (userAnswer.length > 200) score += 10;
    
    score = Math.min(Math.round(score), 100);

    let feedback = '';
    if (score >= 80) {
      feedback = 'Excellent answer! Comprehensive and well-structured with good examples.';
    } else if (score >= 65) {
      feedback = 'Good answer! Consider adding more specific examples and details.';
    } else if (score >= 50) {
      feedback = 'Fair answer. Could benefit from more structure and concrete examples.';
    } else {
      feedback = 'Your answer needs improvement. Include specific examples and more detail.';
    }

    setValidationResult({ score, feedback });
    setShowValidation(true);
  };

  return (
    <InterviewQuestionUI
      question={question}
      answer={answer}
      setAnswer={setAnswer}
      isQuestionPlaying={isQuestionPlaying}
      isAnswerPlaying={isAnswerPlaying}
      isRecording={isRecording}
      transcript={transcript}
      submitted={submitted}
      showSampleAnswer={showSampleAnswer}
      showValidation={showValidation}
      sampleAnswer={sampleAnswer}
      validationResult={validationResult}
      isLastQuestion={isLastQuestion}
      loadingSample={loadingSample}
      handleQuestionSpeak={handleQuestionSpeak}
      handleAnswerSpeak={handleAnswerSpeak}
      toggleRecording={toggleRecording}
      handleSubmit={handleSubmit}
      onSubmitAssessment={onSubmitAssessment}
      getSampleAnswer={getSampleAnswer}
      validateAnswer={validateAnswer}
      onNext={onNext}
    />
  );
};