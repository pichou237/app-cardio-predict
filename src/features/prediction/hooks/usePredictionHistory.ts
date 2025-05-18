
import { useState, useEffect } from "react";
import { PredictionService, HistoryEntry } from "@/services/prediction-service";
import { toast } from "sonner";
import { isAuthenticated, getApiKey } from "@/services/api-config";

export const usePredictionHistory = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    if (!isAuthenticated()) {
      setError("Vous devez être connecté pour accéder à votre historique");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    // Récupérer la clé API pour l'authentification
    const apiKey = getApiKey();

    try {
      const historyData = await PredictionService.getHistory(apiKey);
      console.log("historyData:", historyData);
      setHistory(historyData.history);
    } catch (err) {
      console.error("Erreur lors de la récupération de l'historique:", err);
      setError("Impossible de charger l'historique des prédictions");
      toast.error("Erreur lors de la récupération de l'historique");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return {
    history,
    isLoading,
    error,
    refetch: fetchHistory,
  };
};
