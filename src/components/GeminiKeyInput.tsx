
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { setGeminiApiKey, getGeminiApiKey } from '@/services/api';
import { toast } from "sonner";
import { KeyRound } from 'lucide-react';

const GeminiKeyInput: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);

  useEffect(() => {
    // Check if key is already set
    const currentKey = getGeminiApiKey();
    if (currentKey) {
      setIsKeySet(true);
    }
    
    // Try to load from localStorage
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setGeminiApiKey(savedKey);
      setIsKeySet(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast.error("Please enter a valid Gemini API key");
      return;
    }

    // Save the API key
    setGeminiApiKey(apiKey);
    localStorage.setItem('gemini_api_key', apiKey);
    setIsKeySet(true);
    toast.success("Gemini API key set successfully");
  };

  const handleReset = () => {
    setApiKey('');
    setGeminiApiKey('');
    localStorage.removeItem('gemini_api_key');
    setIsKeySet(false);
    toast.info("Gemini API key cleared");
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" />
          Gemini AI Integration
        </CardTitle>
        <CardDescription>
          Enter your Gemini API key to enable AI-powered recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Input
              type="password"
              placeholder={isKeySet ? "••••••••••••••••••••••••••••••" : "Enter your Gemini API key"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
              disabled={isKeySet}
            />
            <div className="text-xs text-muted-foreground">
              {isKeySet ? (
                <span className="text-green-500">✓ Gemini API key is set and ready to use</span>
              ) : (
                <span>Get your API key from <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a></span>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            {!isKeySet ? (
              <Button type="submit" size="sm">
                Save API Key
              </Button>
            ) : (
              <Button type="button" variant="outline" size="sm" onClick={handleReset}>
                Change API Key
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default GeminiKeyInput;
