import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Key, Shield, Zap } from 'lucide-react';

export function ApiKeyGuide() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            How to Get Your API Key
          </CardTitle>
          <CardDescription>
            Follow these simple steps to get your Google AI API key for free
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                1
              </div>
              <div className="space-y-1">
                <p className="font-medium">Visit Google AI Studio</p>
                <p className="text-sm text-muted-foreground">
                  Go to Google AI Studio and sign in with your Google account
                </p>
                <Button asChild variant="outline" size="sm">
                  <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open Google AI Studio
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                2
              </div>
              <div className="space-y-1">
                <p className="font-medium">Create API Key</p>
                <p className="text-sm text-muted-foreground">
                  Click "Create API Key" button and select your Google Cloud project (or create a new one)
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                3
              </div>
              <div className="space-y-1">
                <p className="font-medium">Copy Your Key</p>
                <p className="text-sm text-muted-foreground">
                  Copy the generated API key and paste it in the form above
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="h-4 w-4 text-amber-500" />
              Free Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Google AI offers generous free usage limits for Gemini models
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-green-500" />
              Secure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your API key is stored locally in your browser and never sent to our servers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Key className="h-4 w-4 text-blue-500" />
              Your Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You can delete or change your API key at any time through the settings
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
