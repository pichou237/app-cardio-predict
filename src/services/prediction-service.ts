
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
      // Envoyer seulement les 10 paramètres essentiels
      console.log("Envoi des 10 paramètres à l'API:", data);
      
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
      // La simulation prend désormais en compte les 10 paramètres essentiels
      const riskLevel = calculateSimulatedRisk(data);
      
      return {
        prediction: riskLevel,
        risk: riskLevel > 50,
        risk_factors: simulateRiskFactors(data)
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

// Fonction pour calculer un risque simulé basé sur les 10 paramètres essentiels
function calculateSimulatedRisk(params: number[]): number {
  let risk = 0;
  
  // Âge (>55 ans augmente le risque)
  if (params[0] > 55) risk += 10;
  if (params[0] > 65) risk += 15;
  
  // Sexe (homme = risque plus élevé statistiquement)
  if (params[1] === 1) risk += 5;
  
  // Type de douleur thoracique (0 = angine typique = risque élevé)
  if (params[2] === 0) risk += 20;
  
  // Tension artérielle élevée
  if (params[3] > 140) risk += 10;
  
  // Cholestérol élevé
  if (params[4] > 240) risk += 15;
  
  // Glycémie à jeun élevée
  if (params[5] === 1) risk += 5;
  
  // Fréquence cardiaque maximale basse
  if (params[6] < 120) risk += 10;
  
  // Angine induite par l'exercice
  if (params[7] === 1) risk += 20;
  
  // Nombre de vaisseaux principaux
  risk += params[8] * 10;
  
  // Thalassémie type 3 (défaut réversible)
  if (params[9] === 3) risk += 15;
  
  // Ajout d'une légère variation aléatoire
  risk += Math.random() * 10 - 5;
  
  // Limiter entre 1 et 99
  return Math.max(1, Math.min(99, risk));
}

// Fonction pour simuler les facteurs de risque
function simulateRiskFactors(params: number[]): string[] {
  const factors: string[] = [];
  
  if (params[0] > 55) factors.push("Âge");
  if (params[3] > 140) factors.push("Tension artérielle");
  if (params[4] > 240) factors.push("Cholestérol");
  if (params[5] === 1) factors.push("Glycémie à jeun");
  if (params[2] === 0) factors.push("Douleur thoracique (Angine typique)");
  if (params[7] === 1) factors.push("Angine induite par l'exercice");
  if (params[8] > 0) factors.push("Vaisseaux majeurs");
  if (params[9] === 3) factors.push("Thalassémie");
  
  return factors;
}
