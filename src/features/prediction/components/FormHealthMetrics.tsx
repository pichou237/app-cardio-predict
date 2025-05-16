
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { PredictionFormData } from "../schemas/predictionFormSchema";

interface FormHealthMetricsProps {
  control: Control<PredictionFormData>;
}

const FormHealthMetrics: React.FC<FormHealthMetricsProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
    </>
  );
};

export default FormHealthMetrics;
