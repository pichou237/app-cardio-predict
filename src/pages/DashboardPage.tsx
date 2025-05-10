
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const DashboardPage: React.FC = () => {
  // Simulation de connexion admin
  const isAdmin = true; // En production, cela serait déterminé par le rôle de l'utilisateur

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={true} />
      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">Bienvenue sur votre tableau de bord CardioPredict</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Nouvelle analyse</CardTitle>
                <CardDescription>Effectuez une nouvelle prédiction de risque cardiaque</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Remplissez le formulaire avec vos données médicales pour obtenir une analyse personnalisée.</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/prediction">Commencer une analyse</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Historique</CardTitle>
                <CardDescription>Consultez vos analyses précédentes</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Vous n'avez pas encore d'analyses enregistrées.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  Voir l'historique
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Profil médical</CardTitle>
                <CardDescription>Gérez vos informations médicales</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Complétez votre profil médical pour des analyses plus précises.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/profile">Gérer mon profil</Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Carte Admin uniquement visible pour les administrateurs */}
            {isAdmin && (
              <Card className="lg:col-span-3 bg-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle>Administration</CardTitle>
                  <CardDescription>Accédez au tableau de bord administrateur</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>En tant qu'administrateur, vous pouvez accéder aux statistiques et à la gestion des utilisateurs.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/admin">Tableau de bord administrateur</Link>
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
