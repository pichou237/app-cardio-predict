
import { z } from "zod";

export const predictionSchema = z.object({
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

export type PredictionFormData = z.infer<typeof predictionSchema>;
