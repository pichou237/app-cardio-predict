
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PredictionService } from "@/services/prediction-service";
import { isAuthenticated } from "@/services/api-config";
import { PredictionFormData } from "../schemas/predictionFormSchema";

export const usePredictionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const prepareRequestData = (data: PredictionFormData): number[] => {
    // Convert form data to the format expected by the API (array of features)
    return [
      parseInt(data.age),
      parseInt(data.sex),
      parseInt(data.cp),
      parseInt(data.trestbps),
      parseInt(data.chol),
      parseInt(data.fbs),
      parseInt(data.restecg),
      parseInt(data.thalach),
      parseInt(data.exang),
      parseFloat(data.oldpeak),
      parseInt(data.slope),
      parseInt(data.ca),
      parseInt(data.thal)
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
      console.log("Envoi des données pour prédiction:", features);
      
      try {
        // Appel à l'API de prédiction
        const result = await PredictionService.predict(features);
        console.log("Réponse de l'API:", result);
        
        // Calcul des facteurs de risque
        const factors = getFactorsFromData(data);
        
        // Stockage des résultats pour la page de résultats
        sessionStorage.setItem("predictionData", JSON.stringify(data));
        sessionStorage.setItem("predictionResult", JSON.stringify({
          risk: result.prediction / 100, // Convertir en pourcentage entre 0 et 1
          factors: factors,
          timestamp: result.timestamp
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
