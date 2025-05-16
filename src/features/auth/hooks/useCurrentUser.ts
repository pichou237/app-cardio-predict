
import { useState, useEffect } from "react";

interface User {
  username: string;
  role: string;
  isAuthenticated: boolean;
  isOfflineMode: boolean;
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<User>({
    username: "",
    role: "user",
    isAuthenticated: false,
    isOfflineMode: false
  });

  useEffect(() => {
    // Get user data from localStorage
    const username = localStorage.getItem("userEmail") || localStorage.getItem("username") || "";
    const role = localStorage.getItem("userRole") || "user";
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const isOfflineMode = localStorage.getItem("isOfflineMode") === "true";

    setUser({
      username,
      role,
      isAuthenticated,
      isOfflineMode
    });
  }, []);

  return user;
};
