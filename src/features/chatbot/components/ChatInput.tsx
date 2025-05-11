
import React, { useState } from "react";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
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
  );
};

export default ChatInput;
