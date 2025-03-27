
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const GeminiKeyInput: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="mb-6 bg-gradient-to-br from-white to-secondary/20 border border-primary/20 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-full -ml-8 -mb-8"></div>
      
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="text-xl flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" />
          Gemini AI Integration
          <Sparkles className="h-4 w-4 text-yellow-500 ml-1" />
        </CardTitle>
        <CardDescription>
          AI-powered cattle recommendations are enabled
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex flex-col space-y-2">
          <div className="text-xs text-muted-foreground">
            <div className="flex items-center gap-2 text-green-600">
              <Check className="h-4 w-4" />
              <span>
                Gemini API key is pre-configured. AI-powered recommendations are ready to use.
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeminiKeyInput;
