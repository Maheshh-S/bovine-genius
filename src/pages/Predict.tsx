
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
import { Info, Loader2 } from 'lucide-react';
import { toast } from "sonner";
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from "framer-motion";

const Predict = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<PredictionResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();
  
  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);
    
    try {
      // Using the real API implementation
      const data = await mockUploadImage(file);
      setResults(data);
      
      // Show a success message
      if (data.message) {
        toast.success(data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to analyze the image. Please try again or use a different image.');
      toast.error('Failed to analyze the image');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <Layout>
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/20 pointer-events-none -z-10" />
        
        <div className="container py-12">
          <motion.div 
            className="max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {t('cattleDetection')}
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              {t('uploadDescription')}
            </p>
          </motion.div>
          
          <motion.div 
            className="max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <GeminiKeyInput />
          </motion.div>
          
          <motion.div 
            className="max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Alert className="border border-primary/20 bg-primary/5">
              <Info className="h-4 w-4" />
              <AlertTitle>{t('howItWorks')}</AlertTitle>
              <AlertDescription className="space-y-2 mt-2">
                <p>{t('step1')}</p>
                <p>{t('step2')}</p>
                <p>{t('step3')}</p>
              </AlertDescription>
            </Alert>
          </motion.div>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                className="max-w-3xl mx-auto mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive">
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div 
            className="max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <UploadImage onUpload={handleUpload} isUploading={isUploading} />
          </motion.div>
          
          {isUploading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <span className="ml-2 text-lg">Analyzing image...</span>
            </div>
          )}
          
          <AnimatePresence>
            {results && !isUploading && (
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <BreedResults results={results} />
                <BreedingRecommendations recommendations={results} />
                <NutritionPlan nutrition={results} />
                <ReproductiveBenefits benefits={results} />
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <ChatSupport />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Predict;
