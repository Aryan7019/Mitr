// types/index.ts
export interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: Array<{
    emailAddress: string;
  }>;
}

export interface MentalHealthData {
  medicareScore: number;
  anxietyLevel: number;
  stressLevel: number;
  sleepQuality: number;
  moodScore: number;
  insights: string[];
  resources: Resource[];
}

export interface Resource {
  name: string;
  url: string;
  language: string;
  category: string;
  description: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface Option {
  value: number;
  label: string;
}

export interface BookingModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  score: number;
}

// Add to your existing types/index.ts
export interface BookingModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  score: number;
  loading?: boolean; // Make loading optional
}

export interface BookingData {
  date: string;
  time: string;
  notes: string;
}