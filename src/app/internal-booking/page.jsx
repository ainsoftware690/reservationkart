'use client';

import { useState } from 'react';

export default function InternalBooking() {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeEmail: '',
    phone: '',
    destination: 'Dubai',
    amount: 50000,
    bookingDetails: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/payu/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert('Error: ' + data.error);
        setLoading(false);
        return;
      }

      // PayU form create aur submit karo
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = process.env.NEXT_PUBLIC_PAYU_API_URL;

      const fields = {
        key: data.key,
        txnid: data.txnid,
        hash: data.hash,
        amount: data.amount,
        productinfo: data.productinfo,
        firstname: data.firstname,
        email: data.email,
        phone: data.phone,
        surl: `${window.location.origin}/internal-booking/success`,
        furl: `${window.location.origin}/internal-booking/failed`,
        service_provider: 'payu_paisa',
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment process failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Flight Booking</h1>
        <p className="text-sm text-gray-500 mb-6">🔒 Internal office use only</p>

        <form onSubmit={handlePayment} className="space-y-4">
          {/* Employee Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Employee Name
            </label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="employeeEmail"
              value={formData.employeeEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="john@earthconn.com"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="9999999999"
              required
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Destination
            </label>
            <select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option>Dubai</option>
              <option>USA</option>
              <option>UK</option>
              <option>Singapore</option>
              <option>Saudi Arabia</option>
              <option>Qatar</option>
            </select>
          </div>

          {/* Booking Details */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Booking Details
            </label>
            <textarea
              name="bookingDetails"
              value={formData.bookingDetails}
              onChange={handleChange}
              placeholder="Departure: 15 June, Airline: Emirates..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              rows={3}
            />
          </div>

          {/* Amount */}
          <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
            <p className="text-sm text-gray-600">Total Amount (INR)</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-blue-600">
                ₹{formData.amount.toLocaleString()}
              </span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="ml-auto w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                min="1000"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition duration-200"
          >
            {loading ? '⏳ Processing...' : '💳 Pay & Confirm Booking'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-4">
          Powered by PayU
        </p>
      </div>
    </div>
  );
}