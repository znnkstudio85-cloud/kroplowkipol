export type Language = 'pl' | 'en';

export interface ServiceItem {
  id: string;
  namePl: string;
  nameEn: string;
  pricePLN: number;
  descriptionPl: string;
  descriptionEn: string;
  category: 'regeneracja' | 'odpornosc' | 'detoks' | 'sport' | 'premium' | 'specjalistyczne';
  iconName: string;
  badgePl?: string;
  badgeEn?: string;
  compositionPl: string[];
  compositionEn: string[];
  durationMinutes: number;
}

export interface BookingFormData {
  service: string;
  fullName: string;
  date: string;
  time: string;
  email: string;
  phone: string;
  locationMode: 'mobile' | 'clinic';
  address: string;
  notes: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  devNotice?: string;
}

export interface FAQItem {
  id: string;
  questionPl: string;
  questionEn: string;
  answerPl: string;
  answerEn: string;
  categoryPl: string;
  categoryEn: string;
}

export interface MedicalStaff {
  id: string;
  name: string;
  rolePl: string;
  roleEn: string;
  qualificationsPl: string;
  qualificationsEn: string;
  image: string;
}
