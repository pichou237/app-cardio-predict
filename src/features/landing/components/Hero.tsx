
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Prévention des maladies cardiaques par l'IA
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Notre outil de prédiction utilise l'intelligence artificielle pour évaluer vos risques de maladies cardiaques
            à partir de vos données médicales et vous fournir des analyses personnalisées.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link to="/register">Commencer maintenant</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/login">Se connecter</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
