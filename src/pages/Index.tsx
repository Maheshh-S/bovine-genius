
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import { ArrowRight, Camera, Check, BarChart4, Brain, Search, Sparkles } from 'lucide-react';
import FAQSystem from '@/components/FAQSystem';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };
  
  useEffect(() => {
    // Add smooth scroll behavior for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);
  
  return (
    <Layout>
      <section className="relative py-12 md:py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/30 pointer-events-none" />
        
        <div className="container px-4 md:px-6 relative">
          <motion.div 
            className="flex flex-col items-center text-center space-y-4 mb-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary animate-fade-in flex items-center gap-2"
              variants={itemVariants}
            >
              <Sparkles className="h-4 w-4" />
              {t('aiPoweredAnalysis')}
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl animate-in-up max-w-3xl"
              variants={itemVariants}
            >
              {t('smartCattleManagement')} <span className="text-primary relative inline-block after:content-[''] after:absolute after:w-full after:h-2 after:-bottom-2 after:left-0 after:bg-primary/20 after:rounded-full">AI</span>
            </motion.h1>
            
            <motion.p 
              className="max-w-[700px] text-muted-foreground md:text-xl animate-in-up animate-delay-100"
              variants={itemVariants}
            >
              {t('uploadDescription')}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-2 animate-in-up animate-delay-200"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                onClick={() => navigate('/predict')} 
                className="gap-1 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                {t('uploadImage')} <Camera className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="group"
              >
                {t('exploreFeatures')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="relative mx-auto max-w-6xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <img 
                src="https://images.unsplash.com/photo-1594952183154-9edabac5d9bb?w=1200&auto=format&fit=crop&q=80"
                alt="Cattle in field" 
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg flex items-center gap-4 max-w-md animate-pulse">
              <div className="bg-primary/10 p-2 rounded-full">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">{t('aiPoweredAnalysis')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('breedDetection')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <section id="features" className="py-12 md:py-24 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center text-center space-y-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl relative inline-block">
              Comprehensive Cattle Management
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/30 rounded-full"></span>
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Our platform provides a complete solution for optimizing your livestock management
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Search className="h-6 w-6" />,
                title: "Breed Detection",
                description: "Upload an image to instantly identify the cattle breed with confidence scores."
              },
              {
                icon: <BarChart4 className="h-6 w-6" />,
                title: "Breeding Recommendations",
                description: "Get AI-powered suggestions for optimal breeding matches with expected benefits."
              },
              {
                icon: <Check className="h-6 w-6" />,
                title: "Nutrition Planning",
                description: "Receive customized feeding recommendations based on breed and estimated weight."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-medium">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-primary group-hover:underline">
                  <span>Learn more</span>
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-20 w-20 bg-primary/5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-24 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-slate-700/25 pointer-events-none"></div>
        
        <div className="container px-4 md:px-6 relative">
          <motion.div 
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FAQSystem />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
