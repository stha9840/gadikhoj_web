import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [Loading, setLoading] = useState(true)

  const login = (userData, token) => {
    setLoading(true)
    localStorage.setItem("user", JSON.stringify(userData)); // lowercase 'user' for consistency
    localStorage.setItem("token", token);
    setUser(userData);
    setLoading(false)
  };

  const logout = () => {
    setLoading(true)
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setLoading(false)
  };

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user"); // fixed key

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // fixed typo: JSON.parse
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        logout();
      }
    } else {
      logout();
    }
    setLoading(false)
  }, []);

  return (
    <AuthContext.Provider
      value={{ user,Loading, login, logout, isAuthenticated: user !== null }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export the provider component itself — NOT called here!
export default AuthContextProvider;
