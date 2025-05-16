
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { PredictionFormData } from "../schemas/predictionFormSchema";

interface FormECGResultsProps {
  control: Control<PredictionFormData>;
}

const FormECGResults: React.FC<FormECGResultsProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
    </>
  );
};

export default FormECGResults;
