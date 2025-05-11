
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface MinimizedChatProps {
  onClick: () => void;
}

const MinimizedChat: React.FC<MinimizedChatProps> = ({ onClick }) => {
  return (
    <Button 
      onClick={onClick}
      className="rounded-full w-16 h-16 flex items-center justify-center bg-primary hover:bg-primary/90 shadow-lg transform hover:scale-110 transition-all"
      aria-label="Ouvrir le chatbot"
    >
      <MessageCircle size={28} className="text-white animate-pulse" />
    </Button>
  );
};

export default MinimizedChat;
