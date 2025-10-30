
'use client';

import { RemoteWorker, isOnboardingComplete, deleteWorker } from '@/lib/worker';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Edit, Trash2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast.tsx';




interface WorkerCardProps {
  worker: RemoteWorker;
  onEdit: () => void;
}

export function WorkerCard({ worker, onEdit }: WorkerCardProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const isComplete = isOnboardingComplete(worker);

  const checklistItems = [
    { label: 'Security ID', value: worker.securityIdReceived },
    { label: 'PC Specs', value: worker.pcMeetsMinimumSpecifications },
    { label: 'Internet Specs', value: worker.internetMeetsMinimumSpecifications },
    { label: 'NDA Signed', value: worker.ndaSigned },
    { label: 'Banking Details', value: worker.bankingDetailsReceived },
    { label: 'VPN Access', value: worker.vpnAccessGranted },
    { label: 'Equipment Shipped', value: worker.equipmentShipped },
    { label: 'Welcome Kit Sent', value: worker.welcomeKitSent },
    { label: 'HR Docs Signed', value: worker.hrDocumentsSigned },
  ];

  const handleDelete = () => {
    if (worker.id) {
      deleteWorker(firestore, worker.id);
      toast({
        title: "Worker Deleted",
        description: `${worker.name} has been removed from the dashboard.`,
      });
    }
  };

  return (
    <div
        className={cn(
            "group relative rounded-xl border bg-white/5 p-6 overflow-hidden transition-all duration-500",
            isComplete ? "border-green-500/30 hover:shadow-green-500/10" : "border-red-500/30 hover:shadow-red-500/10"
        )}
    >
        <div className="absolute inset-0 bg-grid-glow opacity-0 transition-opacity duration-500 group-hover:opacity-20"></div>
        <div className="relative flex flex-col h-full">
            <CardHeader className="p-0 mb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle
                        className={cn(
                            'font-headline text-2xl',
                            isComplete ? 'text-green-400' : 'text-red-400'
                        )}
                        >
                        {worker.name}
                        </CardTitle>
                        <CardDescription className="text-neutral-400">{worker.jobTitle}</CardDescription>
                    </div>
                     <div
                        className={cn(
                            'flex items-center text-sm font-semibold',
                            isComplete ? 'text-green-400' : 'text-red-400'
                        )}
                        >
                        {isComplete ? <CheckCircle className="mr-2 h-5 w-5" /> : <XCircle className="mr-2 h-5 w-5" />}
                        {isComplete ? 'Complete' : 'Incomplete'}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
                <div className="space-y-2 text-sm text-neutral-400 mb-4">
                    <p><strong>Email:</strong> {worker.emailAddress}</p>
                    <p><strong>Location:</strong> {worker.location}</p>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {checklistItems.map(item => (
                         <div key={item.label} className="flex items-center text-sm">
                            {item.value ? (
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            ) : (
                                <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                            )}
                            <span className={cn(item.value ? "text-neutral-300" : "text-neutral-500")}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="p-0 mt-6 flex gap-2">
                <Button variant="outline" size="sm" className="w-full" onClick={onEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="w-full">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the record for {worker.name}.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </div>
    </div>
  );
}
