
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SettingsForm from '@/components/settings/SettingsForm';
import ProfileForm from '@/components/settings/ProfileForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const Settings = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('settings')}</h1>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">{t('general-settings')}</TabsTrigger>
          <TabsTrigger value="profile">{t('profile-settings')}</TabsTrigger>
          <TabsTrigger value="subscription" className="relative">
            {t('subscription')}
            <Badge variant="secondary" className="ml-2 bg-verde-500 text-white">Free</Badge>
          </TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="general">
            <SettingsForm />
          </TabsContent>
          <TabsContent value="profile">
            <ProfileForm />
          </TabsContent>
          <TabsContent value="subscription">
            <Card className="p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">{t('free-plan')}</h2>
                <p className="text-muted-foreground mb-6">{t('current-plan')}</p>
                <p className="mb-6">{t('upgrade-message')}</p>
                <div>
                  <p className="text-muted-foreground mb-2">{t('to-upgrade')}</p>
                  <p>{t('connect-stripe')}</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
