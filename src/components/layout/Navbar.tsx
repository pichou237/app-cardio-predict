
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";

interface NavbarProps {
  isAuthenticated?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated = false }) => {
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
              <>
                <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Tableau de bord
                </Link>
                <Link to="/prediction" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Nouvelle prédiction
                </Link>
              </>
            ) : (
              <Link to="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Fonctionnalités
              </Link>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Button variant="outline" onClick={() => console.log("Déconnexion")}>
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
