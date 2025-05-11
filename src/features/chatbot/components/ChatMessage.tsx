
import React from "react";
import { Message } from "../types";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div 
      key={message.id}
      className={cn(
        "flex gap-3",
        message.role === "user" ? "justify-end" : "justify-start"
      )}
    >
      {message.role === "assistant" && (
        <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
          <Heart size={16} />
        </Avatar>
      )}
      <div
        className={cn(
          "rounded-lg px-3 py-2 max-w-[85%] shadow-sm",
          message.role === "user" 
            ? "bg-primary text-primary-foreground" 
            : "bg-secondary/10 text-foreground"
        )}
      >
        <p className="break-words">{message.content}</p>
        <div 
          className={cn(
            "text-xs mt-1",
            message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      {message.role === "user" && (
        <Avatar className="w-8 h-8 bg-secondary text-secondary-foreground">
          <span className="text-xs">Vous</span>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
