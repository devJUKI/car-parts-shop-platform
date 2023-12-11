import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    return Cookies.get("auth_token");
  });

  const [authData, setAuthData] = useState(() => {
    return sessionStorage.getItem("auth_data");
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem("auth_isAdmin");
  });

  useEffect(() => {
    if (accessToken) {
      Cookies.set("auth_token", accessToken, {
        expires: 1 / 24,
      });

      const decoded = jwtDecode(accessToken);
      sessionStorage.setItem("auth_isAdmin", decoded.CustomRole == "Admin");
      setIsAdmin(decoded.CustomRole == "Admin");

      async function getUserDataWrapper(accessToken) {
        const authData = await getUserData(accessToken);

        if (authData) {
          sessionStorage.setItem("auth_data", authData);
          setAuthData(authData);
        } else {
          Cookies.remove("auth_token");
          setAccessToken(null);
        }
      }

      getUserDataWrapper(accessToken);
    } else {
      sessionStorage.removeItem("auth_data");
      setAuthData(null);
      sessionStorage.setItem("auth_isAdmin", false);
      setIsAdmin(false);
    }
  }, [accessToken]);

  const getUserData = async (accessToken) => {
    try {
      const response = await Axios.get("https://localhost:7119/api/GetUser", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Getting user data failed:", error);
      return null;
    }
  };

  const login = (accessToken) => {
    setAccessToken(accessToken);
  };

  const logout = () => {
    Cookies.remove("auth_token");
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ authData, accessToken, isAdmin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
