
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import {
  initiateEmailSignIn,
} from '@/firebase/non-blocking-login';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, LogIn } from 'lucide-react';
import { useToast } from '../../components/ui/toast.tsx';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long.'),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/onboarding');
    }
  }, [user, isUserLoading, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleAuthError = (error: AuthError) => {
    let description = 'An unexpected error occurred. Please try again.';
    if (error.code === AuthErrorCodes.USER_DELETED) {
      description = 'This account could not be found.';
    } else if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
      description = 'Invalid email or password. Please try again.';
    }
    toast({
      variant: 'destructive',
      title: 'Authentication Failed',
      description,
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      initiateEmailSignIn(auth, values.email, values.password);
      
      const unsubscribe = auth.onAuthStateChanged(
        (user) => {
          unsubscribe(); // Clean up listener
          if (user) {
            toast({
              title: 'Login Successful!',
              description: 'Redirecting to the onboarding dashboard...',
            });
            router.push('/onboarding');
          }
        },
        (error) => {
          unsubscribe(); // Clean up listener
          handleAuthError(error as AuthError);
          setIsLoading(false);
        }
      );
    } catch (error) {
      handleAuthError(error as AuthError);
      setIsLoading(false);
    }
  }

  // Render nothing or a loader while redirecting
  if (isUserLoading || user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-glow-blue" />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md bg-card border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl text-neutral-100">
            Management Sign In
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Access the remote worker onboarding dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@company.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full font-bold">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="mr-2 h-4 w-4" />
                )}
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
