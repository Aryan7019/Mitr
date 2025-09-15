'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useToast } from '../../context/ToastContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import BookingModal from '../../components/BookingModal';
import BookingForm from '../../components/BookingForm';
import { MentalHealthData } from '../../types';

const Dashboard = () => {
  const { user } = useUser();
  const { addToast } = useToast();
  const [mentalHealthData, setMentalHealthData] = useState<MentalHealthData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [showBookingForm, setShowBookingForm] = useState<boolean>(false);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  
  // Check if user has a low score that requires professional support
  const hasLowScore = mentalHealthData && mentalHealthData.medicareScore < 50;

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch this data from an API
        const data: MentalHealthData = {
          medicareScore: 70,
          anxietyLevel: 4,
          stressLevel: 6,
          sleepQuality: 3,
          moodScore: 5,
          insights: [
            "You've been sleeping less than 6 hours. Try to get 7-9 hours of sleep.",
            "You reported feeling down 3 days last week. Consider talking to someone.",
            "Your physical activity has decreased by 20% compared to last month."
          ],
        };
        
        // Check if there's a new score in localStorage (set by questionnaire)
        const newScore = localStorage.getItem('latestAssessmentScore');
        if (newScore) {
          const scoreValue = parseInt(newScore);
          data.medicareScore = 100 - scoreValue * 2; // Convert to a score out of 100
          localStorage.removeItem('latestAssessmentScore');
          
          // Show booking modal if score is low
          if (scoreValue > 25) { // Assuming higher score means more issues
            setShowBookingModal(true);
          }
          
          addToast('Your assessment score has been updated!', 'success');
        }
        
        setMentalHealthData(data);
      } catch (error) {
        addToast('Failed to load dashboard data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [addToast]);

  const handleFeatureClick = (featureName: string): void => {
    addToast(`${featureName} feature is coming soon!`, 'info');
  };

  const handleBookConsultation = () => {
    setShowBookingForm(true);
  };

  const handleConfirmBooking = async (bookingData: { date: string; time: string; notes: string }) => {
    setBookingLoading(true);
    
    try {
      // In a real application, you would send this data to your backend
      // and then send emails from there
      const response = await fetch('/api/book-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
          date: bookingData.date,
          time: bookingData.time,
          notes: bookingData.notes,
          counsellorEmail: 'counsellor@example.com', // Default counsellor email
        }),
      });
      
      if (response.ok) {
        addToast('Consultation booked successfully! Confirmation sent to your email.', 'success');
        setShowBookingForm(false);
        setShowBookingModal(false);
      } else {
        throw new Error('Failed to book consultation');
      }
    } catch (error) {
      addToast('Failed to book consultation. Please try again.', 'error');
    } finally {
      setBookingLoading(false);
    }
  };

  const handleBookingModalConfirm = () => {
    setShowBookingModal(false);
    setShowBookingForm(true);
  };

  const handleBookingModalCancel = () => {
    setShowBookingModal(false);
  };

  if (loading || !mentalHealthData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 via-purple-100/10 to-blue-100/20 z-0"></div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Welcome back, {user?.fullName || 'User'}!
          </h1>
          <div className="flex space-x-4">
            <motion.button 
              onClick={handleBookConsultation}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium shadow-md"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Book Consultation
            </motion.button>
            <Link href="/questionnaire">
              <motion.button 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow-md"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Take Assessment
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Mental Health Score Cards */}
          <motion.div 
            className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-md"
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.2)",
              transition: { duration: 0.3 }
            }}
            onHoverStart={() => setHoveredCard(1)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Medicare Score</h2>
            <div className="flex items-end justify-between">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">{mentalHealthData.medicareScore}/100</div>
              <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                mentalHealthData.medicareScore >= 70 ? 'bg-green-100 text-green-800' : 
                mentalHealthData.medicareScore >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {mentalHealthData.medicareScore >= 70 ? 'Good' : mentalHealthData.medicareScore >= 50 ? 'Fair' : 'Needs Attention'}
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${mentalHealthData.medicareScore}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.div>
            </div>
            <p className="mt-2 text-sm text-gray-600">Your overall mental wellness score</p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-2xl border border-amber-100 shadow-md"
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.2)",
              transition: { duration: 0.3 }
            }}
            onHoverStart={() => setHoveredCard(2)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Anxiety Level</h2>
            <div className="flex items-end justify-between">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">{mentalHealthData.anxietyLevel}/10</div>
              <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                mentalHealthData.anxietyLevel <= 3 ? 'bg-green-100 text-green-800' : 
                mentalHealthData.anxietyLevel <= 6 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {mentalHealthData.anxietyLevel <= 3 ? 'Low' : mentalHealthData.anxietyLevel <= 6 ? 'Moderate' : 'High'}
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${mentalHealthData.anxietyLevel * 10}%` }}
                transition={{ duration: 1, delay: 0.7 }}
              ></motion.div>
            </div>
            <p className="mt-2 text-sm text-gray-600">Based on your recent responses</p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md"
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.2)",
              transition: { duration: 0.3 }
            }}
            onHoverStart={() => setHoveredCard(3)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Mood Score</h2>
            <div className="flex items-end justify-between">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">{mentalHealthData.moodScore}/10</div>
              <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                mentalHealthData.moodScore >= 7 ? 'bg-green-100 text-green-800' : 
                mentalHealthData.moodScore >= 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {mentalHealthData.moodScore >= 7 ? 'Positive' : mentalHealthData.moodScore >= 5 ? 'Neutral' : 'Low'}
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${mentalHealthData.moodScore * 10}%` }}
                transition={{ duration: 1, delay: 0.9 }}
              ></motion.div>
            </div>
            <p className="mt-2 text-sm text-gray-600">Recent mood average</p>
          </motion.div>

          {/* Stress Level Card */}
          <motion.div 
            className="bg-white p-6 rounded-2xl border border-rose-100 shadow-md"
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 25px -5px rgba(244, 63, 94, 0.2)",
              transition: { duration: 0.3 }
            }}
            onHoverStart={() => setHoveredCard(4)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Stress Level</h2>
            <div className="flex items-end justify-between">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-red-600">{mentalHealthData.stressLevel}/10</div>
              <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                mentalHealthData.stressLevel <= 3 ? 'bg-green-100 text-green-800' : 
                mentalHealthData.stressLevel <= 6 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {mentalHealthData.stressLevel <= 3 ? 'Low' : mentalHealthData.stressLevel <= 6 ? 'Moderate' : 'High'}
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-rose-500 to-red-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${mentalHealthData.stressLevel * 10}%` }}
                transition={{ duration: 1, delay: 1.1 }}
              ></motion.div>
            </div>
            <p className="mt-2 text-sm text-gray-600">Current stress indicators</p>
          </motion.div>

          {/* Sleep Quality Card */}
          <motion.div 
            className="bg-white p-6 rounded-2xl border border-blue-100 shadow-md"
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)",
              transition: { duration: 0.3 }
            }}
            onHoverStart={() => setHoveredCard(5)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Sleep Quality</h2>
            <div className="flex items-end justify-between">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">{mentalHealthData.sleepQuality}/10</div>
              <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                mentalHealthData.sleepQuality >= 7 ? 'bg-green-100 text-green-800' : 
                mentalHealthData.sleepQuality >= 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {mentalHealthData.sleepQuality >= 7 ? 'Good' : mentalHealthData.sleepQuality >= 5 ? 'Fair' : 'Poor'}
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${mentalHealthData.sleepQuality * 10}%` }}
                transition={{ duration: 1, delay: 1.3 }}
              ></motion.div>
            </div>
            <p className="mt-2 text-sm text-gray-600">Recent sleep patterns</p>
          </motion.div>

          {/* Personalized Insights */}
          <motion.div 
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md md:col-span-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Personalized Insights</h2>
            <div className="space-y-3">
              {mentalHealthData.insights.map((insight, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start p-3 bg-indigo-50 rounded-xl border border-indigo-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.7 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 h-5 w-5 text-indigo-600 mt-1">•</div>
                  <p className="ml-2 text-gray-700">{insight}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200 shadow-md text-center cursor-pointer"
            onClick={() => handleFeatureClick('AI Chat')}
            whileHover={{ 
              y: -5, 
              scale: 1.02,
              boxShadow: "0 15px 30px -5px rgba(99, 102, 241, 0.2)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="text-4xl mb-4"
              animate={{ rotate: hoveredCard === 6 ? [0, 10, -10, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              🤖
            </motion.div>
            <h3 className="text-lg font-semibold text-gray-800">AI Chat Companion</h3>
            <p className="text-gray-600 mt-2">Chat with our AI companion for immediate support</p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-2xl border border-pink-200 shadow-md text-center cursor-pointer"
            onClick={() => handleFeatureClick('VR Therapy')}
            whileHover={{ 
              y: -5, 
              scale: 1.02,
              boxShadow: "0 15px 30px -5px rgba(236, 72, 153, 0.2)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="text-4xl mb-4"
              animate={{ y: hoveredCard === 7 ? [0, -5, 0] : 0 }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🥽
            </motion.div>
            <h3 className="text-lg font-semibold text-gray-800">VR Therapy</h3>
            <p className="text-gray-600 mt-2">Experience immersive therapeutic environments</p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-2xl border border-teal-200 shadow-md text-center cursor-pointer"
            onClick={() => handleFeatureClick('Community')}
            whileHover={{ 
              y: -5, 
              scale: 1.02,
              boxShadow: "0 15px 30px -5px rgba(16, 185, 129, 0.2)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="text-4xl mb-4"
              animate={{ scale: hoveredCard === 8 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              👥
            </motion.div>
            <h3 className="text-lg font-semibold text-gray-800">Community Support</h3>
            <p className="text-gray-600 mt-2">Connect with peers in a safe environment</p>
          </motion.div>
        </motion.div>
        
      {showBookingModal && (
          <BookingModal
            onConfirm={handleBookingModalConfirm}
            onCancel={handleBookingModalCancel}
            score={mentalHealthData.medicareScore}
          />
        )}

        {/* Booking Form */}
        {showBookingForm && (
          <BookingForm
            onSubmit={handleConfirmBooking}
            onCancel={() => setShowBookingForm(false)}
            loading={bookingLoading}
            userEmail={user?.primaryEmailAddress?.emailAddress || ''}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;