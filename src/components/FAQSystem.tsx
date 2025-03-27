
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from 'lucide-react';

const FAQSystem = () => {
  const faqs = [
    {
      question: "How does the breed detection work?",
      answer: "Our system uses a trained YOLOv8 model to analyze cattle images. It identifies breed characteristics based on visual patterns and features, providing you with accurate breed identification along with confidence scores."
    },
    {
      question: "What information do I need to provide for analysis?",
      answer: "Just upload a clear image of the cattle from a side view. Our AI will automatically extract the breed, dimensions, and estimate the weight based on the visual data. No additional information is required."
    },
    {
      question: "How accurate are the weight estimations?",
      answer: "Weight estimations are calculated using a formula based on the cattle's height and width measurements extracted from the image. While these provide a good approximation, they may vary from actual weights by 5-10% due to differences in body condition and composition."
    },
    {
      question: "Can I use the breeding recommendations for any cattle breed?",
      answer: "Yes, our system provides customized breeding recommendations for all major cattle breeds. The AI analyzes the specific characteristics of your detected breed and suggests optimal matches based on scientific research and breeding outcomes."
    },
    {
      question: "How often should I update my cattle's feeding plan?",
      answer: "Feeding plans should be updated based on growth stages, pregnancy status, and seasonal changes. Generally, review nutrition plans every 3-4 months for adult cattle, and more frequently (monthly) for growing calves or pregnant cows."
    }
  ];
  
  return (
    <Card className="glass-card animate-in-up animate-delay-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <HelpCircle className="h-6 w-6 text-primary" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FAQSystem;
