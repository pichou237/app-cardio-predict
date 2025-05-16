
import { API_ENDPOINTS, getAuthHeaders, getApiKey } from "./api-config";

// Interface pour les données de prédiction
export interface PredictionData {
  api_key: string;
  data: number[];
}

// Interface pour la réponse de prédiction
export interface PredictionResponse {
  prediction: number;
  risk: boolean;
  timestamp: string;
}

// Interface pour les entrées d'historique
export interface HistoryEntry {
  input_data: number[];
  prediction: number;
  timestamp: string;
}

// Interface pour la réponse d'historique
export interface HistoryResponse {
  history: HistoryEntry[];
}

// Service de prédiction
export const PredictionService = {
  // Effectuer une prédiction
  predict: async (features: number[]): Promise<PredictionResponse> => {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error("Utilisateur non authentifié.");
    }

    try {
      const predictionData: PredictionData = {
        api_key: apiKey,
        data: features,
      };

      const response = await fetch(API_ENDPOINTS.PREDICT, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(predictionData),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Données de prédiction invalides ou incomplètes.");
        } else {
          throw new Error("Erreur lors de la prédiction.");
        }
      }

      return await response.json() as PredictionResponse;
    } catch (error) {
      console.error("Erreur de prédiction:", error);
      throw error;
    }
  },

  // Obtenir l'historique des prédictions
  getHistory: async (): Promise<HistoryEntry[]> => {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error("Utilisateur non authentifié.");
    }

    try {
      const url = `${API_ENDPOINTS.HISTORY}?api_key=${apiKey}`;
      const response = await fetch(url, {
        method: "GET",
        headers: getAuthHeaders(false),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération de l'historique.");
      }

      const data = await response.json() as HistoryResponse;
      return data.history;
    } catch (error) {
      console.error("Erreur de récupération d'historique:", error);
      throw error;
    }
  },
};
