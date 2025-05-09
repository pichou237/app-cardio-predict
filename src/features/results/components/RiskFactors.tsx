
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HeartPulse } from "lucide-react";

interface RiskFactorsProps {
  factors: string[];
}

const RiskFactors: React.FC<RiskFactorsProps> = ({ factors }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Principaux facteurs de risque</h3>
      
      {factors.length > 0 ? (
        <div className="space-y-2">
          {factors.map((factor, index) => (
            <Alert key={index}>
              <HeartPulse className="h-4 w-4" />
              <AlertTitle>Facteur: {factor}</AlertTitle>
              <AlertDescription>
                Ce facteur contribue significativement à votre niveau de risque cardiaque.
              </AlertDescription>
            </Alert>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Aucun facteur de risque majeur n'a été identifié.</p>
      )}
      
      <div className="mt-6">
        <h4 className="text-lg font-medium">Recommandations</h4>
        <p className="text-muted-foreground mt-2">
          Consultez un professionnel de la santé pour discuter de ces résultats et établir un plan de prévention personnalisé.
        </p>
      </div>
    </div>
  );
};

export default RiskFactors;
