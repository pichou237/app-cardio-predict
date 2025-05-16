import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PredictionService } from "@/services/prediction-service";
import { isAuthenticated } from "@/services/api-config";

const predictionSchema = z.object({
  age: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0 && parseInt(val) < 120, {
    message: "L'âge doit être un nombre entre 1 et 120",
  }),
  sex: z.string({
    required_error: "Veuillez sélectionner votre sexe",
  }),
  cp: z.string({
    required_error: "Veuillez sélectionner un type de douleur thoracique",
  }),
  trestbps: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 50 && parseInt(val) < 250, {
    message: "La tension artérielle doit être un nombre entre 50 et 250",
  }),
  chol: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 100 && parseInt(val) < 600, {
    message: "Le cholestérol doit être un nombre entre 100 et 600",
  }),
  fbs: z.string({
    required_error: "Veuillez indiquer si votre glycémie à jeun est > 120 mg/dl",
  }),
  restecg: z.string({
    required_error: "Veuillez sélectionner les résultats ECG au repos",
  }),
  thalach: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 50 && parseInt(val) < 250, {
    message: "La fréquence cardiaque maximale doit être un nombre entre 50 et 250",
  }),
  exang: z.string({
    required_error: "Veuillez indiquer si vous avez de l'angine induite par l'exercice",
  }),
  oldpeak: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "La dépression ST doit être un nombre",
  }),
  slope: z.string({
    required_error: "Veuillez sélectionner la pente du segment ST",
  }),
  ca: z.string({
    required_error: "Veuillez sélectionner le nombre de vaisseaux majeurs",
  }),
  thal: z.string({
    required_error: "Veuillez sélectionner le type de thalassémie",
  }),
});

type PredictionFormData = z.infer<typeof predictionSchema>;

// API URL from the GitHub repository
const API_URL = "https://heart-disease-api-predictior.herokuapp.com/predict";

const PredictionForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<PredictionFormData>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      age: "",
      sex: "",
      cp: "",
      trestbps: "",
      chol: "",
      fbs: "",
      restecg: "",
      thalach: "",
      exang: "",
      oldpeak: "",
      slope: "",
      ca: "",
      thal: "",
    },
  });

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

  return (
    <div className="w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analyse du risque cardiaque</h2>
        <p className="text-muted-foreground">
          Complétez ce formulaire avec vos données médicales pour obtenir une prédiction de votre risque cardiaque
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Âge</FormLabel>
                  <FormControl>
                    <Input placeholder="45" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexe</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Homme</SelectItem>
                      <SelectItem value="0">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de douleur thoracique</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Angine typique</SelectItem>
                      <SelectItem value="1">Angine atypique</SelectItem>
                      <SelectItem value="2">Douleur non angineuse</SelectItem>
                      <SelectItem value="3">Asymptomatique</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="trestbps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tension artérielle au repos (mm Hg)</FormLabel>
                  <FormControl>
                    <Input placeholder="120" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="chol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cholestérol sérique (mg/dl)</FormLabel>
                  <FormControl>
                    <Input placeholder="200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fbs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Glycémie à jeun {'>'}  120 mg/dl</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Oui</SelectItem>
                      <SelectItem value="0">Non</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="restecg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Résultats ECG au repos</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Normal</SelectItem>
                      <SelectItem value="1">Anomalie de l'onde ST-T</SelectItem>
                      <SelectItem value="2">Hypertrophie ventriculaire</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="thalach"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fréquence cardiaque maximale</FormLabel>
                  <FormControl>
                    <Input placeholder="150" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="exang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Angine induite par l'exercice</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Oui</SelectItem>
                      <SelectItem value="0">Non</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="oldpeak"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dépression ST induite par l'exercice</FormLabel>
                  <FormControl>
                    <Input placeholder="1.0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="slope"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pente du segment ST d'exercice maximal</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Ascendant</SelectItem>
                      <SelectItem value="1">Plat</SelectItem>
                      <SelectItem value="2">Descendant</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="ca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de vaisseaux principaux (0-3)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="thal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thalassémie</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Normal</SelectItem>
                      <SelectItem value="2">Défaut fixe</SelectItem>
                      <SelectItem value="3">Défaut réversible</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? "Analyse en cours..." : "Analyser mon risque cardiaque"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PredictionForm;
