
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, Check } from 'lucide-react';

const GeminiKeyInput: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" />
          Gemini AI Integration
        </CardTitle>
        <CardDescription>
          AI-powered cattle recommendations are enabled
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="text-xs text-muted-foreground">
            <div className="flex items-center gap-2 text-green-500">
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
