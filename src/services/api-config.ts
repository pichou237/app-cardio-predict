// Configuration de l'API pour CardioPredict

// URL de base de l'API
export const API_BASE_URL = "http://localhost:8081"; // À remplacer par l'URL réelle en production

// Endpoints de l'API
export const API_ENDPOINTS = {
  // Authentification
  REGISTER: `${API_BASE_URL}/register`,
  LOGIN: `${API_BASE_URL}/login`,
  UPDATE_USER: (username: string) => `${API_BASE_URL}/users/${username}`,
  
  // Prédictions
  PREDICT: `${API_BASE_URL}/predict`,
  HISTORY: `${API_BASE_URL}/history`,
  
  // Administration
  ADMIN_USERS: `${API_BASE_URL}/admin/users`,
  PUBLIC_USERS: `${API_BASE_URL}/users`,
  
  // Statistiques
  STATS_USERS_TOTAL: `${API_BASE_URL}/stats/users/total`,
  STATS_PREDICTIONS_TOTAL: `${API_BASE_URL}/stats/predictions/total`,
  STATS_PREDICTIONS_MONTHLY: `${API_BASE_URL}/stats/predictions/monthly`,
  STATS_PREDICTIONS_DAILY: `${API_BASE_URL}/stats/predictions/daily`,
  STATS_RISK_AVERAGE: `${API_BASE_URL}/stats/risk/average`
};

// Fonctions utilitaires pour l'API
export const getAuthHeaders = (contentType = true) => {
  const headers: Record<string, string> = {};
  
  if (contentType) {
    headers["Content-Type"] = "application/json";
  }
  
  return headers;
};

export const getAdminHeaders = (adminKey: string) => {
  return {
    "X-Admin-Key": adminKey,
    "Content-Type": "application/json",
  };
};

// Récupération de la clé API depuis le localStorage
export const getApiKey = (): string | null => {
  console.log("getApiKey",localStorage.getItem("api_key"))
  return localStorage.getItem("api_key");
};

// Sauvegarde de la clé API dans localStorage
export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem("api_key", apiKey);
};

// Suppression de la clé API du localStorage (déconnexion)
export const removeApiKey = (): void => {
  localStorage.removeItem("api_key");
};

// Vérifier si l'utilisateur est authentifié
export const isAuthenticated = (): boolean => {
  return !!getApiKey();
};
