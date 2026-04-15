// Powered by OnSpace.AI
export type UserRole = 'donor' | 'ngo' | 'volunteer';

export type DonationStatus = 'available' | 'requested' | 'accepted' | 'in_transit' | 'delivered';
export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'completed';
export type UrgencyLevel = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  phone: string;
  address: string;
  avatar: string;
}

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  donorAddress: string;
  foodItems: string[];
  quantity: string;
  expiryDate: string;
  status: DonationStatus;
  urgency: UrgencyLevel;
  category: string;
  notes: string;
  createdAt: string;
  ngoId?: string;
  ngoName?: string;
  volunteerId?: string;
  volunteerName?: string;
  coordinates: { lat: number; lng: number };
}

export interface NGORequest {
  id: string;
  ngoId: string;
  ngoName: string;
  donationId: string;
  foodItems: string[];
  status: RequestStatus;
  message: string;
  createdAt: string;
  beneficiaries: number;
}

export interface VolunteerRequest {
  id: string;
  ngoId: string;
  ngoName: string;
  donationId: string;
  pickupAddress: string;
  dropAddress: string;
  pickupCoords: { lat: number; lng: number };
  dropCoords: { lat: number; lng: number };
  status: RequestStatus;
  estimatedDistance: string;
  estimatedTime: string;
  createdAt: string;
}

export interface DeliveryRoute {
  id: string;
  volunteerId: string;
  donationId: string;
  status: 'assigned' | 'picked_up' | 'in_transit' | 'delivered';
  currentLocation: { lat: number; lng: number };
  pickupAddress: string;
  dropAddress: string;
  estimatedArrival: string;
  aiSuggestion: string;
}

// Mock Users
export const MOCK_USERS: Record<UserRole, User> = {
  donor: {
    id: 'donor_001',
    name: 'Ramesh Kumar',
    email: 'ramesh@freshfoods.com',
    role: 'donor',
    organization: 'Fresh Foods Restaurant',
    phone: '+91 98765 43210',
    address: '42, MG Road, Bengaluru, Karnataka 560001',
    avatar: 'RK',
  },
  ngo: {
    id: 'ngo_001',
    name: 'Priya Sharma',
    email: 'priya@feedindia.org',
    role: 'ngo',
    organization: 'Feed India Foundation',
    phone: '+91 87654 32109',
    address: '15, Gandhi Nagar, Bengaluru, Karnataka 560032',
    avatar: 'PS',
  },
  volunteer: {
    id: 'vol_001',
    name: 'Arun Mehta',
    email: 'arun.mehta@gmail.com',
    role: 'volunteer',
    phone: '+91 76543 21098',
    address: '8, Koramangala 4th Block, Bengaluru 560034',
    avatar: 'AM',
  },
};

// Mock Donations
export const MOCK_DONATIONS: Donation[] = [
  {
    id: 'don_001',
    donorId: 'donor_001',
    donorName: 'Fresh Foods Restaurant',
    donorAddress: '42, MG Road, Bengaluru',
    foodItems: ['Biryani', 'Dal Makhani', 'Roti'],
    quantity: '25 kg',
    expiryDate: '2026-04-15',
    status: 'available',
    urgency: 'high',
    category: 'Cooked Food',
    notes: 'Prepared today morning. Must be collected by evening.',
    createdAt: '2026-04-15T08:00:00Z',
    coordinates: { lat: 12.9716, lng: 77.5946 },
  },
  {
    id: 'don_002',
    donorId: 'donor_002',
    donorName: 'City Bakery',
    donorAddress: '18, Indiranagar, Bengaluru',
    foodItems: ['Bread Loaves', 'Muffins', 'Croissants'],
    quantity: '15 kg',
    expiryDate: '2026-04-16',
    status: 'requested',
    urgency: 'medium',
    category: 'Bakery',
    notes: 'End of day surplus. Best before tomorrow.',
    createdAt: '2026-04-14T17:00:00Z',
    ngoId: 'ngo_001',
    ngoName: 'Feed India Foundation',
    coordinates: { lat: 12.9784, lng: 77.6408 },
  },
  {
    id: 'don_003',
    donorId: 'donor_003',
    donorName: 'Metro Supermart',
    donorAddress: '5, Koramangala, Bengaluru',
    foodItems: ['Vegetables', 'Fruits', 'Dairy Products'],
    quantity: '40 kg',
    expiryDate: '2026-04-17',
    status: 'in_transit',
    urgency: 'medium',
    category: 'Groceries',
    notes: 'Near-expiry produce, still nutritious.',
    createdAt: '2026-04-14T10:00:00Z',
    ngoId: 'ngo_002',
    ngoName: 'Asha Community Trust',
    volunteerId: 'vol_001',
    volunteerName: 'Arun Mehta',
    coordinates: { lat: 12.9352, lng: 77.6245 },
  },
  {
    id: 'don_004',
    donorId: 'donor_001',
    donorName: 'Fresh Foods Restaurant',
    donorAddress: '42, MG Road, Bengaluru',
    foodItems: ['Sambar Rice', 'Curd Rice', 'Payasam'],
    quantity: '20 kg',
    expiryDate: '2026-04-13',
    status: 'delivered',
    urgency: 'low',
    category: 'Cooked Food',
    notes: 'Festival surplus food.',
    createdAt: '2026-04-13T12:00:00Z',
    ngoId: 'ngo_001',
    ngoName: 'Feed India Foundation',
    volunteerId: 'vol_002',
    volunteerName: 'Kavitha Nair',
    coordinates: { lat: 12.9716, lng: 77.5946 },
  },
  {
    id: 'don_005',
    donorId: 'donor_004',
    donorName: 'Hotel Taj Residency',
    donorAddress: '1, MG Road, Bengaluru',
    foodItems: ['Paneer Dishes', 'Rice', 'Salads'],
    quantity: '60 kg',
    expiryDate: '2026-04-15',
    status: 'available',
    urgency: 'high',
    category: 'Cooked Food',
    notes: 'Conference banquet surplus. Premium quality.',
    createdAt: '2026-04-15T14:00:00Z',
    coordinates: { lat: 12.9756, lng: 77.6097 },
  },
];

// Mock NGO Requests
export const MOCK_NGO_REQUESTS: NGORequest[] = [
  {
    id: 'req_001',
    ngoId: 'ngo_001',
    ngoName: 'Feed India Foundation',
    donationId: 'don_002',
    foodItems: ['Bread Loaves', 'Muffins'],
    status: 'pending',
    message: 'We serve 200 children daily. This would help greatly.',
    createdAt: '2026-04-14T18:00:00Z',
    beneficiaries: 200,
  },
  {
    id: 'req_002',
    ngoId: 'ngo_003',
    ngoName: 'Hunger Free Bengaluru',
    donationId: 'don_001',
    foodItems: ['Biryani', 'Dal Makhani'],
    status: 'accepted',
    message: 'We have a shelter with 150 residents.',
    createdAt: '2026-04-15T09:00:00Z',
    beneficiaries: 150,
  },
  {
    id: 'req_003',
    ngoId: 'ngo_002',
    ngoName: 'Asha Community Trust',
    donationId: 'don_005',
    foodItems: ['Paneer Dishes', 'Rice'],
    status: 'pending',
    message: 'We run a mid-day meal program for 300 school children.',
    createdAt: '2026-04-15T15:00:00Z',
    beneficiaries: 300,
  },
];

// Mock Volunteer Requests
export const MOCK_VOLUNTEER_REQUESTS: VolunteerRequest[] = [
  {
    id: 'volreq_001',
    ngoId: 'ngo_001',
    ngoName: 'Feed India Foundation',
    donationId: 'don_002',
    pickupAddress: '18, Indiranagar, Bengaluru',
    dropAddress: '15, Gandhi Nagar, Bengaluru',
    pickupCoords: { lat: 12.9784, lng: 77.6408 },
    dropCoords: { lat: 12.9698, lng: 77.5738 },
    status: 'pending',
    estimatedDistance: '7.2 km',
    estimatedTime: '25 min',
    createdAt: '2026-04-14T19:00:00Z',
  },
  {
    id: 'volreq_002',
    ngoId: 'ngo_003',
    ngoName: 'Hunger Free Bengaluru',
    donationId: 'don_001',
    pickupAddress: '42, MG Road, Bengaluru',
    dropAddress: '23, Shivajinagar, Bengaluru',
    pickupCoords: { lat: 12.9716, lng: 77.5946 },
    dropCoords: { lat: 12.9850, lng: 77.5988 },
    status: 'accepted',
    estimatedDistance: '3.5 km',
    estimatedTime: '15 min',
    createdAt: '2026-04-15T10:00:00Z',
  },
  {
    id: 'volreq_003',
    ngoId: 'ngo_002',
    ngoName: 'Asha Community Trust',
    donationId: 'don_005',
    pickupAddress: '1, MG Road, Bengaluru',
    dropAddress: '45, Rajajinagar, Bengaluru',
    pickupCoords: { lat: 12.9756, lng: 77.6097 },
    dropCoords: { lat: 12.9897, lng: 77.5509 },
    status: 'pending',
    estimatedDistance: '9.8 km',
    estimatedTime: '35 min',
    createdAt: '2026-04-15T15:30:00Z',
  },
];

export const FOOD_CATEGORIES = [
  'All', 'Cooked Food', 'Groceries', 'Bakery', 'Dairy', 'Fruits & Veggies', 'Packaged',
];

export const getUrgencyColor = (urgency: UrgencyLevel) => {
  switch (urgency) {
    case 'high': return { bg: '#FFEBEE', text: '#C62828', border: '#FFCDD2' };
    case 'medium': return { bg: '#FFF8E1', text: '#E65100', border: '#FFE0B2' };
    case 'low': return { bg: '#E8F5E9', text: '#2E7D32', border: '#C8E6C9' };
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'available': return { bg: '#E8F5E9', text: '#2E7D32' };
    case 'requested': return { bg: '#FFF8E1', text: '#E65100' };
    case 'accepted': return { bg: '#E3F2FD', text: '#1565C0' };
    case 'in_transit': return { bg: '#E8EAF6', text: '#283593' };
    case 'delivered': return { bg: '#ECEFF1', text: '#455A64' };
    case 'pending': return { bg: '#FFF8E1', text: '#E65100' };
    case 'completed': return { bg: '#E8F5E9', text: '#2E7D32' };
    case 'rejected': return { bg: '#FFEBEE', text: '#C62828' };
    default: return { bg: '#F5F5F5', text: '#616161' };
  }
};

export const getDaysUntilExpiry = (expiryDate: string): number => {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const diff = expiry.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const AI_ROUTE_TIPS = [
  'Take NH-48 to avoid morning peak traffic — saves 12 min.',
  'Outer Ring Road is clear now. Estimated 22% fuel savings on this route.',
  'Weather advisory: Light rain expected. Add 5-10 min buffer.',
  'Optimal window: 10 AM – 12 PM for this route (low congestion).',
  'Combine stops: Donor A and Donor B are 800m apart — efficient pickup!',
  'Carbon saved this delivery: ~1.2 kg CO2 vs standard routing.',
];
