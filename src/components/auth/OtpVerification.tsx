import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface OtpVerificationProps {
  email: string;
  userData: any;
  onVerified: () => void;
  onBack: () => void;
}

export const OtpVerification = ({ email, userData, onVerified, onBack }: OtpVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({ title: 'Error', description: 'Please enter a valid 6-digit OTP', variant: 'destructive' });
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      });
      
      if (error) throw error;
      
      if (data.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            full_name: userData.fullName,
            email: email,
            created_at: new Date().toISOString()
          });
        
        if (insertError) {
          console.error('Error inserting user:', insertError);
        }
        
        toast({ title: 'Success', description: 'Account created successfully!' });
        onVerified();
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOtp({ 
        email,
        options: {
          shouldCreateUser: true
        }
      });
      if (error) throw error;
      toast({ title: 'OTP resent successfully!' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Verify OTP</CardTitle>
        <p className="text-sm text-gray-300">Enter the 6-digit code sent to {email}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <Label htmlFor="otp" className="text-gray-300">OTP Code</Label>
            <Input
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              className="text-center text-lg tracking-widest bg-slate-700 border-slate-600 text-white mt-1"
              maxLength={6}
            />
          </div>
          
          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600" disabled={loading || otp.length !== 6}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Button>
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack} className="text-white border-slate-600 hover:bg-slate-700">
              Back
            </Button>
            <Button type="button" variant="ghost" onClick={handleResendOtp} className="text-gray-300 hover:bg-slate-700">
              Resend OTP
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};