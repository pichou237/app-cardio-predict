
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PredictionService } from "@/services/prediction-service";
import { isAuthenticated, getApiKey } from "@/services/api-config";
import { PredictionFormData } from "../schemas/predictionFormSchema";

export const usePredictionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const prepareRequestData = (data: PredictionFormData): number[] => {
    // Réduire à seulement les 10 paramètres les plus essentiels pour la prédiction
    // Ces paramètres ont été sélectionnés comme étant les plus pertinents médicalement
    return [
      parseInt(data.age),        // Âge
      parseInt(data.sex),        // Sexe
      parseInt(data.cp),         // Type de douleur thoracique
      parseInt(data.trestbps),   // Tension artérielle au repos
      parseInt(data.chol),       // Cholestérol
      parseInt(data.fbs),        // Glycémie à jeun
      parseInt(data.thalach),    // Fréquence cardiaque maximale
      parseInt(data.exang),      // Angine induite par l'exercice
      parseInt(data.ca),         // Nombre de vaisseaux principaux
      parseInt(data.thal)        // Thalassémie
    ];
  };

  const getFactorsFromData = (data: PredictionFormData) => {
    const factors = [];
    
    // Check age
    if (parseInt(data.age) > 55) factors.push("Âge");
    
    // Check cholesterol
    if (parseInt(data.chol) > 240) factors.push("Cholestérol");
    
    // Check blood pressure
    if (parseInt(data.trestbps) > 140) factors.push("Tension artérielle");
    
    // Check chest pain type
    if (parseInt(data.cp) === 0) factors.push("Douleur thoracique (Angine typique)");
    
    // Check exercise induced angina
    if (parseInt(data.exang) === 1) factors.push("Angine induite par l'exercice");
    
    // Check number of major vessels
    if (parseInt(data.ca) > 0) factors.push("Vaisseaux majeurs");
    
    return factors;
  };

  const onSubmit = async (data: PredictionFormData) => {
    setIsLoading(true);
    
    try {
      // Vérifier si l'utilisateur est authentifié
      if (!isAuthenticated()) {
        toast.error("Vous devez être connecté pour effectuer une prédiction.");
        navigate("/login");
        return;
      }

      const features = prepareRequestData(data);
      console.log("Envoi des données pour prédiction (10 paramètres):", features);
      
      try {
        // Récupérer la clé API pour l'authentification
        const apiKey = getApiKey();
        
        // Appel à l'API de prédiction avec l'API key et seulement 10 paramètres
        const result = await PredictionService.predict(features, apiKey);
        console.log("Réponse de l'API:", result);
        
        // Calcul des facteurs de risque
        const factors = getFactorsFromData(data);
        
        // Stockage des résultats pour la page de résultats
        sessionStorage.setItem("predictionData", JSON.stringify(data));
        sessionStorage.setItem("predictionResult", JSON.stringify({
          risk: result.prediction / 100, // Convertir en pourcentage entre 0 et 1
          factors: factors,
          timestamp: new Date().toISOString() // Ajouter un timestamp si non fourni par l'API
        }));
        
        toast.success("Analyse complétée avec succès!");
        navigate("/results");
      } catch (apiError) {
        console.error("Échec de la connexion à l'API:", apiError);
        toast.warning("Impossible de se connecter à l'API. Utilisation du mode simulation.");
        
        // Mode de secours en cas d'échec de l'API
        const riskScore = Math.random() > 0.5 ? 0.7 + (Math.random() * 0.3) : Math.random() * 0.3;
        const factors = getFactorsFromData(data);
        
        sessionStorage.setItem("predictionData", JSON.stringify(data));
        sessionStorage.setItem("predictionResult", JSON.stringify({
          risk: riskScore,
          factors: factors,
          timestamp: new Date().toISOString()
        }));
        
        toast.success("Analyse simulée complétée!");
        navigate("/results");
      }
    } catch (error) {
      console.error("Erreur de prédiction:", error);
      toast.error("Échec de l'analyse. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    onSubmit
  };
};
