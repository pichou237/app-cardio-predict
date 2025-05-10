
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart3, Users, TrendingUp } from "lucide-react";

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

const recentUsersData = [
  { id: 1, name: "Sophie Martin", email: "sophie.martin@exemple.com", date: "10/05/2025" },
  { id: 2, name: "Thomas Bernard", email: "thomas.bernard@exemple.com", date: "09/05/2025" },
  { id: 3, name: "Camille Dubois", email: "camille.dubois@exemple.com", date: "08/05/2025" },
  { id: 4, name: "Lucas Petit", email: "lucas.petit@exemple.com", date: "07/05/2025" },
  { id: 5, name: "Emma Leroy", email: "emma.leroy@exemple.com", date: "06/05/2025" },
];

const AdminPage: React.FC = () => {
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
                <div className="text-2xl font-bold">988</div>
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
                <div className="text-2xl font-bold">1,450</div>
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
                <CardHeader>
                  <CardTitle>Utilisateurs récents</CardTitle>
                  <CardDescription>Liste des derniers utilisateurs enregistrés</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date d'inscription</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsersData.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableCaption>Liste des 5 derniers utilisateurs inscrits.</TableCaption>
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
                      <TableRow>
                        <TableCell className="font-medium">1</TableCell>
                        <TableCell>Sophie Martin</TableCell>
                        <TableCell>10/05/2025</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Faible</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">2</TableCell>
                        <TableCell>Thomas Bernard</TableCell>
                        <TableCell>09/05/2025</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Modéré</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">3</TableCell>
                        <TableCell>Camille Dubois</TableCell>
                        <TableCell>08/05/2025</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Élevé</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">4</TableCell>
                        <TableCell>Lucas Petit</TableCell>
                        <TableCell>07/05/2025</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Faible</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">5</TableCell>
                        <TableCell>Emma Leroy</TableCell>
                        <TableCell>06/05/2025</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Modéré</span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <TableCaption>Liste des 5 dernières prédictions.</TableCaption>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
