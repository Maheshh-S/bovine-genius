
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import UploadImage from '@/components/UploadImage';
import BreedResults from '@/components/BreedResults';
import BreedingRecommendations from '@/components/BreedingRecommendations';
import NutritionPlan from '@/components/NutritionPlan';
import ReproductiveBenefits from '@/components/ReproductiveBenefits';
import ChatSupport from '@/components/ChatSupport';
import GeminiKeyInput from '@/components/GeminiKeyInput';
import { mockUploadImage, PredictionResults } from '@/services/api';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';

const Predict = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<PredictionResults | null>(null);
  
  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      // Use mockUploadImage for now, later replace with the real API
      const data = await mockUploadImage(file);
      setResults(data);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-center">Cattle Detection</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Upload an image of cattle to get breed identification, breeding recommendations, 
            and nutrition guidance powered by AI.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-6">
          <GeminiKeyInput />
        </div>
        
        <div className="max-w-3xl mx-auto mb-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>How it works</AlertTitle>
            <AlertDescription>
              1. Set your Gemini API key above to enable AI-powered recommendations.
              2. Upload a cattle image to detect the breed and get personalized recommendations.
              3. View AI-generated breeding matches, nutrition plans, and reproductive insights.
            </AlertDescription>
          </Alert>
        </div>
        
        <div className="max-w-3xl mx-auto mb-12">
          <UploadImage onUpload={handleUpload} isUploading={isUploading} />
        </div>
        
        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <BreedResults results={results} />
            <BreedingRecommendations recommendations={results} />
            <NutritionPlan nutrition={results} />
            <ReproductiveBenefits benefits={results} />
          </div>
        )}
        
        <div className="max-w-4xl mx-auto">
          <ChatSupport />
        </div>
      </div>
    </Layout>
  );
};

export default Predict;
