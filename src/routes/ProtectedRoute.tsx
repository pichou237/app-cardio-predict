
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // Check authentication from localStorage
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");
    
    setIsAuthenticated(authStatus);
    
    // Check role-based access if required
    if (requiredRole) {
      setHasAccess(authStatus && userRole === requiredRole);
    } else {
      setHasAccess(authStatus);
    }
    
    setIsLoading(false);
  }, [requiredRole]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  if (!isAuthenticated) {
    toast.error("Vous devez être connecté pour accéder à cette page");
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && !hasAccess) {
    toast.error("Vous n'avez pas les droits pour accéder à cette page");
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
