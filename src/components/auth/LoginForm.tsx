import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { SocialAuthButtons } from './SocialAuthButtons';

interface LoginFormProps {
  onLogin: () => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        toast({ title: 'Login successful!', description: 'Welcome back!' });
        onLogin();
      }
    });

    return () => subscription.unsubscribe();
  }, [onLogin, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrors({ email: 'Invalid email or password' });
          toast({ title: 'Login failed', description: 'Please check your credentials', variant: 'destructive' });
        } else {
          toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
        return;
      }
      
      if (data.user) {
        // Auth state change will handle the success case
        console.log('User logged in:', data.user.email);
      }
    } catch (error: any) {
      toast({ title: 'Error', description: 'Login failed. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
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
          </div>
          
          <div>
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`bg-slate-700 border-slate-600 text-white mt-1 ${errors.email ? 'border-red-500' : ''}`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        
        <SocialAuthButtons />
      </CardContent>
    </Card>
  );
};