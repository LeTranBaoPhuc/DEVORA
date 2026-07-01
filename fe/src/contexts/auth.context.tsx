"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authApi } from "@/apis/auth.api";
import { userApi } from "@/apis/user.api";
import { toast } from "sonner";

import { User } from "@/types";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<User | boolean>;
  loginWithGoogle: (token: string) => Promise<User | boolean>;
  register: (data: any) => Promise<boolean>;
  verifyRegister: (email: string, otp: string) => Promise<boolean>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (): Promise<User | null> => {
    try {
      const response = await userApi.getProfile();
      if (response && response.data) {
        setUser(response.data);
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch profile", error);
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<User | boolean> => {
    try {
      // The backend LoginRequest accepts username or email and password
      const response = await authApi.login({ email, password });
      
      if (response && response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        if (response.refreshToken) {
          localStorage.setItem("refreshToken", response.refreshToken);
        }
        const user = await fetchProfile();
        return user || true;
      }
      return false;
    } catch (error: any) {
      throw error;
    }
  };

  const loginWithGoogle = async (token: string): Promise<User | boolean> => {
    try {
      const response = await authApi.googleLogin({ token });
      if (response && response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        if (response.refreshToken) {
          localStorage.setItem("refreshToken", response.refreshToken);
        }
        const user = await fetchProfile();
        return user || true;
      }
      return false;
    } catch (error: any) {
      throw error;
    }
  };

  const register = async (data: any): Promise<boolean> => {
    try {
      const response = await authApi.register(data);
      if (response && response.status === 200) {
        toast.success(response.message || "Registration successful");
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Register error", error);
      toast.error(error.message || "Registration failed");
      return false;
    }
  };

  const verifyRegister = async (email: string, otp: string): Promise<boolean> => {
    try {
      const response = await authApi.verifyRegister(email, otp);
      if (response && response.status === 200) {
        toast.success(response.message || "Email verified successfully");
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Verify register error", error);
      toast.error(error.message || "Verification failed");
      return false;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await authApi.logout();
      }
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, register, verifyRegister, logout, refreshProfile: fetchProfile, isLoading }}>
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
