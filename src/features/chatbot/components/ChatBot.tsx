
import React, { useState, useRef, useEffect } from "react";
import { Send, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

// Base de connaissances pour les réponses du chatbot
const healthKnowledgeBase = [
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

// Fonction pour trouver la réponse la plus appropriée
const findAnswer = (query: string): string => {
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

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Bonjour ! Je suis votre assistant virtuel pour la santé cardiaque. Comment puis-je vous aider aujourd'hui ?",
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Faire défiler vers le bas chaque fois que les messages changent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Afficher une notification lorsque le chatbot est disponible
    if (isMinimized) {
      const timeout = setTimeout(() => {
        toast("Assistant santé disponible", {
          description: "Posez vos questions sur la santé cardiaque",
          action: {
            label: "Ouvrir",
            onClick: () => setIsMinimized(false)
          }
        });
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleSend = () => {
    if (input.trim() === "") return;

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simuler la réponse du bot après un court délai
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: findAnswer(input),
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  // Gérer la touche Entrée pour envoyer le message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {isMinimized ? (
        <Button 
          onClick={() => setIsMinimized(false)} 
          className="rounded-full w-16 h-16 flex items-center justify-center bg-primary hover:bg-primary/90 shadow-lg transform hover:scale-110 transition-all"
          aria-label="Ouvrir le chatbot"
        >
          <MessageCircle size={28} className="text-white animate-pulse" />
        </Button>
      ) : (
        <Card className="w-80 md:w-96 shadow-xl border-2 border-primary/20 animate-in fade-in zoom-in-95 duration-300">
          <CardHeader className="bg-primary text-primary-foreground py-3 px-4 flex flex-row justify-between items-center">
            <CardTitle className="text-base flex items-center gap-2 font-medium">
              <Heart className="h-5 w-5 animate-pulse" /> Assistant Santé Cardiaque
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary/80" 
              onClick={() => setIsMinimized(true)}
              aria-label="Minimiser"
            >
              <span className="sr-only">Minimiser</span>
              <svg width="15" height="2" viewBox="0 0 15 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.25 1H13.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[320px] p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={cn(
                      "flex gap-3",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === "assistant" && (
                      <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                        <Heart size={16} />
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "rounded-lg px-3 py-2 max-w-[85%] shadow-sm",
                        msg.role === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-secondary/10 text-foreground"
                      )}
                    >
                      <p className="break-words">{msg.content}</p>
                      <div 
                        className={cn(
                          "text-xs mt-1",
                          msg.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}
                      >
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {msg.role === "user" && (
                      <Avatar className="w-8 h-8 bg-secondary text-secondary-foreground">
                        <span className="text-xs">Vous</span>
                      </Avatar>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t p-3 bg-muted/30">
            <form 
              className="flex w-full items-center space-x-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <Input
                type="text"
                placeholder="Posez votre question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 focus-visible:ring-primary"
                autoComplete="off"
              />
              <Button type="submit" size="icon" className="shrink-0 bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4" />
                <span className="sr-only">Envoyer</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ChatBot;
