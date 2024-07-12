import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const PricingCard = () => {
  const router = useRouter();

  const features = [
    'Unlimited posts',
    'Ad-free experience',
    'Priority support',
    'Early access to new features',
    'Secure payments',
    'Advanced analytics'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-sm mx-auto overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-2xl">X49 Pro</CardTitle>
          <CardDescription className="text-primary-foreground/80">All-in-one solution for just $49/year</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-4xl font-bold mb-4">$49<span className="text-lg font-normal">/year</span></div>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <motion.li 
                key={index} 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Check className="h-5 w-5 text-green-500 mr-2" />
                {feature}
              </motion.li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => router.push('/checkout')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upgrade to Pro
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PricingCard;