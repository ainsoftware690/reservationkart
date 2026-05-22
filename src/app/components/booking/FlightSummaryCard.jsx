import { Plane, Clock, Briefcase } from 'lucide-react';

export default function FlightSummaryCard({ flight }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: flight.airline.color }}
        >
          {flight.airline.code}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-bold text-brand-dark truncate">{flight.airline.name}</div>
          <div className="text-xs text-gray-500">
            {flight.flightNumber} • {flight.class}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 items-center">
        <div>
          <div className="text-xl sm:text-2xl font-bold text-brand-dark">
            {flight.departureTime}
          </div>
          <div className="text-xs sm:text-sm font-semibold text-gray-700 mt-1">
            {flight.from.code}
          </div>
          <div className="text-xs text-gray-500 truncate">{flight.from.city}</div>
        </div>

        <div className="text-center">
          <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center justify-center gap-1">
            <Clock className="h-3 w-3" />
            {flight.duration}
          </div>
          <div className="relative my-2">
            <div className="h-px bg-gray-300" />
            <Plane className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-brand-orange-500 bg-white" />
          </div>
          <div className="text-xs text-gray-500">
            {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl sm:text-2xl font-bold text-brand-dark">
            {flight.arrivalTime}
          </div>
          <div className="text-xs sm:text-sm font-semibold text-gray-700 mt-1">
            {flight.to.code}
          </div>
          <div className="text-xs text-gray-500 truncate">{flight.to.city}</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-600 flex-wrap">
        <span className="flex items-center gap-1">
          <Briefcase className="h-3 w-3" />
          {flight.baggage.checkin} check-in
        </span>
        <span className="text-gray-300">|</span>
        <span>{flight.baggage.cabin} cabin</span>
        {flight.refundable && (
          <>
            <span className="text-gray-300">|</span>
            <span className="text-green-600 font-semibold">Refundable</span>
          </>
        )}
      </div>
    </div>
  );
}