import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { SocialAuthButtons } from './SocialAuthButtons';

interface SignupFormProps {
  onSignupSuccess: () => void;
}

export const SignupForm = ({ onSignupSuccess }: SignupFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Listen for auth state changes for social auth
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        toast({ title: 'Account created successfully!', description: 'Welcome to our platform!' });
        onSignupSuccess();
      }
    });

    return () => subscription.unsubscribe();
  }, [onSignupSuccess, toast]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            name: formData.fullName
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        if (error.message.includes('already registered')) {
          toast({ 
            title: 'Account exists', 
            description: 'This email is already registered. Please try logging in instead.', 
            variant: 'destructive' 
          });
        } else {
          throw error;
        }
        return;
      }
      
      if (data.user) {
        // Insert user data into our users table
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: formData.email,
            full_name: formData.fullName,
            created_at: new Date().toISOString()
          });
        
        if (insertError) {
          console.error('Error inserting user data:', insertError);
        }
        
        toast({ 
          title: 'Account created successfully!', 
          description: 'You can now log in with your credentials.' 
        });
        onSignupSuccess();
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Sign Up</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`bg-slate-700 border-slate-600 text-white mt-1 ${errors.fullName ? 'border-red-500' : ''}`}
              required
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>
          
          <div>
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`bg-slate-700 border-slate-600 text-white mt-1 ${errors.email ? 'border-red-500' : ''}`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`bg-slate-700 border-slate-600 text-white mt-1 ${errors.password ? 'border-red-500' : ''}`}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={`bg-slate-700 border-slate-600 text-white mt-1 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          
          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>
        
        <SocialAuthButtons />
      </CardContent>
    </Card>
  );
};