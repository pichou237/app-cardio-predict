
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { User, Lock, Shield } from "lucide-react";

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@exemple.com",
    phone: "06 12 34 56 78",
    birthdate: "1980-01-01",
    address: "123 Rue de Paris, 75001 Paris",
    profilePicture: ""
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profil mis à jour avec succès !");
    setIsEditing(false);
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mot de passe changé avec succès !");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={true} />
      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              {user.profilePicture ? (
                <AvatarImage src={user.profilePicture} alt={user.name} />
              ) : (
                <AvatarFallback className="text-xl">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">Gérez votre profil et vos informations personnelles</p>
            </div>
          </div>
          
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-3">
              <TabsTrigger value="profile">
                <User className="mr-2 h-4 w-4" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="mr-2 h-4 w-4" />
                Sécurité
              </TabsTrigger>
              <TabsTrigger value="history">
                <Shield className="mr-2 h-4 w-4" />
                Historique
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input 
                          id="name" 
                          value={user.name}
                          disabled={!isEditing}
                          onChange={(e) => setUser({...user, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={user.email}
                          disabled={!isEditing}
                          onChange={(e) => setUser({...user, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input 
                          id="phone" 
                          value={user.phone}
                          disabled={!isEditing}
                          onChange={(e) => setUser({...user, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthdate">Date de naissance</Label>
                        <Input 
                          id="birthdate" 
                          type="date" 
                          value={user.birthdate}
                          disabled={!isEditing}
                          onChange={(e) => setUser({...user, birthdate: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input 
                          id="address" 
                          value={user.address}
                          disabled={!isEditing}
                          onChange={(e) => setUser({...user, address: e.target.value})}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Annuler</Button>
                      <Button onClick={handleSaveProfile}>Enregistrer</Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Modifier</Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Changement de mot de passe</CardTitle>
                  <CardDescription>Mettez à jour votre mot de passe pour sécuriser votre compte</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange}>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Mot de passe actuel</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nouveau mot de passe</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button onClick={handlePasswordChange}>Changer le mot de passe</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des prédictions</CardTitle>
                  <CardDescription>Vos analyses précédentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Vous n'avez pas encore d'analyses enregistrées.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/prediction">Nouvelle analyse</a>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
