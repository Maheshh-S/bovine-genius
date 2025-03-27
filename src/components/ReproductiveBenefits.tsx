
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReproductiveBenefits as ReproductiveBenefitsType } from '@/services/api';
import { Dna } from 'lucide-react';

interface ReproductiveBenefitsProps {
  benefits: ReproductiveBenefitsType;
}

const ReproductiveBenefits: React.FC<ReproductiveBenefitsProps> = ({ benefits }) => {
  return (
    <Card className="glass-card animate-in-up animate-delay-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Dna className="h-6 w-6 text-primary" />
          Reproductive Benefits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-secondary/50 rounded-lg p-4">
          <p>{benefits.reproductive_benefits}</p>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary/5 rounded-lg p-4">
            <h4 className="font-medium mb-2">Expected Improvements</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Enhanced milk production</li>
              <li>• Improved disease resistance</li>
              <li>• Better climate adaptability</li>
              <li>• Higher fertility rates</li>
            </ul>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-4">
            <h4 className="font-medium mb-2">Breeding Timeline</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• First breeding: 15-18 months of age</li>
              <li>• Gestation period: ~280 days</li>
              <li>• First calving: 24-27 months of age</li>
              <li>• Optimal breeding interval: 12-13 months</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReproductiveBenefits;
