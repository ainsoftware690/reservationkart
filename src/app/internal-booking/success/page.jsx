import Link from 'next/link';

export default function BookingSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="text-center bg-white rounded-lg shadow-xl p-8 max-w-md">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-gray-600 mb-2">
          Flight booking has been successfully processed.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Confirmation email will be sent shortly.
        </p>
        <Link
          href="/internal-booking"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
        >
          New Booking
        </Link>
      </div>
    </div>
  );
}