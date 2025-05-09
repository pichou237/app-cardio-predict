
import React from "react";
import { HeartPulse } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="mx-auto max-w-7xl px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex items-center justify-center space-x-6 md:order-2">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Confidentialité
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Conditions d'utilisation
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex items-center justify-center md:justify-start">
            <HeartPulse className="h-5 w-5 text-primary mr-2" />
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CardioPredict. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
