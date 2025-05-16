
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatisticsService } from "@/services/statistics-service";

const StatisticsDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [predictionStats, setPredictionStats] = useState({
    totalPredictions: 0,
    monthlyPredictions: 0,
    dailyPredictions: 0,
    averageRisk: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Fetch user statistics
        const users = await StatisticsService.getTotalUsers();
        setTotalUsers(users);

        // Fetch prediction statistics
        const predictions = await StatisticsService.getPredictionStats();
        setPredictionStats(predictions);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold">Statistiques</h2>
      
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-5 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Utilisateurs Inscrits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {totalUsers > 100 ? "Communauté active" : "Communauté en croissance"}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Prédictions Totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{predictionStats.totalPredictions}</div>
              <p className="text-xs text-muted-foreground">
                Analyses effectuées depuis le lancement
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Prédictions ce mois
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{predictionStats.monthlyPredictions}</div>
              <div className="mt-2">
                <Progress value={Math.min((predictionStats.monthlyPredictions / 100) * 100, 100)} className="h-2" />
              </div>
              <p className="text-xs mt-1 text-muted-foreground">
                {predictionStats.dailyPredictions} aujourd'hui
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Risque Moyen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{predictionStats.averageRisk}%</div>
              <div className="mt-2">
                <Progress 
                  value={predictionStats.averageRisk} 
                  className={`h-2 ${predictionStats.averageRisk > 50 ? "bg-red-500" : "bg-amber-500"}`} 
                />
              </div>
              <p className="text-xs mt-1 text-muted-foreground">
                Moyenne des prédictions
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StatisticsDashboard;
