// Powered by OnSpace.AI
import { useContext } from 'react';
import { DonationContext } from '@/contexts/DonationContext';

export function useDonations() {
  const context = useContext(DonationContext);
  if (!context) throw new Error('useDonations must be used within DonationProvider');
  return context;
}
