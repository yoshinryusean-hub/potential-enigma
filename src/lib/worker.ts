
import { addDocumentNonBlocking, setDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import { collection, doc, Firestore } from "firebase/firestore";

export interface RemoteWorker {
    id?: string;
    name: string;
    address: string;
    location: string;
    phoneNumber: string;
    emailAddress: string;
    jobTitle: string;
    department: string;
    manager: string; 
    startDate: string;
    securityIdReceived: boolean;
    pcMeetsMinimumSpecifications: boolean;
    internetMeetsMinimumSpecifications: boolean;
    ndaSigned: boolean;
    bankingDetailsReceived: boolean;
    vpnAccessGranted: boolean;
    equipmentShipped: boolean;
    welcomeKitSent: boolean;
    hrDocumentsSigned: boolean;
  }
  
  export const emptyWorker: RemoteWorker = {
    name: '',
    address: '',
    location: '',
    phoneNumber: '',
    emailAddress: '',
    jobTitle: '',
    department: '',
    manager: '',
    startDate: '',
    securityIdReceived: false,
    pcMeetsMinimumSpecifications: false,
    internetMeetsMinimumSpecifications: false,
    ndaSigned: false,
    bankingDetailsReceived: false,
    vpnAccessGranted: false,
    equipmentShipped: false,
    welcomeKitSent: false,
    hrDocumentsSigned: false
  };

  export function isOnboardingComplete(worker: RemoteWorker): boolean {
    return (
      worker.securityIdReceived &&
      worker.pcMeetsMinimumSpecifications &&
      worker.internetMeetsMinimumSpecifications &&
      worker.ndaSigned &&
      worker.bankingDetailsReceived &&
      worker.vpnAccessGranted &&
      worker.equipmentShipped &&
      worker.welcomeKitSent &&
      worker.hrDocumentsSigned
    );
  }

  export function saveWorker(firestore: Firestore | null, worker: RemoteWorker) {
    if (!firestore) {
      console.error("Firestore instance is not available.");
      return;
    }
    if (worker.id) {
        const docRef = doc(firestore, 'remoteWorkers', worker.id);
        const { id, ...workerData } = worker; // Exclude id from the data being set
        setDocumentNonBlocking(docRef, workerData, { merge: true });
    } else {
        const colRef = collection(firestore, 'remoteWorkers');
        addDocumentNonBlocking(colRef, worker);
    }
  }

  export function deleteWorker(firestore: Firestore | null, workerId: string) {
    if (!firestore) {
      console.error("Firestore instance is not available.");
      return;
    }
    const docRef = doc(firestore, 'remoteWorkers', workerId);
    deleteDocumentNonBlocking(docRef);
  }

