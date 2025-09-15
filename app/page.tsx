// app/page.tsx
'use client';

import HeroSection from '../components/home/HeroSection';
import FeaturesGrid from '../components/home/FeaturesGrid';
import { FEATURES } from '../constants/features';

// Modular section components defined in the same file
const WhyChooseSection = () => (
  <div className="mt-16 text-center">
    <h2 className="text-3xl font-bold text-indigo-800 mb-4">Why Choose MITR?</h2>
    <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
      Our platform combines cutting-edge technology with evidence-based practices 
      to provide comprehensive mental health support tailored to your needs.
    </p>
    
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <FeatureCard 
        title="Privacy First"
        description="Your data is encrypted and secure. We prioritize your privacy above all else."
      />
      <FeatureCard 
        title="24/7 Support"
        description="Access support whenever you need it, day or night, from anywhere."
      />
    </div>
  </div>
);

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="container mx-auto px-4 py-16">
      {children}
    </div>
  </div>
);

export default function Home() {
  return (
    <Container>
      <HeroSection 
        title="MITR"
        subtitle="A Friend for Well-being - Your Mental Wellness Companion"
      />
      
      <FeaturesGrid features={FEATURES} />
      
      <WhyChooseSection />
    </Container>
  );
}