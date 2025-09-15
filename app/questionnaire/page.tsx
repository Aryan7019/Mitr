// app/questionnaire/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useToast } from '../../context/ToastContext';

// Define types
interface Question {
  id: number;
  text: string;
  options: { value: number; text: string }[];
}

const Questionnaire = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const questions: Question[] = [
    {
      id: 1,
      text: "How often have you felt little interest or pleasure in doing things?",
      options: [
        { value: 0, text: "Not at all" },
        { value: 1, text: "Several days" },
        { value: 2, text: "More than half the days" },
        { value: 3, text: "Nearly every day" }
      ]
    },
    {
      id: 2,
      text: "How often have you felt down, depressed, or hopeless?",
      options: [
        { value: 0, text: "Not at all" },
        { value: 1, text: "Several days" },
        { value: 2, text: "More than half the days" },
        { value: 3, text: "Nearly every day" }
      ]
    },
    {
      id: 3,
      text: "How often have you had trouble falling or staying asleep, or sleeping too much?",
      options: [
        { value: 0, text: "Not at all" },
        { value: 1, text: "Several days" },
        { value: 2, text: "More than half the days" },
        { value: 3, text: "Nearly every day" }
      ]
    },
    {
      id: 4,
      text: "How often have you felt tired or had little energy?",
      options: [
        { value: 0, text: "Not at all" },
        { value: 1, text: "Several days" },
        { value: 2, text: "More than half the days" },
        { value: 3, text: "Nearly every day" }
      ]
    },
    {
      id: 5,
      text: "How often have you had poor appetite or overeaten?",
      options: [
        { value: 0, text: "Not at all" },
        { value: 1, text: "Several days" },
        { value: 2, text: "More than half the days" },
        { value: 3, text: "Nearly every day" }
      ]
    }
  ];

  const handleAnswer = (value: number): void => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const totalScore = Object.values(newAnswers).reduce((sum, value) => sum + value, 0);
      setScore(totalScore);
      
      // Store score in localStorage for dashboard to use
      localStorage.setItem('latestAssessmentScore', totalScore.toString());
      
      // Show booking modal if score is high
      if (totalScore >= 10) {
        setShowModal(true);
      } else {
        addToast(`Your score is ${totalScore}. You are doing well!`, 'success');
        router.push('/dashboard');
      }
    }
  };

  const handleBooking = async (): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make API calls here
      console.log('Sending alert email to counselor@example.com');
      console.log('Sending confirmation email to student');
      
      addToast('Booking confirmed! Check your email for confirmation.', 'success');
      router.push('/dashboard');
    } catch (error) {
      addToast('Failed to book appointment. Please try again.', 'error');
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-indigo-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-indigo-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {questions[currentQuestion].text}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(option.value)}
            >
              <span className="text-gray-700">{option.text}</span>
            </motion.button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 text-indigo-600 disabled:text-gray-400 disabled:cursor-not-allowed"
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          
          <span className="text-sm text-gray-500 py-2">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
      </motion.div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Support Recommended</h3>
            <p className="text-gray-600 mb-6">
              Based on your assessment score of {score}, we recommend speaking with one of our mental health professionals.
              Would you like to book an appointment?
            </p>
            
            <div className="flex gap-4 justify-end">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                onClick={() => {
                  setShowModal(false);
                  router.push('/dashboard');
                }}
                disabled={loading}
              >
                Maybe Later
              </button>
              
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                onClick={handleBooking}
                disabled={loading}
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;