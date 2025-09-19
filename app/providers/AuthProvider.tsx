import LoadingScreen from "@/components/LoadingScreen";
import { UserType } from "@/constants/data";
import { Storage } from "@/services/SecureStore";
import { DecodeAuth } from "@/utils/tokenDecode";
import React, { useEffect, useMemo, useState } from "react";
import { AuthContext } from "../hooks/AuthContext";

interface ProviderType {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<ProviderType> = ({ children }) => {
  const [user_id, setUser_id] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user_type, setUser_type] = useState<UserType | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // const storedToken = await Storage.getValueFor("authToken");
        const storedToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVpZCI6MjEsInVzZXJfdHlwZSI6ImN1c3RvbWVyIn0sImV4cCI6MTc1ODkyMzkxNS4zMDE5ODJ9.6SPFxAaQeg83P4iK4zqc4X16Vgw7lEpam6EXCSFy6yE";
        if (storedToken) {
          const decoded = DecodeAuth(storedToken);
          setUser_id(decoded.uid);
          setUser_type(decoded.user_type);
          console.log(
            `token: ${storedToken} decoded: ${
              decoded.uid
            }, isAuth: ${!!decoded.uid})`
          );
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Failed to load token from store:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const authContextValue = useMemo(() => {
    const login = async (newToken: string) => {
      const decoded = DecodeAuth(newToken);
      // Log before state updates
      console.log("AuthProvider: login function called with token:", newToken);
      console.log("AuthProvider: Decoded user ID:", decoded.uid);
      setUser_id(decoded.uid);
      setUser_type(decoded.user_type);
      setToken(newToken);
      await Storage.save("authToken", newToken);

      // Log after state updates are triggered
      console.log("AuthProvider: State setters called.");
    };
    const logout = async () => {
      await Storage.deleteValue("authToken");
      setUser_id(null);
      setUser_type(null);
      setToken(null);
    };

    // Log the values that are being returned
    console.log("AuthProvider: Recalculating authContextValue.");
    console.log("AuthProvider: current isAuth value:", !!user_id);
    console.log("AuthProvider: current loading value:", loading);

    return {
      user_id,
      user_type,
      token,
      isAuth: !!user_id,
      login,
      logout,
      loading,
    };
  }, [user_id, user_type, token]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
