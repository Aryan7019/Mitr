// components/home/FeatureCard.tsx
'use client';

import { motion } from 'framer-motion';

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
  variants?: any;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  emoji, 
  title, 
  description, 
  variants
}) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
      variants={variants}
      whileHover={{ y: -5 }}
    >
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;