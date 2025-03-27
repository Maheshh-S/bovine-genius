
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockSendChatMessage } from '@/services/api';
import { MessageSquare, Send, User, Bot, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your cattle expert assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await mockSendChatMessage(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const suggestedQuestions = [
    "What is the best feed for high-milk-producing Jersey cows?",
    "Which cow breeds are best for hot climates?",
    "How can I increase milk yield naturally?",
    "What are the best crossbreeding options for Holstein cows?",
    "How to prevent common cattle diseases?"
  ];
  
  const handleQuestionClick = (question: string) => {
    setInput(question);
  };
  
  return (
    <Card className="glass-card animate-in-up animate-delay-400">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <MessageSquare className="h-6 w-6 text-primary" />
          Cattle Expert Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col h-96">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    flex items-start gap-2 max-w-[80%] rounded-lg p-3
                    ${message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                    }
                  `}
                >
                  <div 
                    className={`
                      rounded-full p-1 flex-shrink-0
                      ${message.sender === 'user'
                        ? 'bg-primary-foreground/20'
                        : 'bg-primary/10'
                      }
                    `}
                  >
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm">{message.text}</div>
                    <div className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-lg p-3 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 bg-muted/20 border-t">
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-2">Suggested Questions</h4>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <Button
                    key={question}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3 pb-4">
        <div className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about cattle breeding, feeding, or health..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isLoading) {
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatSupport;
