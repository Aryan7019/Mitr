// components/home/FeaturesGrid.tsx
'use client';

import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

interface Feature {
  emoji: string;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  features: Feature[];
}

const FeaturesGrid: React.FC<FeaturesGridProps> = ({ features }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          emoji={feature.emoji}
          title={feature.title}
          description={feature.description}
          variants={itemVariants}
        />
      ))}
    </motion.div>
  );
};

export default FeaturesGrid;