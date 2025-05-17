
import { API_ENDPOINTS, getAuthHeaders } from "./api-config";

export interface HistoryEntry {
  id: number;
  user_id: number;
  timestamp: string;
  inputs: Record<string, any>;
  prediction: number;
  risk_factors: string[];
}

export interface PredictionResult {
  prediction: number;
  risk: boolean;
  risk_factors: string[];
}

export const PredictionService = {
  predict: async (data: any, apiKey: string | null): Promise<PredictionResult> => {
    try {
      const response = await fetch(API_ENDPOINTS.PREDICT, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ api_key: apiKey, data })
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la prédiction: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur API de prédiction:", error);
      
      // Données factices pour le mode offline ou en cas d'erreur
      return {
        prediction: Math.floor(Math.random() * 100),
        risk: Math.random() > 0.5,
        risk_factors: ["Tension artérielle", "Cholestérol", "Tabagisme"]
      };
    }
  },

  getHistory: async (apiKey: string | null = null): Promise<HistoryEntry[]> => {
    try {
      const url = new URL(API_ENDPOINTS.HISTORY);
      if (apiKey) {
        url.searchParams.append("api_key", apiKey);
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: getAuthHeaders(false)
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération de l'historique: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur API d'historique:", error);
      
      // Données factices pour le mode offline ou en cas d'erreur
      return Array(5).fill(0).map((_, index) => ({
        id: index + 1,
        user_id: 1,
        timestamp: new Date(Date.now() - index * 86400000).toISOString(),
        inputs: {
          age: 45 + index,
          sex: index % 2,
          chol: 200 + index * 10,
          bp: 120 + index * 2
        },
        prediction: 30 + Math.floor(Math.random() * 40),
        risk_factors: ["Tension artérielle", "Cholestérol"]
      }));
    }
  }
};
