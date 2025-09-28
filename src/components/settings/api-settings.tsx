'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { 
  ApiProvider, 
  ApiKeyConfig, 
  getStoredApiKeys, 
  addApiKey, 
  deleteApiKey,
  getActiveApiKey 
} from '@/lib/storage';
import { Eye, EyeOff, Key, Trash2, Plus, ExternalLink } from 'lucide-react';

const API_PROVIDERS = [
  {
    id: 'google' as ApiProvider,
    name: 'Google AI (Gemini)',
    description: 'Google\'s Gemini AI models',
    setupUrl: 'https://aistudio.google.com/app/apikey',
    placeholder: 'Enter your Google AI API key...'
  },
  {
    id: 'openai' as ApiProvider,
    name: 'OpenAI',
    description: 'OpenAI\'s GPT models',
    setupUrl: 'https://platform.openai.com/api-keys',
    placeholder: 'Enter your OpenAI API key...'
  },
  {
    id: 'anthropic' as ApiProvider,
    name: 'Anthropic',
    description: 'Anthropic\'s Claude models',
    setupUrl: 'https://console.anthropic.com/settings/keys',
    placeholder: 'Enter your Anthropic API key...'
  }
];

export function ApiSettings() {
  const [apiKeys, setApiKeys] = useState<ApiKeyConfig[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<ApiProvider>('google');
  const [newApiKey, setNewApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setApiKeys(getStoredApiKeys());
  }, []);

  const handleAddApiKey = async () => {
    if (!newApiKey.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter an API key.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const success = addApiKey({
        provider: selectedProvider,
        apiKey: newApiKey.trim(),
        isActive: true,
      });

      if (success) {
        setApiKeys(getStoredApiKeys());
        setNewApiKey('');
        toast({
          title: 'API Key Added',
          description: `${API_PROVIDERS.find(p => p.id === selectedProvider)?.name} API key has been saved successfully.`,
        });
      } else {
        throw new Error('Failed to save API key');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save API key. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteApiKey = (provider: ApiProvider) => {
    const success = deleteApiKey(provider);
    
    if (success) {
      setApiKeys(getStoredApiKeys());
      toast({
        title: 'API Key Deleted',
        description: `${API_PROVIDERS.find(p => p.id === provider)?.name} API key has been removed.`,
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to delete API key.',
        variant: 'destructive',
      });
    }
  };

  const toggleApiKeyVisibility = (provider: string) => {
    setShowApiKey(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };

  const maskApiKey = (apiKey: string) => {
    if (apiKey.length <= 8) return '***';
    return `${apiKey.substring(0, 4)}${'*'.repeat(apiKey.length - 8)}${apiKey.substring(apiKey.length - 4)}`;
  };

  const getProviderInfo = (provider: ApiProvider) => {
    return API_PROVIDERS.find(p => p.id === provider);
  };

  return (
    <div className="space-y-6">
      {/* Add New API Key */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add API Key
          </CardTitle>
          <CardDescription>
            Configure your AI service API keys to enable budget recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="provider">AI Provider</Label>
              <Select value={selectedProvider} onValueChange={(value: ApiProvider) => setSelectedProvider(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {API_PROVIDERS.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      <div>
                        <div className="font-medium">{provider.name}</div>
                        <div className="text-sm text-muted-foreground">{provider.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="apiKey"
                  type="password"
                  value={newApiKey}
                  onChange={(e) => setNewApiKey(e.target.value)}
                  placeholder={getProviderInfo(selectedProvider)?.placeholder}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const url = getProviderInfo(selectedProvider)?.setupUrl;
                    if (url) window.open(url, '_blank');
                  }}
                  title="Get API Key"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleAddApiKey} 
            disabled={isSubmitting}
            className="w-full md:w-auto"
          >
            {isSubmitting ? 'Saving...' : 'Add API Key'}
          </Button>
        </CardContent>
      </Card>

      {/* Existing API Keys */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Configured API Keys
          </CardTitle>
          <CardDescription>
            Manage your existing API keys. Only one key per provider can be active at a time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No API keys configured yet.</p>
              <p className="text-sm">Add an API key above to enable AI features.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((config) => {
                const providerInfo = getProviderInfo(config.provider);
                const isVisible = showApiKey[config.provider];
                
                return (
                  <div key={`${config.provider}-${config.createdAt}`} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <h4 className="font-medium">{providerInfo?.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-sm bg-muted px-2 py-1 rounded">
                              {isVisible ? config.apiKey : maskApiKey(config.apiKey)}
                            </code>
                            {config.isActive && (
                              <Badge variant="secondary" className="text-xs">Active</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Added {new Date(config.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleApiKeyVisibility(config.provider)}
                      >
                        {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete API Key</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the {providerInfo?.name} API key? 
                              This will disable AI features for this provider.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteApiKey(config.provider)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-sm">Security Notice</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• API keys are stored locally in your browser and never sent to our servers.</p>
          <p>• Keys are used only to communicate directly with the AI provider's API.</p>
          <p>• You can delete your API keys at any time.</p>
          <p>• Make sure to keep your API keys secure and don't share them with others.</p>
        </CardContent>
      </Card>
    </div>
  );
}

