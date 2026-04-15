// Powered by OnSpace.AI
import React, { createContext, useState, ReactNode } from 'react';
import {
  Donation, NGORequest, VolunteerRequest,
  MOCK_DONATIONS, MOCK_NGO_REQUESTS, MOCK_VOLUNTEER_REQUESTS,
  DonationStatus, RequestStatus,
} from '@/services/mockData';

interface DonationContextType {
  donations: Donation[];
  ngoRequests: NGORequest[];
  volunteerRequests: VolunteerRequest[];
  addDonation: (donation: Omit<Donation, 'id' | 'createdAt' | 'status'>) => void;
  updateDonationStatus: (id: string, status: DonationStatus) => void;
  submitNGORequest: (request: Omit<NGORequest, 'id' | 'createdAt'>) => void;
  updateNGORequestStatus: (id: string, status: RequestStatus) => void;
  submitVolunteerRequest: (request: Omit<VolunteerRequest, 'id' | 'createdAt'>) => void;
  updateVolunteerRequestStatus: (id: string, status: RequestStatus) => void;
  getDonationById: (id: string) => Donation | undefined;
  getDonorDonations: (donorId: string) => Donation[];
  getAvailableDonations: () => Donation[];
}

export const DonationContext = createContext<DonationContextType | undefined>(undefined);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>(MOCK_DONATIONS);
  const [ngoRequests, setNgoRequests] = useState<NGORequest[]>(MOCK_NGO_REQUESTS);
  const [volunteerRequests, setVolunteerRequests] = useState<VolunteerRequest[]>(MOCK_VOLUNTEER_REQUESTS);

  const addDonation = (donation: Omit<Donation, 'id' | 'createdAt' | 'status'>) => {
    const newDonation: Donation = {
      ...donation,
      id: `don_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'available',
    };
    setDonations(prev => [newDonation, ...prev]);
  };

  const updateDonationStatus = (id: string, status: DonationStatus) => {
    setDonations(prev => prev.map(d => d.id === id ? { ...d, status } : d));
  };

  const submitNGORequest = (request: Omit<NGORequest, 'id' | 'createdAt'>) => {
    const newRequest: NGORequest = {
      ...request,
      id: `req_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setNgoRequests(prev => [newRequest, ...prev]);
    updateDonationStatus(request.donationId, 'requested');
  };

  const updateNGORequestStatus = (id: string, status: RequestStatus) => {
    setNgoRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    if (status === 'accepted') {
      const req = ngoRequests.find(r => r.id === id);
      if (req) updateDonationStatus(req.donationId, 'accepted');
    }
  };

  const submitVolunteerRequest = (request: Omit<VolunteerRequest, 'id' | 'createdAt'>) => {
    const newRequest: VolunteerRequest = {
      ...request,
      id: `volreq_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setVolunteerRequests(prev => [newRequest, ...prev]);
  };

  const updateVolunteerRequestStatus = (id: string, status: RequestStatus) => {
    setVolunteerRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    if (status === 'accepted') {
      const req = volunteerRequests.find(r => r.id === id);
      if (req) updateDonationStatus(req.donationId, 'in_transit');
    } else if (status === 'completed') {
      const req = volunteerRequests.find(r => r.id === id);
      if (req) updateDonationStatus(req.donationId, 'delivered');
    }
  };

  const getDonationById = (id: string) => donations.find(d => d.id === id);
  const getDonorDonations = (donorId: string) => donations.filter(d => d.donorId === donorId);
  const getAvailableDonations = () => donations.filter(d => d.status === 'available');

  return (
    <DonationContext.Provider
      value={{
        donations,
        ngoRequests,
        volunteerRequests,
        addDonation,
        updateDonationStatus,
        submitNGORequest,
        updateNGORequestStatus,
        submitVolunteerRequest,
        updateVolunteerRequestStatus,
        getDonationById,
        getDonorDonations,
        getAvailableDonations,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
}
