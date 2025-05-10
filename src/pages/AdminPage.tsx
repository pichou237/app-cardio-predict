
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart3, Users, TrendingUp, Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Données fictives pour les graphiques
const usersData = [
  { month: 'Jan', users: 65 },
  { month: 'Fév', users: 78 },
  { month: 'Mar', users: 90 },
  { month: 'Avr', users: 81 },
  { month: 'Mai', users: 156 },
  { month: 'Juin', users: 135 },
  { month: 'Juil', users: 188 },
  { month: 'Août', users: 195 },
];

const predictionData = [
  { month: 'Jan', predictions: 25 },
  { month: 'Fév', predictions: 35 },
  { month: 'Mar', predictions: 45 },
  { month: 'Avr', predictions: 40 },
  { month: 'Mai', predictions: 80 },
  { month: 'Juin', predictions: 65 },
  { month: 'Juil', predictions: 90 },
  { month: 'Août', predictions: 100 },
];

const riskDistributionData = [
  { name: "Risque faible", value: 230, color: "#22c55e" },
  { name: "Risque modéré", value: 130, color: "#eab308" },
  { name: "Risque élevé", value: 90, color: "#ef4444" },
];

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

interface User {
  id: number;
  name: string;
  email: string;
  date: string;
  role: "admin" | "user";
}

// Mock User Data
const initialUsersData: User[] = [
  { id: 1, name: "Sophie Martin", email: "sophie.martin@exemple.com", date: "10/05/2025", role: "user" },
  { id: 2, name: "Thomas Bernard", email: "thomas.bernard@exemple.com", date: "09/05/2025", role: "user" },
  { id: 3, name: "Camille Dubois", email: "camille.dubois@exemple.com", date: "08/05/2025", role: "user" },
  { id: 4, name: "Lucas Petit", email: "lucas.petit@exemple.com", date: "07/05/2025", role: "user" },
  { id: 5, name: "Emma Leroy", email: "emma.leroy@exemple.com", date: "06/05/2025", role: "user" },
  { id: 6, name: "Admin", email: "admin@admin.com", date: "01/01/2025", role: "admin" }
];

// Mock prediction data
interface Prediction {
  id: number;
  userId: number;
  userName: string;
  date: string;
  risk: "Faible" | "Modéré" | "Élevé";
}

const initialPredictionsData: Prediction[] = [
  { id: 1, userId: 1, userName: "Sophie Martin", date: "10/05/2025", risk: "Faible" },
  { id: 2, userId: 2, userName: "Thomas Bernard", date: "09/05/2025", risk: "Modéré" },
  { id: 3, userId: 3, userName: "Camille Dubois", date: "08/05/2025", risk: "Élevé" },
  { id: 4, userId: 4, userName: "Lucas Petit", date: "07/05/2025", risk: "Faible" },
  { id: 5, userId: 5, userName: "Emma Leroy", date: "06/05/2025", risk: "Modéré" }
];

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsersData);
  const [predictions, setPredictions] = useState<Prediction[]>(initialPredictionsData);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    role: "user" as "admin" | "user"
  });

  // Handle user form input change
  const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Open dialog for creating a new user
  const handleAddUser = () => {
    setCurrentUser(null);
    setUserFormData({ name: "", email: "", role: "user" });
    setIsUserDialogOpen(true);
  };

  // Open dialog for editing an existing user
  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setUserFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setIsUserDialogOpen(true);
  };

  // Open dialog for deleting a user
  const handleDeleteUserConfirm = (user: User) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  // Save user (create or update)
  const handleSaveUser = () => {
    if (!userFormData.name || !userFormData.email) {
      toast.error("Tous les champs sont obligatoires");
      return;
    }

    if (currentUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === currentUser.id ? { 
          ...user, 
          name: userFormData.name,
          email: userFormData.email,
          role: userFormData.role
        } : user
      );
      setUsers(updatedUsers);
      toast.success("Utilisateur mis à jour avec succès");
    } else {
      // Create new user
      const newUser: User = {
        id: Math.max(0, ...users.map(u => u.id)) + 1,
        name: userFormData.name,
        email: userFormData.email,
        date: new Date().toLocaleDateString('fr-FR'),
        role: userFormData.role
      };
      setUsers([...users, newUser]);
      toast.success("Utilisateur créé avec succès");
    }
    
    setIsUserDialogOpen(false);
  };

  // Delete user
  const handleDeleteUser = () => {
    if (!currentUser) return;
    
    // Prevent deleting the main admin account
    if (currentUser.email === "admin@admin.com") {
      toast.error("Vous ne pouvez pas supprimer le compte administrateur principal");
      setIsDeleteDialogOpen(false);
      return;
    }
    
    // Filter out the user to delete
    setUsers(users.filter(user => user.id !== currentUser.id));
    // Also remove any predictions associated with this user
    setPredictions(predictions.filter(pred => pred.userId !== currentUser.id));
    
    toast.success("Utilisateur supprimé avec succès");
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={true} />
      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Tableau de bord administrateur</h1>
            <p className="text-muted-foreground">Bienvenue sur le tableau de bord d'administration</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs totaux</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+12%</span> depuis le mois dernier
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Prédictions totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{predictions.length}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+8%</span> depuis le mois dernier
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Risque moyen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">26%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500">+2%</span> depuis le mois dernier
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Prédictions aujourd'hui</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+3</span> par rapport à hier
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="stats">
            <TabsList className="grid w-full grid-cols-3 mb-6 md:w-auto md:inline-flex">
              <TabsTrigger value="stats">
                <BarChart3 className="mr-2 h-4 w-4" />
                Statistiques
              </TabsTrigger>
              <TabsTrigger value="users">
                <Users className="mr-2 h-4 w-4" />
                Utilisateurs
              </TabsTrigger>
              <TabsTrigger value="predictions">
                <TrendingUp className="mr-2 h-4 w-4" />
                Prédictions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nouveaux utilisateurs</CardTitle>
                    <CardDescription>Évolution mensuelle des inscriptions</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          users: { color: "#7E69AB" },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={usersData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip
                              content={<ChartTooltipContent />}
                            />
                            <Legend />
                            <Bar dataKey="users" name="Utilisateurs" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Prédictions effectuées</CardTitle>
                    <CardDescription>Évolution mensuelle des analyses</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          predictions: { color: "#1EAEDB" },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={predictionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip
                              content={<ChartTooltipContent />}
                            />
                            <Legend />
                            <Bar dataKey="predictions" name="Prédictions" fill="var(--color-predictions)" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Distribution des risques</CardTitle>
                    <CardDescription>Répartition des niveaux de risque détectés</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={riskDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {riskDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} personnes`, null]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Gestion des utilisateurs</CardTitle>
                    <CardDescription>Liste des utilisateurs enregistrés</CardDescription>
                  </div>
                  <Button onClick={handleAddUser} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date d'inscription</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.date}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.role === 'admin' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role === 'admin' ? 'Admin' : 'Utilisateur'}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleDeleteUserConfirm(user)}
                                disabled={user.email === 'admin@admin.com'}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableCaption>Liste des utilisateurs inscrits sur la plateforme.</TableCaption>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="predictions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prédictions récentes</CardTitle>
                  <CardDescription>Liste des dernières analyses effectuées</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Risque</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {predictions.map((prediction) => (
                        <TableRow key={prediction.id}>
                          <TableCell className="font-medium">{prediction.id}</TableCell>
                          <TableCell>{prediction.userName}</TableCell>
                          <TableCell>{prediction.date}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              prediction.risk === 'Faible'
                                ? 'bg-green-100 text-green-800'
                                : prediction.risk === 'Modéré'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {prediction.risk}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableCaption>Liste des prédictions effectuées.</TableCaption>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* User Dialog for Create/Edit */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentUser ? "Modifier l'utilisateur" : "Créer un utilisateur"}</DialogTitle>
            <DialogDescription>
              {currentUser 
                ? "Modifier les informations de l'utilisateur." 
                : "Ajouter un nouvel utilisateur à la plateforme."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                name="name"
                value={userFormData.name}
                onChange={handleUserFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={userFormData.email}
                onChange={handleUserFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Rôle
              </Label>
              <div className="col-span-3 flex gap-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="user-role"
                    name="role"
                    value="user"
                    checked={userFormData.role === "user"}
                    onChange={() => setUserFormData({ ...userFormData, role: "user" })}
                    className="mr-2"
                  />
                  <Label htmlFor="user-role">Utilisateur</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="admin-role"
                    name="role"
                    value="admin"
                    checked={userFormData.role === "admin"}
                    onChange={() => setUserFormData({ ...userFormData, role: "admin" })}
                    className="mr-2"
                  />
                  <Label htmlFor="admin-role">Admin</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleSaveUser}>
              {currentUser ? "Mettre à jour" : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
