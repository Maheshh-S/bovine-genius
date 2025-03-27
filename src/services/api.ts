
import { toast } from "sonner";

const API_URL = "http://localhost:8000"; // Change this to your backend URL

export interface BreedResult {
  breed: string;
  confidence: number;
  height_cm: number;
  width_cm: number;
  weight_kg?: number;
  message?: string;
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

// Gemini API key state
let geminiApiKey: string | null = null;

export const setGeminiApiKey = (key: string) => {
  geminiApiKey = key;
};

export const getGeminiApiKey = () => {
  return geminiApiKey;
};

export async function uploadImage(file: File): Promise<BreedResult> {
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

export async function getBreedingRecommendations(breedData: BreedResult): Promise<BreedingRecommendations> {
  if (!geminiApiKey) throw new Error("Gemini API key is not set");

  try {
    const prompt = `You are a professional cattle expert. Based on the following cattle breed information, provide the top 5 best breeding matches with detailed expected benefits formatted as JSON.
    
    Breed: ${breedData.breed}
    Height: ${breedData.height_cm} cm
    Width: ${breedData.width_cm} cm
    
    Your response should ONLY include JSON in this exact format:
    {
      "best_breeding_matches": [
        {
          "breed": "Example Breed 1",
          "expected_benefits": "Detailed benefits description"
        },
        // Repeat for 5 breeds
      ]
    }`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiApiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get breeding recommendations');
    }

    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid response format from Gemini");
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error getting breeding recommendations:", error);
    toast.error("Failed to get breeding recommendations. Please try again.");
    throw error;
  }
}

export async function getNutritionPlan(breedData: BreedResult): Promise<NutritionRecommendation> {
  if (!geminiApiKey) throw new Error("Gemini API key is not set");

  try {
    // Calculate approximate weight if not provided
    const estimatedWeight = breedData.weight_kg || 
      Math.round((breedData.height_cm * breedData.width_cm) / 80); // Simple estimation formula
    
    const prompt = `You are a cattle nutrition expert. Based on the following cattle information, provide an optimized nutrition plan formatted as JSON.
    
    Breed: ${breedData.breed}
    Height: ${breedData.height_cm} cm
    Width: ${breedData.width_cm} cm
    Estimated Weight: ${estimatedWeight} kg
    
    Your response should ONLY include JSON in this exact format:
    {
      "nutrition_recommendation": {
        "protein_source": ["Source 1", "Source 2", "Source 3"],
        "feeding_plan": "Detailed feeding plan description"
      }
    }`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiApiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get nutrition recommendations');
    }

    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid response format from Gemini");
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error getting nutrition plan:", error);
    toast.error("Failed to get nutrition plan. Please try again.");
    throw error;
  }
}

export async function getReproductiveBenefits(breedData: BreedResult): Promise<ReproductiveBenefits> {
  if (!geminiApiKey) throw new Error("Gemini API key is not set");

  try {
    const prompt = `You are a cattle reproductive expert. Based on the following cattle breed information, provide detailed reproductive benefits information formatted as JSON.
    
    Breed: ${breedData.breed}
    Height: ${breedData.height_cm} cm
    Width: ${breedData.width_cm} cm
    
    Your response should ONLY include JSON in this exact format:
    {
      "reproductive_benefits": "Detailed description of reproductive benefits when crossing this breed with recommended breeds"
    }`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiApiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get reproductive benefits');
    }

    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid response format from Gemini");
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error getting reproductive benefits:", error);
    toast.error("Failed to get reproductive benefits. Please try again.");
    throw error;
  }
}

export async function sendChatMessage(message: string): Promise<string> {
  if (!geminiApiKey) throw new Error("Gemini API key is not set");

  try {
    const prompt = `You are CattleAssist, an AI assistant specializing in cattle breeding, nutrition, and management. 
    Only answer questions related to cattle, farming, or animal husbandry. 
    If asked about unrelated topics, politely redirect the conversation to cattle-related topics.
    Be helpful, clear, and concise in your responses.

    User message: ${message}`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiApiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get chat response');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error sending chat message:", error);
    toast.error("Failed to get chat response. Please try again.");
    throw error;
  }
}

// This is a temporary function until the real backend is connected
export async function mockUploadImage(file: File): Promise<PredictionResults> {
  return new Promise((resolve) => {
    setTimeout(async () => {
      // Simulated breed detection result
      const breedResult: BreedResult = {
        breed: "Jersey",
        confidence: 0.92,
        height_cm: 219,
        width_cm: 226,
        message: "✅ Prediction successful! Ensure a clear image for better accuracy."
      };

      // Calculate weight using the dimensions
      breedResult.weight_kg = Math.round((breedResult.height_cm * breedResult.width_cm) / 80);

      try {
        // If API key is set, use Gemini to get real recommendations
        if (geminiApiKey) {
          const breedingRecs = await getBreedingRecommendations(breedResult);
          const nutritionRecs = await getNutritionPlan(breedResult);
          const reproductiveBenefits = await getReproductiveBenefits(breedResult);

          resolve({
            ...breedResult,
            ...breedingRecs,
            ...nutritionRecs,
            ...reproductiveBenefits
          });
        } else {
          // If no API key, fall back to mock data
          resolve({
            ...breedResult,
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
        }
      } catch (error) {
        console.error("Error generating AI recommendations:", error);
        // Fall back to mock data if there's an error
        resolve({
          ...breedResult,
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
      }
    }, 2000);
  });
}

export async function mockSendChatMessage(message: string): Promise<string> {
  if (geminiApiKey) {
    return sendChatMessage(message);
  }

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
