import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { ApiSettings } from '@/components/settings/api-settings';
import { ApiKeyGuide } from '@/components/settings/api-key-guide';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>
              Configure your AI service API keys to enable personalized budget recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApiSettings />
          </CardContent>
        </Card>

        <div>
          <ApiKeyGuide />
        </div>
      </div>
    </div>
  );
}

