import { useState, useEffect } from 'react';
import { SignupForm } from '@/components/auth/SignupForm';
import { LoginForm } from '@/components/auth/LoginForm';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

type AuthStep = 'login' | 'signup';

export const Auth = () => {
  const [step, setStep] = useState<AuthStep>('login');
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    
    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignupSuccess = () => {
    navigate('/dashboard');
  };

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {step === 'login' && (
          <div className="space-y-4">
            <LoginForm onLogin={handleLoginSuccess} />
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Button 
                  variant="link" 
                  onClick={() => setStep('signup')} 
                  className="p-0 text-teal-400 hover:text-teal-300"
                >
                  Sign up
                </Button>
              </p>
            </div>
          </div>
        )}
        
        {step === 'signup' && (
          <div className="space-y-4">
            <SignupForm onSignupSuccess={handleSignupSuccess} />
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Button 
                  variant="link" 
                  onClick={() => setStep('login')} 
                  className="p-0 text-teal-400 hover:text-teal-300"
                >
                  Login
                </Button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};