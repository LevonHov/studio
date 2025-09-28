import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { getActiveApiKey, ApiProvider } from './storage';

// Create AI client with user's API key
export function createAIClient(provider: ApiProvider = 'google') {
  const apiKeyConfig = getActiveApiKey(provider);
  
  if (!apiKeyConfig) {
    throw new Error(`No API key found for ${provider}. Please configure your API key in Settings.`);
  }

  switch (provider) {
    case 'google':
      return genkit({
        plugins: [
          googleAI({
            apiKey: apiKeyConfig.apiKey,
          })
        ],
        model: 'googleai/gemini-2.5-flash',
      });
    
    case 'openai':
      // For future OpenAI integration
      throw new Error('OpenAI integration coming soon!');
    
    case 'anthropic':
      // For future Anthropic integration
      throw new Error('Anthropic integration coming soon!');
    
    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
}

// Check if any API key is configured
export function hasConfiguredApiKey(): boolean {
  const googleKey = getActiveApiKey('google');
  const openaiKey = getActiveApiKey('openai');
  const anthropicKey = getActiveApiKey('anthropic');
  
  return !!(googleKey || openaiKey || anthropicKey);
}

// Get the first available configured provider
export function getFirstAvailableProvider(): ApiProvider | null {
  if (getActiveApiKey('google')) return 'google';
  if (getActiveApiKey('openai')) return 'openai';
  if (getActiveApiKey('anthropic')) return 'anthropic';
  return null;
}

