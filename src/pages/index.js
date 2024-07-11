import Layout from '@/components/Layout';
import Feed from '@/components/Feed';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Your Feed</h2>
          <Feed />
        </div>
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Welcome to X49</CardTitle>
              <CardDescription>The everything app for just $49/year</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Experience social media, messaging, and payments in one place.</p>
              <Button className="w-full">Get Started for $49</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Social media posting</li>
                <li>Instant messaging</li>
                <li>Secure payments</li>
                <li>Ad-free experience</li>
                <li>Priority support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}