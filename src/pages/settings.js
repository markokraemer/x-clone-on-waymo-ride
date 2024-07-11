import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useToast from '@/hooks/useToast';

const Settings = () => {
  const { user, updateUser } = useUser();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [notifications, setNotifications] = useState(user?.preferences?.notifications || true);
  const [darkMode, setDarkMode] = useState(user?.preferences?.darkMode || false);
  const [emailNotifications, setEmailNotifications] = useState(user?.preferences?.emailNotifications || true);
  const [pushNotifications, setPushNotifications] = useState(user?.preferences?.pushNotifications || true);
  const [language, setLanguage] = useState(user?.preferences?.language || 'en');
  const [privacyLevel, setPrivacyLevel] = useState(user?.preferences?.privacyLevel || 'public');
  const { showToast } = useToast();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio || '');
      setNotifications(user.preferences?.notifications || true);
      setDarkMode(user.preferences?.darkMode || false);
      setEmailNotifications(user.preferences?.emailNotifications || true);
      setPushNotifications(user.preferences?.pushNotifications || true);
      setLanguage(user.preferences?.language || 'en');
      setPrivacyLevel(user.preferences?.privacyLevel || 'public');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      ...user,
      name,
      bio,
      preferences: {
        ...user.preferences,
        notifications,
        darkMode,
        emailNotifications,
        pushNotifications,
        language,
        privacyLevel,
      },
    });
    showToast("Success", "Settings updated successfully!", "default");
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Enable Notifications</Label>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <Switch
                  id="emailNotifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <Switch
                  id="pushNotifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode">Dark Mode</Label>
                <Switch
                  id="darkMode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="privacyLevel">Privacy Level</Label>
                <Select value={privacyLevel} onValueChange={setPrivacyLevel}>
                  <SelectTrigger id="privacyLevel">
                    <SelectValue placeholder="Select privacy level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="friends">Friends Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upgrade to X49 Pro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Get access to all features for just $49/year!</p>
            <ul className="list-disc list-inside mb-4">
              <li>Unlimited posts</li>
              <li>Ad-free experience</li>
              <li>Priority support</li>
              <li>Early access to new features</li>
            </ul>
            <Button size="lg" className="w-full">Upgrade Now for $49</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;