import Link from 'next/link';

export default function BookingFailed() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="text-center bg-white rounded-lg shadow-xl p-8 max-w-md">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-3xl font-bold text-red-600 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          Please try again or contact support.
        </p>
        <Link
          href="/internal-booking"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}