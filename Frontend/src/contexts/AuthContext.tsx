import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import api from "../services/api";

export interface AuthUser {
  name: string;
  isAccountVerified: boolean;
}

interface ApiResponse<T> {
  status: number;
  resultObj: T;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  refreshSession: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const sessionResponse = await api.get<ApiResponse<{ authenticated: boolean }>>("/auth/is-auth");
      if (sessionResponse.data.status !== 1 || !sessionResponse.data.resultObj?.authenticated) {
        setUser(null);
        return false;
      }

      const userResponse = await api.get<ApiResponse<AuthUser>>("/user/data");
      if (userResponse.data.status !== 1 || !userResponse.data.resultObj?.name) {
        setUser(null);
        return false;
      }

      setUser(userResponse.data.resultObj);
      return true;
    } catch {
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Clear local auth state even if the API is unavailable; protected pages will redirect.
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error: unknown) => {
        if (
          typeof error === "object" && error !== null &&
          "response" in error &&
          (error as { response?: { status?: number } }).response?.status === 401 &&
          !("config" in error && (error as { config?: { url?: string } }).config?.url?.includes("/auth/login"))
        ) {
          setUser(null);
        }
        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(interceptorId);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
