import { createContext } from "react";

interface AuthProvider {
  accessToken: string;
  refreshToken?: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  login(username: string, password: string): Promise<boolean>;
  logout(): void;
  isAdmin: boolean;
}

export const TokenContext = createContext<AuthProvider>({
  accessToken: "",
  refreshToken: undefined,
  isAuthenticated: false,
  isLoading: false,
  login: async (username: string, password: string) => {
    // Default implementation, can be replaced with actual logic
    console.log(
      `Logging in with username: ${username} and password: ${password}`
    );
    return false;
  },
  logout: () => {
    // Default implementation, can be replaced with actual logic
    console.log("Logging out");
  },
  isAdmin: false
});
