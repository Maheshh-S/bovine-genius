
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import { ArrowRight, Upload, Check, BarChart4, Brain, Search } from 'lucide-react';
import FAQSystem from '@/components/FAQSystem';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary animate-fade-in">
              AI-Powered Cattle Analysis
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl animate-in-up">
              Smart Cattle Management with <span className="text-primary">AI</span>
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl animate-in-up animate-delay-100">
              Upload a cattle image to get breed identification, breeding recommendations, 
              nutrition guidance, and expert support for optimal cattle management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-2 animate-in-up animate-delay-200">
              <Button size="lg" onClick={() => navigate('/predict')} className="gap-1">
                Upload Image <Upload className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Features
              </Button>
            </div>
          </div>
          
          <div className="relative mx-auto max-w-6xl animate-in-up animate-delay-300">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1594952183154-9edabac5d9bb?w=1200&auto=format&fit=crop&q=80"
                alt="Cattle in field" 
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg flex items-center gap-4 max-w-md">
              <div className="bg-primary/10 p-2 rounded-full">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">AI-Powered Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Get breed detection with 90%+ accuracy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="features" className="py-12 md:py-24 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Comprehensive Cattle Management
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Our platform provides a complete solution for optimizing your livestock management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg animate-in-up">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Breed Detection</h3>
              <p className="text-muted-foreground">
                Upload an image to instantly identify the cattle breed with confidence scores.
              </p>
              <div className="mt-4 flex items-center text-sm text-primary">
                <span>Learn more</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg animate-in-up animate-delay-100">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BarChart4 className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Breeding Recommendations</h3>
              <p className="text-muted-foreground">
                Get AI-powered suggestions for optimal breeding matches with expected benefits.
              </p>
              <div className="mt-4 flex items-center text-sm text-primary">
                <span>Learn more</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg animate-in-up animate-delay-200">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Nutrition Planning</h3>
              <p className="text-muted-foreground">
                Receive customized feeding recommendations based on breed and estimated weight.
              </p>
              <div className="mt-4 flex items-center text-sm text-primary">
                <span>Learn more</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-8">
            <FAQSystem />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
