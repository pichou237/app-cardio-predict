
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
import { User, Lock, Shield, Clock } from "lucide-react";
import { AuthService } from "@/services/auth-service";
import { usePredictionHistory } from "@/features/prediction/hooks/usePredictionHistory";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: localStorage.getItem("username") || "Utilisateur",
    email: localStorage.getItem("userEmail") || "",
    phone: "06 12 34 56 78",
    birthdate: "1980-01-01",
    address: "123 Rue de Paris, 75001 Paris",
    profilePicture: ""
  });

  const { history, isLoading: isLoadingHistory } = usePredictionHistory();

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const currentUsername = localStorage.getItem("username");
      const apiKey = localStorage.getItem("api_key");
      
      if (currentUsername && apiKey && user.name !== currentUsername) {
        await AuthService.updateUser(currentUsername, {
          api_key: apiKey,
          new_username: user.name
        });
      }
      
      toast.success("Profil mis à jour avec succès !");
      setIsEditing(false);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil");
      console.error("Erreur de mise à jour:", error);
    }
  };
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Récupérer les valeurs des champs de mot de passe
    const currentPasswordEl = document.getElementById("current-password") as HTMLInputElement;
    const newPasswordEl = document.getElementById("new-password") as HTMLInputElement;
    const confirmPasswordEl = document.getElementById("confirm-password") as HTMLInputElement;
    
    if (!currentPasswordEl || !newPasswordEl || !confirmPasswordEl) return;
    
    const currentPassword = currentPasswordEl.value;
    const newPassword = newPasswordEl.value;
    const confirmPassword = confirmPasswordEl.value;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    
    try {
      const username = localStorage.getItem("username");
      const apiKey = localStorage.getItem("api_key");
      
      if (username && apiKey) {
        await AuthService.updateUser(username, {
          api_key: apiKey,
          new_password: newPassword
        });
        
        toast.success("Mot de passe changé avec succès !");
        // Réinitialiser les champs
        currentPasswordEl.value = "";
        newPasswordEl.value = "";
        confirmPasswordEl.value = "";
      } else {
        toast.error("Informations d'authentification manquantes");
      }
    } catch (error) {
      toast.error("Erreur lors du changement de mot de passe");
      console.error("Erreur de changement de mot de passe:", error);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: fr });
    } catch (e) {
      return "Date inconnue";
    }
  };

  const formatRiskLevel = (prediction: number) => {
    const riskPercentage = prediction * 100;
    if (riskPercentage < 30) return "Faible";
    if (riskPercentage < 70) return "Modéré";
    return "Élevé";
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
                <Clock className="mr-2 h-4 w-4" />
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
                        <Label htmlFor="name">Nom d'utilisateur</Label>
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
                  {isLoadingHistory ? (
                    <div className="text-center py-8">
                      <p>Chargement de l'historique...</p>
                    </div>
                  ) : history.length > 0 ? (
                    <div className="divide-y">
                      {history.map((entry, index) => (
                        <div key={index} className="py-4">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <span className="font-medium">Analyse #{history.length - index}</span>
                              <span className="text-sm text-muted-foreground ml-2">
                                {formatDate(entry.timestamp)}
                              </span>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              entry.prediction < 0.3 ? 'bg-green-100 text-green-800' : 
                              entry.prediction < 0.7 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              Risque {formatRiskLevel(entry.prediction)}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Score: {(entry.prediction * 100).toFixed(1)}%
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Vous n'avez pas encore d'analyses enregistrées.</p>
                    </div>
                  )}
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
