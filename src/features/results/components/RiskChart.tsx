
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface RiskChartProps {
  riskScore: number;
}

const RiskChart: React.FC<RiskChartProps> = ({ riskScore }) => {
  // Assurer que le riskScore est entre 0 et 1
  const normalizedRiskScore = Math.min(1, Math.max(0, riskScore));
  
  const data = [
    { name: "Risque", value: normalizedRiskScore },
    { name: "Sécurité", value: 1 - normalizedRiskScore },
  ];

  // Couleurs pour les segments
  const COLORS = ["#ef4444", "#22c55e"];

  // Détermine le niveau de risque
  const getRiskLevel = (score: number) => {
    if (score < 0.3) return "Faible";
    if (score < 0.6) return "Modéré";
    return "Élevé";
  };

  return (
    <div className="w-full h-96 bg-white rounded-lg p-4 border">
      <h3 className="text-xl font-semibold mb-4 text-center">Niveau de risque cardiaque</h3>
      <div className="text-center mb-6">
        <span className="text-4xl font-bold">{(normalizedRiskScore * 100).toFixed(1)}%</span>
        <p className="text-lg font-medium text-muted-foreground">
          Risque {getRiskLevel(normalizedRiskScore)}
        </p>
      </div>
      <ResponsiveContainer width="100%" height="60%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${(Number(value) * 100).toFixed(1)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskChart;
