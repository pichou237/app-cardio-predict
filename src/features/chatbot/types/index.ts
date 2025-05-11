
export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export const healthKnowledgeBase = [
  {
    keywords: ["alimentation", "manger", "nourriture", "repas", "régime"],
    response: "Pour une bonne santé cardiaque, privilégiez une alimentation riche en fruits, légumes, grains entiers et poissons. Limitez les graisses saturées, le sel et les sucres raffinés."
  },
  {
    keywords: ["exercice", "sport", "activité", "physique", "bouger", "marcher"],
    response: "L'activité physique est essentielle pour la santé cardiaque. Visez au moins 150 minutes d'activité modérée par semaine. Même de courtes marches quotidiennes peuvent faire une différence significative."
  },
  {
    keywords: ["stress", "anxiété", "tension", "détendre", "relaxation"],
    response: "Le stress chronique peut nuire à votre santé cardiovasculaire. Essayez des techniques de relaxation comme la méditation, la respiration profonde ou le yoga pour réduire votre niveau de stress."
  },
  {
    keywords: ["sommeil", "dormir", "repos", "nuit", "coucher"],
    response: "Un bon sommeil est crucial pour votre santé cardiaque. Visez 7-8 heures de sommeil par nuit et maintenez un horaire de sommeil régulier."
  },
  {
    keywords: ["tabac", "cigarette", "fumer", "nicotine"],
    response: "Le tabagisme est l'un des facteurs de risque les plus importants pour les maladies cardiovasculaires. Arrêter de fumer est l'une des meilleures choses que vous puissiez faire pour votre cœur."
  },
  {
    keywords: ["alcool", "boire", "vin", "bière"],
    response: "La consommation excessive d'alcool peut augmenter votre pression artérielle et ajouter des calories inutiles. Si vous buvez, faites-le avec modération."
  },
  {
    keywords: ["pression", "tension", "artérielle", "hypertension"],
    response: "Une pression artérielle élevée peut endommager votre cœur silencieusement. Faites-la vérifier régulièrement et suivez les recommandations de votre médecin pour la maintenir dans des limites normales."
  },
  {
    keywords: ["cholestérol", "lipides", "triglycérides", "gras", "hdl", "ldl"],
    response: "Un taux de cholestérol élevé peut boucher vos artères. Adoptez une alimentation saine, faites de l'exercice régulièrement et prenez les médicaments prescrits par votre médecin si nécessaire."
  },
  {
    keywords: ["diabète", "sucre", "glycémie"],
    response: "Le diabète augmente significativement votre risque de maladie cardiaque. Maintenir une glycémie équilibrée est crucial pour votre santé cardiovasculaire."
  },
  {
    keywords: ["poids", "obésité", "maigrir", "régime", "mincir"],
    response: "Maintenir un poids santé réduit la charge sur votre cœur. Même une perte de poids modeste peut améliorer votre santé cardiovasculaire si vous êtes en surpoids."
  }
];
