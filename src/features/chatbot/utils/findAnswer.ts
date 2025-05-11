
import { healthKnowledgeBase } from "../types";

export const findAnswer = (query: string): string => {
  query = query.toLowerCase();
  
  // Vérifier si la question contient des mots-clés de notre base de connaissances
  for (const item of healthKnowledgeBase) {
    if (item.keywords.some(keyword => query.includes(keyword))) {
      return item.response;
    }
  }
  
  // Réponse par défaut si aucun mot-clé n'est trouvé
  return "Je suis désolé, je n'ai pas d'information spécifique sur ce sujet. Je vous recommande de consulter un professionnel de santé pour obtenir des conseils personnalisés.";
};
