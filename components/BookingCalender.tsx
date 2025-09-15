// components/BookingCalendar.tsx
'use client';

import { useState } from 'react';

interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

interface BookingCalendarProps {
  onSelectSlot: (date: string, time: string) => void;
  selectedDate?: string;
  selectedTime?: string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ 
  onSelectSlot, 
  selectedDate, 
  selectedTime 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Generate sample time slots for the next 7 days
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const days = 7;
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let i = 0; i < days; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      
      for (let hour = startHour; hour < endHour; hour++) {
        // Only show slots on weekdays
        if (date.getDay() !== 0 && date.getDay() !== 6) {
          const timeString = `${hour}:00 - ${hour + 1}:00`;
          const dateString = date.toISOString().split('T')[0];
          
          slots.push({
            date: dateString,
            time: timeString,
            available: Math.random() > 0.3 
          });
        }
      }
    }
    
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  const uniqueDates = Array.from(new Set(timeSlots.map(slot => slot.date))).sort();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-4">Select a Date and Time</h3>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {uniqueDates.map(date => (
          <div key={date} className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">{formatDate(date)}</h4>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots
                .filter(slot => slot.date === date)
                .map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => slot.available && onSelectSlot(slot.date, slot.time)}
                    disabled={!slot.available}
                    className={`p-2 rounded text-sm ${
                      selectedDate === slot.date && selectedTime === slot.time
                        ? 'bg-indigo-600 text-white'
                        : slot.available
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingCalendar;