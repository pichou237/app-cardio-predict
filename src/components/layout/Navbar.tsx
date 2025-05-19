import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeartPulse, LogOut } from "lucide-react";
import { toast } from "sonner";

interface NavbarProps {
  isAuthenticated?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated: propIsAuthenticated = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(propIsAuthenticated);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const role = localStorage.getItem("userRole");
    setIsAuthenticated(authStatus);
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserRole(null);
    
    // Redirect to home
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  // If user is authenticated and trying to access homepage, redirect to appropriate dashboard
  useEffect(() => {
    if (isAuthenticated && location.pathname === "/") {
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/prediction");
      }
    }
  }, [isAuthenticated, location.pathname, navigate, userRole]);

  return (
    <header className="border-b bg-background shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to={isAuthenticated ? (userRole === "admin" ? "/admin" : "/prediction") : "/"} className="flex items-center text-xl font-bold text-primary">
              <HeartPulse className="h-6 w-6 mr-2 text-primary" />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CardioPredict</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-4">
            {!isAuthenticated && (
              <Link to="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Fonctionnalités
              </Link>
            )}
            
            {isAuthenticated && (
              userRole === "admin" ? (
                // Admin navigation
                <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary">
                  Tableau de bord admin
                </Link>
              ) : (
                // User navigation - removed dashboard link
                <>
                  <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary">
                    Tableau de bord 
                  </Link>
                  <Link to="/prediction" className="text-sm font-medium text-muted-foreground hover:text-primary">
                    Nouvelle prédiction
                  </Link>
                  <Link to="/profile" className="text-sm font-medium text-muted-foreground hover:text-primary">
                    Mon profil
                  </Link>
                </>
              )
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Button variant="outline" onClick={handleLogout} className="border-primary text-primary hover:bg-primary/10">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
                  <Link to="/login">Se connecter</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link to="/register">S'inscrire</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
