import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface NavigationContextType {
  allowed: boolean;
  enableNavigation: () => void;
  disableNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [allowed, setAllowed] = useState<boolean>(
    () => JSON.parse(localStorage.getItem("allowed") || "false")
  );
  useEffect(() => {
    const savedAllowed = JSON.parse(localStorage.getItem("allowed") || "false");
    setAllowed(savedAllowed);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("allowed", JSON.stringify(allowed));
  }, [allowed]);

  const enableNavigation = () => setAllowed(true);
  const disableNavigation = () => {
    setAllowed(false);
    localStorage.removeItem("allowed");
  };

  return (
    <NavigationContext.Provider value={{ allowed, enableNavigation, disableNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationControl = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigationControl must be used within a NavigationProvider");
  }
  return context;
};
