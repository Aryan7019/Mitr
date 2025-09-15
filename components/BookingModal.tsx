'use client';

import { BookingModalProps } from '../types';

const BookingModal: React.FC<BookingModalProps> = ({ onConfirm, onCancel, score, loading = false }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Professional Support Recommended</h2>
        <p className="mb-4">
          Your assessment score is {score}, which suggests you might benefit from speaking with a mental health professional.
        </p>
        <p className="mb-6">
          Would you like to book a session with one of our certified counselors?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            No, thanks
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Booking...' : 'Yes, book now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;