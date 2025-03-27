
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NutritionRecommendation } from '@/services/api';
import { Utensils } from 'lucide-react';

interface NutritionPlanProps {
  nutrition: NutritionRecommendation;
}

const NutritionPlan: React.FC<NutritionPlanProps> = ({ nutrition }) => {
  const { nutrition_recommendation } = nutrition;
  
  return (
    <Card className="glass-card animate-in-up animate-delay-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Utensils className="h-6 w-6 text-primary" />
          Optimized Nutrition Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="font-medium">Recommended Protein Sources</div>
          <div className="flex flex-wrap gap-2">
            {nutrition_recommendation.protein_source.map((source) => (
              <Badge key={source} variant="secondary" className="px-3 py-1 text-sm">
                {source}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="font-medium">Feeding Plan</div>
          <div className="bg-secondary/50 rounded-lg p-4">
            <p>{nutrition_recommendation.feeding_plan}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="font-medium">Feeding Schedule</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary/5 rounded-lg p-4">
              <h4 className="font-medium mb-2">Morning</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• High-quality hay (free access)</li>
                <li>• 1 kg of protein supplement</li>
                <li>• Fresh, clean water</li>
              </ul>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-4">
              <h4 className="font-medium mb-2">Midday</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Silage or green fodder</li>
                <li>• Mineral supplements</li>
                <li>• Fresh, clean water</li>
              </ul>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-4">
              <h4 className="font-medium mb-2">Evening</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 1 kg of protein supplement</li>
                <li>• High-quality hay (free access)</li>
                <li>• Fresh, clean water</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionPlan;
