"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: "user" | "seller";
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("devora_mock_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("devora_mock_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email && password) {
      const mockUser: User = {
        id: "1",
        username: email.split("@")[0] || "NeuralNinja",
        email: email,
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        role: "user"
      };
      
      setUser(mockUser);
      localStorage.setItem("devora_mock_user", JSON.stringify(mockUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("devora_mock_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
