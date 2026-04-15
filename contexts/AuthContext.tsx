// Powered by OnSpace.AI
import React, { createContext, useState, ReactNode } from 'react';
import { MOCK_USERS, User, UserRole } from '@/services/mockData';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (role: UserRole, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  selectedRole: UserRole | null;
  setSelectedRole: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const login = async (role: UserRole, email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockUser = MOCK_USERS[role];
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setSelectedRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        login,
        logout,
        selectedRole,
        setSelectedRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
