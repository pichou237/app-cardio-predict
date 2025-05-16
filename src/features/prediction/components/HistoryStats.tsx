
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useHistoryStats } from "../hooks/useHistoryStats";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const HistoryStats: React.FC = () => {
  const { monthlyStats, riskDistribution, isLoading, error } = useHistoryStats();

  const pieData = [
    { name: "Risque faible", value: riskDistribution.lowRisk, color: "#22c55e" },
    { name: "Risque moyen", value: riskDistribution.mediumRisk, color: "#f59e0b" },
    { name: "Risque élevé", value: riskDistribution.highRisk, color: "#ef4444" },
  ].filter((item) => item.value > 0);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Statistiques d'historique</CardTitle>
          <CardDescription>Chargement des données...</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Statistiques d'historique</CardTitle>
          <CardDescription>Impossible de charger les données</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (monthlyStats.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Statistiques d'historique</CardTitle>
          <CardDescription>Vos statistiques d'analyse cardiaque</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex flex-col items-center justify-center">
          <p className="text-muted-foreground text-center mb-4">
            Pas encore de données disponibles
          </p>
          <p className="text-sm text-center">
            Commencez à utiliser l'outil de prédiction pour voir vos statistiques
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Analyses mensuelles</CardTitle>
          <CardDescription>Nombre d'analyses par mois</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyStats}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Distribution des risques</CardTitle>
          <CardDescription>Répartition des niveaux de risque</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryStats;
