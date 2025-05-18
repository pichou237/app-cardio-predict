
import { API_ENDPOINTS, getAuthHeaders } from "./api-config";

// Interface for user statistics
export interface UserStats {
  totalUsers: number;
}

// Interface for prediction statistics
export interface PredictionStats {
  totalPredictions: number;
  monthlyPredictions: number;
  dailyPredictions: number;
  averageRisk: number;
}

// Service for statistics
export const StatisticsService = {
  // Get total users
  getTotalUsers: async (): Promise<number> => {
    try {
      const response = await fetch(API_ENDPOINTS.STATS_USERS_TOTAL, {
        method: "GET",
        headers: getAuthHeaders(false),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du nombre d'utilisateurs.");
      }

      const data = await response.json();
      return data.total_users;
    } catch (error) {
      console.error("Erreur de récupération des statistiques utilisateurs:", error);
      // Return mock data when API is unavailable
      return 128;
    }
  },

  // Get total users
  getAllUsers: async (): Promise<number> => {
    try {
      const response = await fetch(API_ENDPOINTS.PUBLIC_USERS, {
        method: "GET",
        headers: getAuthHeaders(false),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du nombre d'utilisateurs.");
      }

      const data = await response.json();
      console.log("data:",data.users)
      return data.users;
    } catch (error) {
      console.error("Erreur de récupération de la liste d'utilisateurs:", error);
      // Return mock data when API is unavailable
      return 128;
    }
  },

  // Get prediction statistics
  getPredictionStats: async (): Promise<PredictionStats> => {
    try {
      // Get total predictions
      const totalResponse = await fetch(API_ENDPOINTS.STATS_PREDICTIONS_TOTAL, {
        method: "GET",
        headers: getAuthHeaders(false),
      });

      // Get monthly predictions
      const monthlyResponse = await fetch(API_ENDPOINTS.STATS_PREDICTIONS_MONTHLY, {
        method: "GET",
        headers: getAuthHeaders(false),
      });

      // Get daily predictions
      const dailyResponse = await fetch(API_ENDPOINTS.STATS_PREDICTIONS_DAILY, {
        method: "GET",
        headers: getAuthHeaders(false),
      });

      // Get average risk
      const riskResponse = await fetch(API_ENDPOINTS.STATS_RISK_AVERAGE, {
        method: "GET",
        headers: getAuthHeaders(false),
      });

      if (!totalResponse.ok || !monthlyResponse.ok || !dailyResponse.ok || !riskResponse.ok) {
        throw new Error("Erreur lors de la récupération des statistiques de prédictions.");
      }

      const totalData = await totalResponse.json();
      const monthlyData = await monthlyResponse.json();
      const dailyData = await dailyResponse.json();
      const riskData = await riskResponse.json();


      return {
        totalPredictions: totalData.total_predictions,
        monthlyPredictions: monthlyData.monthly_predictions,
        dailyPredictions: dailyData.daily_predictions,
        averageRisk: riskData.average_risk,
      };
    } catch (error) {
      console.error("Erreur de récupération des statistiques de prédictions:", error);
      // Return mock data when API is unavailable
      return {
        totalPredictions: 1245,
        monthlyPredictions: 87,
        dailyPredictions: 12,
        averageRisk: 32.5,
      };
    }
  },
};
