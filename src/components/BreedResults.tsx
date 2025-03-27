
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BreedResult } from '@/services/api';
import { BadgeCheck, Ruler, Scale, Trophy, Monitor } from 'lucide-react';

interface BreedResultsProps {
  results: BreedResult;
}

const BreedResults: React.FC<BreedResultsProps> = ({ results }) => {
  const { breed, confidence, height_cm, width_cm, weight_kg } = results;
  
  // Format the confidence as a percentage
  const confidencePercentage = Math.round(confidence * 100);
  
  return (
    <Card className="glass-card animate-in-up">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <BadgeCheck className="h-6 w-6 text-primary" />
          Breed Detection Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">Detected Breed</div>
            <div className="text-xl font-semibold">{breed}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Confidence</span>
              <span className="font-medium">{confidencePercentage}%</span>
            </div>
            <Progress value={confidencePercentage} className="h-2" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-secondary/50 rounded-lg p-4 flex flex-col">
            <div className="text-muted-foreground text-sm mb-1 flex items-center gap-1">
              <Ruler className="h-4 w-4" />
              <span>Height</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-semibold">{height_cm}</span>
              <span className="text-sm text-muted-foreground ml-1">cm</span>
            </div>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-4 flex flex-col">
            <div className="text-muted-foreground text-sm mb-1 flex items-center gap-1">
              <Monitor className="h-4 w-4" />
              <span>Width</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-semibold">{width_cm}</span>
              <span className="text-sm text-muted-foreground ml-1">cm</span>
            </div>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-4 flex flex-col">
            <div className="text-muted-foreground text-sm mb-1 flex items-center gap-1">
              <Scale className="h-4 w-4" />
              <span>Estimated Weight</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-semibold">{weight_kg}</span>
              <span className="text-sm text-muted-foreground ml-1">kg</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreedResults;
