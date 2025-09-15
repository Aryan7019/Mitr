// app/api/book-consultation/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Mock email sending function - replace with your actual email service
const sendEmail = async (to: string, subject: string, html: string) => {
  console.log(`Sending email to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Content: ${html}`);
  // In a real implementation, you would use Resend, SendGrid, etc.
  return Promise.resolve();
};

export async function POST(request: NextRequest) {
  try {
    const { userEmail, userName, date, time, notes, counsellorEmail } = await request.json();

    // Format the date for display
    const appointmentDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Send email to user
    await sendEmail(
      userEmail,
      'Your Consultation Booking Confirmation',
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">Consultation Confirmed</h2>
          <p>Dear ${userName},</p>
          <p>Your mental health consultation has been successfully booked.</p>
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${time}</p>
            ${notes ? `<p><strong>Your notes:</strong> ${notes}</p>` : ''}
          </div>
          <p>You will receive a reminder before your appointment.</p>
          <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
          <br />
          <p>Best regards,<br />Mental Health Support Team</p>
        </div>
      `
    );

    // Send email to counsellor
    await sendEmail(
      counsellorEmail,
      'New Consultation Booking',
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">New Booking Notification</h2>
          <p>You have a new consultation booking:</p>
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p><strong>Client:</strong> ${userName} (${userEmail})</p>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${time}</p>
            ${notes ? `<p><strong>Client notes:</strong> ${notes}</p>` : ''}
          </div>
          <p>Please confirm your availability for this timeslot.</p>
          <br />
          <p>Best regards,<br />Mental Health Support Team</p>
        </div>
      `
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}