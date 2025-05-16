
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { PredictionFormData } from "../schemas/predictionFormSchema";

interface FormCardiacDetailsProps {
  control: Control<PredictionFormData>;
}

const FormCardiacDetails: React.FC<FormCardiacDetailsProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
    </>
  );
};

export default FormCardiacDetails;
