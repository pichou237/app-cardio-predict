
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { PredictionFormData } from "../schemas/predictionFormSchema";

interface FormDemographicsProps {
  control: Control<PredictionFormData>;
}

const FormDemographics: React.FC<FormDemographicsProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
    </>
  );
};

export default FormDemographics;
