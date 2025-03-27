
import { toast } from "sonner";

const API_URL = "http://localhost:8000"; // Change this to your backend URL

export interface BreedResult {
  breed: string;
  confidence: number;
  height_cm: number;
  width_cm: number;
  weight_kg: number;
}

export interface BreedingMatch {
  breed: string;
  expected_benefits: string;
}

export interface BreedingRecommendations {
  best_breeding_matches: BreedingMatch[];
}

export interface NutritionRecommendation {
  nutrition_recommendation: {
    protein_source: string[];
    feeding_plan: string;
  };
}

export interface ReproductiveBenefits {
  reproductive_benefits: string;
}

export type PredictionResults = 
  BreedResult & 
  BreedingRecommendations & 
  NutritionRecommendation & 
  ReproductiveBenefits;

export async function uploadImage(file: File): Promise<PredictionResults> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to process image");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("Failed to process image. Please try again.");
    throw error;
  }
}

export async function sendChatMessage(message: string): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to get chat response");
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error sending chat message:", error);
    toast.error("Failed to get chat response. Please try again.");
    throw error;
  }
}

// This is a mock implementation since we don't have a real backend yet
// Remove this when connecting to the real backend
export async function mockUploadImage(file: File): Promise<PredictionResults> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        breed: "Jersey",
        confidence: 0.92,
        height_cm: 219,
        width_cm: 226,
        weight_kg: 520,
        best_breeding_matches: [
          {
            breed: "Holstein",
            expected_benefits: "High milk production up to 35L/day, strong immune system."
          },
          {
            breed: "Brown Swiss",
            expected_benefits: "Rich milk fat content (4.2%), excellent fertility, high disease resistance."
          },
          {
            breed: "Gir",
            expected_benefits: "Hardy breed, thrives in hot climates, long lifespan, good milk production."
          },
          {
            breed: "Sahiwal",
            expected_benefits: "Best desi breed, disease-resistant, high fertility, and strong calves."
          },
          {
            breed: "Montbéliarde",
            expected_benefits: "Balanced breed with both high milk and strong muscular growth."
          }
        ],
        nutrition_recommendation: {
          protein_source: ["Alfalfa", "Soybean Meal", "Corn Silage"],
          feeding_plan: "Provide 2 kg of soybean meal daily for protein enrichment and 5 kg of alfalfa for fiber."
        },
        reproductive_benefits: "Crossing Jersey with Holstein produces calves with higher milk yield and strong disease resistance."
      });
    }, 2000);
  });
}

export async function mockSendChatMessage(message: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (message.toLowerCase().includes("feed") || message.toLowerCase().includes("nutrition")) {
        resolve("For Jersey cows, a balanced diet should include high-quality alfalfa hay, corn silage, and a protein supplement like soybean meal. Adult cows typically need 2-3% of their body weight in dry matter daily.");
      } else if (message.toLowerCase().includes("breed") || message.toLowerCase().includes("breeding")) {
        resolve("Jersey cows are excellent for crossbreeding with Holstein, Brown Swiss, or Gir breeds to improve milk production, fat content, or heat tolerance. The first breeding should occur when the heifer reaches about 15 months of age or 800 pounds.");
      } else if (message.toLowerCase().includes("disease") || message.toLowerCase().includes("health")) {
        resolve("Common diseases in Jersey cows include mastitis, milk fever, and ketosis. Regular vaccinations, proper nutrition, and good management practices are essential for prevention. Ensure clean housing and proper milking procedures.");
      } else {
        resolve("I can help with questions about cattle breeding, nutrition, health, and management. What specific information are you looking for about your cattle?");
      }
    }, 1000);
  });
}
