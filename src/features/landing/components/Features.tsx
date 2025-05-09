
import React from "react";
import { HeartPulse, Shield, Database } from "lucide-react";

const features = [
  {
    name: "Prédictions précises",
    description: "Notre modèle d'IA offre des prédictions précises basées sur des milliers de cas cliniques.",
    icon: HeartPulse,
  },
  {
    name: "Sécurité des données",
    description: "Vos données médicales sont chiffrées et stockées en toute sécurité, respectant les normes RGPD.",
    icon: Shield,
  },
  {
    name: "Analyse complète",
    description: "Obtenez une analyse détaillée de vos facteurs de risque avec des recommandations personnalisées.",
    icon: Database,
  },
];

const Features: React.FC = () => {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Technologie avancée</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tout ce dont vous avez besoin pour surveiller votre santé cardiaque
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Notre application utilise des algorithmes avancés pour analyser vos données médicales et vous fournir une évaluation précise de vos risques de maladies cardiaques.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
