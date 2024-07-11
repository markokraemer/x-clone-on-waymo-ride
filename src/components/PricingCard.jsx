import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Check } from 'lucide-react';

const PricingCard = () => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">X49 Pro</CardTitle>
        <CardDescription>All-in-one solution for just $49/year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-4">$49<span className="text-lg font-normal">/year</span></div>
        <ul className="space-y-2">
          {['Unlimited posts', 'Ad-free experience', 'Priority support', 'Early access to new features', 'Secure payments', 'Advanced analytics'].map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Upgrade to Pro</Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;