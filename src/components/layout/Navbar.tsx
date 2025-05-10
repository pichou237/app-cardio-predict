import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  return (
    <header className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-xl font-bold text-primary">
              <HeartPulse className="h-6 w-6 mr-2" />
              CardioPredict
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Accueil
            </Link>
            
            {isAuthenticated ? (
              userRole === "admin" ? (
                // Admin navigation
                <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Tableau de bord admin
                </Link>
              ) : (
                // User navigation
                <>
                  <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                    Tableau de bord
                  </Link>
                  <Link to="/prediction" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                    Nouvelle prédiction
                  </Link>
                  <Link to="/profile" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                    Mon profil
                  </Link>
                </>
              )
            ) : (
              <Link to="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Fonctionnalités
              </Link>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Se connecter</Link>
                </Button>
                <Button asChild>
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
