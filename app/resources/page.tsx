// app/resources/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Resource } from '../../types';

const ResourcesPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sample resources data
  const resources: Resource[] = [
    { 
      name: "National Mental Health Program", 
      url: "https://www.nimhans.ac.in/national-mental-health-programme-nmhp/", 
      language: "English",
      category: "Government Program",
      description: "Comprehensive mental health initiative by the Government of India"
    },
    { 
      name: "Manodarpan", 
      url: "https://manodarpan.education.gov.in/", 
      language: "Hindi",
      category: "Student Support",
      description: "An initiative to provide psychosocial support to students for their mental health and well-being"
    },
    { 
      name: "Mindfulness Meditation Guide", 
      url: "https://www.mindful.org/meditation/mindfulness-getting-started/", 
      language: "English",
      category: "Self-Help",
      description: "Beginner's guide to mindfulness meditation practices"
    },
    { 
      name: "Yoga for Stress Relief", 
      url: "https://www.youtube.com/watch?v=4pKly2JojMw", 
      language: "Hindi",
      category: "Exercise",
      description: "Yoga routines specifically designed for stress management"
    },
    { 
      name: "Vandrevala Foundation", 
      url: "https://www.vandrevalafoundation.com/", 
      language: "English",
      category: "Crisis Support",
      description: "24/7 mental health helpline and support services"
    },
    { 
      name: "Mental Health Awareness", 
      url: "https://www.mhanational.org/", 
      language: "English",
      category: "Education",
      description: "Resources for understanding and managing mental health conditions"
    },
    { 
      name: "आत्म-सहायता गाइड", 
      url: "https://www.mind.org.in/", 
      language: "Hindi",
      category: "Self-Help",
      description: "मानसिक स्वास्थ्य के लिए स्व-सहायता संसाधन और मार्गदर्शिका"
    },
    { 
      name: "Therapy Worksheets", 
      url: "https://www.therapistaid.com/", 
      language: "English",
      category: "Self-Help",
      description: "Free therapy worksheets and tools for mental health professionals and clients"
    },
    { 
      name: "Sleep Foundation", 
      url: "https://www.sleepfoundation.org/", 
      language: "English",
      category: "Sleep",
      description: "Comprehensive resources for improving sleep quality and addressing sleep disorders"
    }
  ];

  // Get unique languages for filter
  const languages = ['all', ...Array.from(new Set(resources.map(r => r.language)))];
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(resources.map(r => r.category)))];

  // Filter resources based on selected language, category and search query
  const filteredResources = resources.filter(resource => {
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLanguage && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 via-purple-100/10 to-blue-100/20 z-0"></div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Mental Health Resources
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover helpful resources, tools, and information to support your mental health journey. 
            Filter by language or search for specific topics.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-md mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search resources by name, category, or description..."
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full md:w-auto flex flex-col gap-4 md:flex-row">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-gray-700 font-medium">Language:</span>
                <select 
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>
                      {lang === 'all' ? 'All Languages' : lang}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-gray-700 font-medium">Category:</span>
                <select 
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs - Fixed to use proper state */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </motion.div>

        {/* Resources Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                    {resource.category}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                    {resource.language}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{resource.name}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Visit Resource
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No resources found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </motion.div>

        {/* Additional Help Section */}
        <motion.div 
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h2 className="text-2xl font-bold mb-2">Need immediate help?</h2>
              <p className="opacity-90">Contact our support team or emergency services</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+911234567890"
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium text-center hover:bg-gray-100 transition-colors"
              >
                Call Helpline
              </a>
              <a
                href="mailto:support@mentalhealthapp.com"
                className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Email Support
              </a>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ResourcesPage;