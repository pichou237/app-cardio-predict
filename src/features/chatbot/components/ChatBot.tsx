
import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Message } from "../types";
import { findAnswer } from "../utils/findAnswer";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import MinimizedChat from "./MinimizedChat";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Bonjour ! Je suis votre assistant virtuel pour la santé cardiaque. Comment puis-je vous aider aujourd'hui ?",
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  const [isMinimized, setIsMinimized] = useState(true);

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

  const handleSendMessage = (inputMessage: string) => {
    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Simuler la réponse du bot après un court délai
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: findAnswer(inputMessage),
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {isMinimized ? (
        <MinimizedChat onClick={() => setIsMinimized(false)} />
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
            <MessageList messages={messages} />
          </CardContent>
          <ChatInput onSendMessage={handleSendMessage} />
        </Card>
      )}
    </div>
  );
};

export default ChatBot;
