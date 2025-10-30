
'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RemoteWorker, saveWorker } from '@/lib/worker';
import { useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface WorkerFormProps {
  worker: RemoteWorker;
  onSave: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  address: z.string().min(5, "Address is required."),
  location: z.string().min(2, "Location is required."),
  phoneNumber: z.string().min(10, "A valid phone number is required."),
  emailAddress: z.string().email("A valid email is required."),
  jobTitle: z.string().min(2, "Job title is required."),
  department: z.string().min(2, "Department is required."),
  manager: z.string().min(2, "Manager's name is required."),
  startDate: z.string().min(1, "Start date is required."),
  securityIdReceived: z.boolean(),
  pcMeetsMinimumSpecifications: z.boolean(),
  internetMeetsMinimumSpecifications: z.boolean(),
  ndaSigned: z.boolean(),
  bankingDetailsReceived: z.boolean(),
  vpnAccessGranted: z.boolean(),
  equipmentShipped: z.boolean(),
  welcomeKitSent: z.boolean(),
  hrDocumentsSigned: z.boolean(),
});

export function WorkerForm({ worker, onSave }: WorkerFormProps) {
  const firestore = useFirestore();
  const { register, handleSubmit, control, formState: { errors } } = useForm<RemoteWorker>({
    resolver: zodResolver(formSchema),
    defaultValues: worker,
  });

  const onSubmit = (data: RemoteWorker) => {
    const workerData = { ...worker, ...data };
    saveWorker(firestore, workerData);
    toast({
        title: "Success!",
        description: `${data.name} has been ${worker.id ? 'updated' : 'added'}.`,
    });
    onSave();
  };

  const checklistItems = [
    { id: 'securityIdReceived', label: 'Security ID Received' },
    { id: 'pcMeetsMinimumSpecifications', label: 'PC Meets Minimum Specifications' },
    { id: 'internetMeetsMinimumSpecifications', label: 'Internet Meets Minimum Specifications' },
    { id: 'ndaSigned', label: 'NDA Signed' },
    { id: 'bankingDetailsReceived', label: 'Banking Details Received' },
    { id: 'vpnAccessGranted', label: 'VPN Access Granted' },
    { id: 'equipmentShipped', label: 'Equipment Shipped' },
    { id: 'welcomeKitSent', label: 'Welcome Kit Sent' },
    { id: 'hrDocumentsSigned', label: 'HR Documents Signed' },
  ] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
       <ScrollArea className="h-96 w-full pr-4">
            <div className="space-y-6 p-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" {...register('name')} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="emailAddress">Email Address</Label>
                        <Input id="emailAddress" type="email" {...register('emailAddress')} />
                        {errors.emailAddress && <p className="text-red-500 text-xs mt-1">{errors.emailAddress.message}</p>}
                    </div>
                </div>

                <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" {...register('address')} />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" {...register('location')} />
                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input id="phoneNumber" type="tel" {...register('phoneNumber')} />
                        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input id="jobTitle" {...register('jobTitle')} />
                        {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="department">Department</Label>
                        <Input id="department" {...register('department')} />
                        {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>}
                    </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="manager">Manager</Label>
                        <Input id="manager" {...register('manager')} />
                        {errors.manager && <p className="text-red-500 text-xs mt-1">{errors.manager.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input id="startDate" type="date" {...register('startDate')} />
                        {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
                    </div>
                </div>

                <div>
                    <h3 className="font-headline text-lg text-foreground mb-4">Onboarding Checklist</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {checklistItems.map(item => (
                            <Controller
                                key={item.id}
                                name={item.id}
                                control={control}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={item.id}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <Label htmlFor={item.id} className="font-normal text-sm text-neutral-300">
                                            {item.label}
                                        </Label>
                                    </div>
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
      </ScrollArea>
      <div className="flex justify-end gap-2 pt-4 border-t border-border">
        <Button type="button" variant="ghost" onClick={onSave}>Cancel</Button>
        <Button type="submit">Save Worker</Button>
      </div>
    </form>
  );
}
