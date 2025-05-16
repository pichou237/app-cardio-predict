
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { PredictionFormData } from "../schemas/predictionFormSchema";

interface FormCardiacSymptomsProps {
  control: Control<PredictionFormData>;
}

const FormCardiacSymptoms: React.FC<FormCardiacSymptomsProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
    </>
  );
};

export default FormCardiacSymptoms;
