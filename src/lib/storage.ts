import { Category, Expense } from './types';

const STORAGE_KEYS = {
  EXPENSES: 'budgetwise_expenses',
  CATEGORIES: 'budgetwise_categories',
  API_KEYS: 'budgetwise_api_keys',
} as const;

export type ApiProvider = 'google' | 'openai' | 'anthropic';

export interface ApiKeyConfig {
  provider: ApiProvider;
  apiKey: string;
  isActive: boolean;
  createdAt: string;
}

// Simple localStorage wrapper with error handling
class Storage {
  private isClient = typeof window !== 'undefined';

  get<T>(key: string, defaultValue: T): T {
    if (!this.isClient) return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage for key ${key}:`, error);
      return defaultValue;
    }
  }

  set<T>(key: string, value: T): boolean {
    if (!this.isClient) return false;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage for key ${key}:`, error);
      return false;
    }
  }

  remove(key: string): boolean {
    if (!this.isClient) return false;
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage for key ${key}:`, error);
      return false;
    }
  }
}

const storage = new Storage();

// Expense management functions
export function getStoredExpenses(): Expense[] {
  return storage.get(STORAGE_KEYS.EXPENSES, []);
}

export function saveExpenses(expenses: Expense[]): boolean {
  return storage.set(STORAGE_KEYS.EXPENSES, expenses);
}

export function addExpense(expense: Expense): boolean {
  const expenses = getStoredExpenses();
  expenses.unshift(expense); // Add to beginning for recent-first order
  return saveExpenses(expenses);
}

export function updateExpense(updatedExpense: Expense): boolean {
  const expenses = getStoredExpenses();
  const index = expenses.findIndex(exp => exp.id === updatedExpense.id);
  
  if (index === -1) return false;
  
  expenses[index] = updatedExpense;
  return saveExpenses(expenses);
}

export function deleteExpense(expenseId: string): boolean {
  const expenses = getStoredExpenses();
  const filteredExpenses = expenses.filter(exp => exp.id !== expenseId);
  return saveExpenses(filteredExpenses);
}

// Category management functions
export function getStoredCategories(): Category[] {
  return storage.get(STORAGE_KEYS.CATEGORIES, []);
}

export function saveCategories(categories: Category[]): boolean {
  return storage.set(STORAGE_KEYS.CATEGORIES, categories);
}

export function addCategory(category: Category): boolean {
  const categories = getStoredCategories();
  categories.push(category);
  return saveCategories(categories);
}

export function updateCategory(updatedCategory: Category): boolean {
  const categories = getStoredCategories();
  const index = categories.findIndex(cat => cat.id === updatedCategory.id);
  
  if (index === -1) return false;
  
  categories[index] = updatedCategory;
  return saveCategories(categories);
}

export function deleteCategory(categoryId: string): boolean {
  const categories = getStoredCategories();
  const filteredCategories = categories.filter(cat => cat.id !== categoryId);
  return saveCategories(filteredCategories);
}

// Initialize with mock data if no data exists
export function initializeStorage(mockExpenses: Expense[], mockCategories: Category[]): void {
  const existingExpenses = getStoredExpenses();
  const existingCategories = getStoredCategories();
  
  if (existingExpenses.length === 0) {
    saveExpenses(mockExpenses);
  }
  
  if (existingCategories.length === 0) {
    saveCategories(mockCategories);
  }
}

// API Key management functions
export function getStoredApiKeys(): ApiKeyConfig[] {
  return storage.get(STORAGE_KEYS.API_KEYS, []);
}

export function saveApiKeys(apiKeys: ApiKeyConfig[]): boolean {
  return storage.set(STORAGE_KEYS.API_KEYS, apiKeys);
}

export function addApiKey(config: Omit<ApiKeyConfig, 'createdAt'>): boolean {
  const apiKeys = getStoredApiKeys();
  
  // Deactivate other keys of the same provider
  const updatedKeys = apiKeys.map(key => 
    key.provider === config.provider 
      ? { ...key, isActive: false }
      : key
  );
  
  // Add new key
  const newApiKey: ApiKeyConfig = {
    ...config,
    createdAt: new Date().toISOString(),
  };
  
  updatedKeys.push(newApiKey);
  return saveApiKeys(updatedKeys);
}

export function updateApiKey(provider: ApiProvider, updates: Partial<ApiKeyConfig>): boolean {
  const apiKeys = getStoredApiKeys();
  const index = apiKeys.findIndex(key => key.provider === provider && key.isActive);
  
  if (index === -1) return false;
  
  apiKeys[index] = { ...apiKeys[index], ...updates };
  return saveApiKeys(apiKeys);
}

export function deleteApiKey(provider: ApiProvider): boolean {
  const apiKeys = getStoredApiKeys();
  const filteredKeys = apiKeys.filter(key => key.provider !== provider);
  return saveApiKeys(filteredKeys);
}

export function getActiveApiKey(provider: ApiProvider): ApiKeyConfig | null {
  const apiKeys = getStoredApiKeys();
  return apiKeys.find(key => key.provider === provider && key.isActive) || null;
}

// Clear all data (useful for testing/reset)
export function clearAllData(): boolean {
  return storage.remove(STORAGE_KEYS.EXPENSES) && 
         storage.remove(STORAGE_KEYS.CATEGORIES) && 
         storage.remove(STORAGE_KEYS.API_KEYS);
}
