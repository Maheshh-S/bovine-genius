import { toast } from "sonner";

// Change to your backend URL (default Flask port is 5000)
const API_URL = "http://localhost:5000";

// Your fixed Gemini API key - replace with your actual key
const GEMINI_API_KEY = "YOUR_ACTUAL_GEMINI_API_KEY_HERE";

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

// Removed the dynamic key setting logic since we're using a fixed key

export const getGeminiApiKey = () => {
  return GEMINI_API_KEY;
};

export async function uploadImage(file: File): Promise<BreedResult> {
  try {
    const formData = new FormData();
    // The Flask endpoint expects 'image' as the field name for the file
    formData.append("image", file);
    
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to process image");
    }
    
    const data = await response.json();
    console.log("Backend response:", data);
    
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("Failed to process image. Please try again.");
    throw error;
  }
}

export async function getBreedingRecommendations(breedData: BreedResult): Promise<BreedingRecommendations> {
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
        'x-goog-api-key': GEMINI_API_KEY,
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
        'x-goog-api-key': GEMINI_API_KEY,
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
        'x-goog-api-key': GEMINI_API_KEY,
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
        'x-goog-api-key': GEMINI_API_KEY,
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
  try {
    // Instead of using mock data, we'll now call the real API
    const breedResult = await uploadImage(file);

    // If API key is set, use Gemini to get real recommendations
    if (GEMINI_API_KEY) {
      try {
        const breedingRecs = await getBreedingRecommendations(breedResult);
        const nutritionRecs = await getNutritionPlan(breedResult);
        const reproductiveBenefits = await getReproductiveBenefits(breedResult);

        return {
          ...breedResult,
          ...breedingRecs,
          ...nutritionRecs,
          ...reproductiveBenefits
        };
      } catch (error) {
        console.error("Error generating AI recommendations:", error);
        // If Gemini API fails, fall back to basic response with just breed data
        return {
          ...breedResult,
          best_breeding_matches: [],
          nutrition_recommendation: {
            protein_source: [],
            feeding_plan: "Please set a valid Gemini API key to get nutrition recommendations."
          },
          reproductive_benefits: "Please set a valid Gemini API key to get reproductive benefits."
        };
      }
    } else {
      // If no API key, return just the breed data with placeholders
      return {
        ...breedResult,
        best_breeding_matches: [],
        nutrition_recommendation: {
          protein_source: [],
          feeding_plan: "Please set a Gemini API key to get nutrition recommendations."
        },
        reproductive_benefits: "Please set a Gemini API key to get reproductive benefits."
      };
    }
  } catch (error) {
    console.error("Error in mockUploadImage:", error);
    throw error;
  }
}

export async function mockSendChatMessage(message: string): Promise<string> {
  // Always use the real Gemini API now
  return sendChatMessage(message);
}
