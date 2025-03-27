
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreedingRecommendations as BreedingRecommendationsType } from '@/services/api';
import { HeartHandshake } from 'lucide-react';

interface BreedingRecommendationsProps {
  recommendations: BreedingRecommendationsType;
}

const BreedingRecommendations: React.FC<BreedingRecommendationsProps> = ({ recommendations }) => {
  const { best_breeding_matches } = recommendations;
  
  return (
    <Card className="glass-card animate-in-up animate-delay-100">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <HeartHandshake className="h-6 w-6 text-primary" />
          Best Breeding Matches
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {best_breeding_matches.map((match, index) => (
            <div 
              key={match.breed} 
              className={`
                p-4 rounded-lg 
                ${index % 2 === 0 ? 'bg-secondary/50' : 'bg-primary/5'} 
                transition-all duration-300
                hover:shadow-md
              `}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center">
                  <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-medium ml-3">{match.breed}</h3>
                </div>
              </div>
              <p className="mt-2 text-muted-foreground">{match.expected_benefits}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BreedingRecommendations;
