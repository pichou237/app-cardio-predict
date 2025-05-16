
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { predictionSchema, PredictionFormData } from "../schemas/predictionFormSchema";
import { usePredictionForm } from "../hooks/usePredictionForm";
import FormDemographics from "./FormDemographics";
import FormCardiacSymptoms from "./FormCardiacSymptoms";
import FormHealthMetrics from "./FormHealthMetrics";
import FormECGResults from "./FormECGResults";
import FormCardiacDetails from "./FormCardiacDetails";

const PredictionForm: React.FC = () => {
  const { isLoading, onSubmit } = usePredictionForm();
  
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

  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <div className="w-full max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analyse du risque cardiaque</h2>
        <p className="text-muted-foreground">
          Complétez ce formulaire avec vos données médicales pour obtenir une prédiction de votre risque cardiaque
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Demographics section */}
            <FormDemographics control={form.control} />
            
            {/* Cardiac symptoms section */}
            <FormCardiacSymptoms control={form.control} />
            
            {/* Health metrics section */}
            <FormHealthMetrics control={form.control} />
            
            {/* ECG results section */}
            <FormECGResults control={form.control} />
            
            {/* Cardiac details section */}
            <FormCardiacDetails control={form.control} />
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
