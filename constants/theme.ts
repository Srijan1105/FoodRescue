// Powered by OnSpace.AI
export const Colors = {
  // Brand
  primary: '#0D9B76',
  primaryDark: '#0A7A5C',
  primaryLight: '#E6F7F2',
  accent: '#00C896',
  accentLight: '#CCFAEF',

  // Roles
  donor: '#2E7D32',
  donorLight: '#E8F5E9',
  ngo: '#1565C0',
  ngoLight: '#E3F2FD',
  volunteer: '#E65100',
  volunteerLight: '#FFF3E0',

  // Urgency
  urgent: '#E53935',
  urgentLight: '#FFEBEE',
  warning: '#F57C00',
  warningLight: '#FFF8E1',
  success: '#2E7D32',
  successLight: '#E8F5E9',

  // Neutrals
  background: '#F5FAF8',
  surface: '#FFFFFF',
  surfaceAlt: '#F0F7F4',
  border: '#D0E8DF',
  borderLight: '#E8F3EF',

  // Text
  textPrimary: '#1A2E25',
  textSecondary: '#4A6358',
  textMuted: '#8AA89C',
  textInverse: '#FFFFFF',

  // Status
  pending: '#F57C00',
  active: '#0D9B76',
  completed: '#455A64',
  cancelled: '#E53935',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  hero: 30,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const Shadow = {
  sm: {
    shadowColor: '#0D9B76',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#0A3D2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0A3D2E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
};
