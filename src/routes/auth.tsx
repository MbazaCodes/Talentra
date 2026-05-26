import * as React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

import { supabase } from '@/integrations/supabase/client';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Minimum 6 characters'),
});

const signupSchema = z
  .object({
    fullName: z.string().min(2, 'Full name required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Minimum 6 characters'),
    confirmPassword: z.string(),
    role: z.enum(['job_seeker', 'employer']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export const Route = createFileRoute('/auth')({
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();

  const [tab, setTab] = React.useState<'login' | 'signup'>('login');

  const [loading, setLoading] = React.useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'job_seeker',
    },
  });

  const onLogin = async (data: LoginFormValues) => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      toast.success('Login successful');

      navigate({ to: '/' });
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const onSignup = async (data: SignupFormValues) => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            role: data.role,
          },
        },
      });

      if (error) {
        throw error;
      }

      toast.success('Account created successfully');

      setTab('login');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md rounded-3xl p-6 shadow-xl">
        <div className="mb-6 flex gap-2">
          <Button
            type="button"
            variant={tab === 'login' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setTab('login')}
          >
            Login
          </Button>

          <Button
            type="button"
            variant={tab === 'signup' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setTab('signup')}
          >
            Sign Up
          </Button>
        </div>

        {tab === 'login' ? (
          <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
            <Input placeholder="Email" type="email" {...loginForm.register('email')} />

            <Input placeholder="Password" type="password" {...loginForm.register('password')} />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        ) : (
          <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
            <Input placeholder="Full Name" {...signupForm.register('fullName')} />

            <Input placeholder="Email" type="email" {...signupForm.register('email')} />

            <Input placeholder="Password" type="password" {...signupForm.register('password')} />

            <Input
              placeholder="Confirm Password"
              type="password"
              {...signupForm.register('confirmPassword')}
            />

            <select
              {...signupForm.register('role')}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="job_seeker">Job Seeker</option>

              <option value="employer">Employer</option>
            </select>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
