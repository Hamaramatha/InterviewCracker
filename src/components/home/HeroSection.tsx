import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SignupForm } from '@/components/auth/SignupForm';
import { LoginForm } from '@/components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    navigate('/dashboard');
  };

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <section className="py-20 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Main Content */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Crack Your
              <br />
              Dream Job with AI
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Smart Interview Prep for
              <br />
              IT, Software, and Beyond
            </p>
          </div>
        </div>
        
        {/* Right Side - Auth Forms */}
        <div className="lg:pl-12">
          {showLogin ? (
            <div className="space-y-4">
              <LoginForm onLogin={handleLoginSuccess} />
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Don't have an account?{' '}
                  <Button variant="link" onClick={() => setShowLogin(false)} className="p-0 text-teal-400 hover:underline">
                    Sign up
                  </Button>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <SignupForm onSignupSuccess={handleSignupSuccess} />
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{' '}
                  <Button variant="link" onClick={() => setShowLogin(true)} className="p-0 text-teal-400 hover:underline">
                    Login
                  </Button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};