
'use client';

import { useCollection, useMemoFirebase, useUser } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { RemoteWorker, isOnboardingComplete, emptyWorker } from '@/lib/worker';
import { WorkerCard } from '@/components/worker-card';
import { WorkerForm } from '@/components/worker-form';
import { Users, CheckCircle, Clock, UserPlus, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<RemoteWorker | null>(null);

  useEffect(() => {
    // If user loading is finished and there's no user, redirect to login
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const workersQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'remoteWorkers'));
  }, [firestore, user]);

  const { data: workers, isLoading } = useCollection<RemoteWorker>(workersQuery);

  const stats = useMemo(() => {
    if (!workers) return { total: 0, completed: 0, incomplete: 0, progress: 0 };
    const total = workers.length;
    const completed = workers.filter(isOnboardingComplete).length;
    const incomplete = total - completed;
    const progress = total > 0 ? (completed / total) * 100 : 0;
    return { total, completed, incomplete, progress };
  }, [workers]);

  const handleEdit = (worker: RemoteWorker) => {
    setSelectedWorker(worker);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setSelectedWorker(emptyWorker);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedWorker(null);
  };

  // If we're still checking for a user, show a loading state
  if (isUserLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-glow-blue" />
      </div>
    );
  }

  return (
    <div className="flex flex-col animate-fade-in">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-card">
        <div className="absolute inset-0 bg-grid-glow opacity-20 [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-neutral-50 via-neutral-200 to-neutral-500 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Remote Worker Onboarding
          </h1>
          <p
            className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-400 mt-4 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            A centralized dashboard to track the onboarding status of all remote team members.
          </p>
        </div>
      </section>

       {/* Stats Dashboard */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Workers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completed}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
                <Clock className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.incomplete}</div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Overall Onboarding Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={stats.progress} className="w-full" />
                <p className="text-right text-sm text-muted-foreground mt-2">{stats.progress.toFixed(0)}% Complete</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Workers Section */}
      <section id="workers" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-12">
            <div className="text-left">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-neutral-100">Onboarding Dashboard</h2>
                <p className="text-lg text-neutral-400 mt-2 max-w-3xl">
                Track the progress of each new hire at a glance.
                </p>
            </div>
          </div>
          {isLoading && (
            <div className="text-center text-neutral-400">Loading workers...</div>
          )}
          {!isLoading && (!workers || workers.length === 0) && (
            <div className="text-center text-neutral-500 py-16 border-2 border-dashed border-border rounded-lg">
              <p>No remote workers have been added yet.</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workers?.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} onEdit={() => handleEdit(worker)} />
            ))}
          </div>
        </div>
      </section>
      
       {/* Add Worker Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <Button size="lg" onClick={handleAddNew}>
            <UserPlus className="mr-2 h-5 w-5" />
            Add New Worker
          </Button>
        </div>
      </section>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-foreground">
              {selectedWorker && selectedWorker.id ? 'Edit Remote Worker' : 'Add New Remote Worker'}
            </DialogTitle>
            <DialogDescription>
              {selectedWorker && selectedWorker.id ? 'Update the details for this team member.' : 'Fill in the details for the new team member.'}
            </DialogDescription>
          </DialogHeader>
          {selectedWorker && <WorkerForm worker={selectedWorker} onSave={handleFormClose} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
