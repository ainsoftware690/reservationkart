import { AIRPORTS } from './airports';

const AIRLINES = [
  { code: 'AI', name: 'Air India',        color: '#E31837' },
  { code: '6E', name: 'IndiGo',           color: '#0D4DA8' },
  { code: 'SG', name: 'SpiceJet',         color: '#A50034' },
  { code: 'UK', name: 'Vistara',          color: '#4B286D' },
  { code: 'QP', name: 'Akasa Air',        color: '#FF6B00' },
  { code: 'EK', name: 'Emirates',         color: '#D71920' },
  { code: 'QR', name: 'Qatar Airways',    color: '#5C0F2F' },
  { code: 'EY', name: 'Etihad',           color: '#BD8B5E' },
  { code: 'SQ', name: 'Singapore Airlines',color: '#1B3668' },
  { code: 'BA', name: 'British Airways',  color: '#075AAA' },
  { code: 'LH', name: 'Lufthansa',        color: '#05164D' },
  { code: 'AA', name: 'American Airlines',color: '#0078D2' },
  { code: 'DL', name: 'Delta',            color: '#003366' },
  { code: 'UA', name: 'United',           color: '#002244' },
  { code: 'TG', name: 'Thai Airways',     color: '#582C83' },
  { code: 'CX', name: 'Cathay Pacific',   color: '#006564' },
  { code: 'TK', name: 'Turkish Airlines', color: '#C70A0C' },
];

const TRAVEL_CLASSES = ['Economy', 'Premium Economy', 'Business', 'First'];

// Seeded random — deterministic (same seed = same output, no hydration mismatch)
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const formatTime = (minutes) => {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

export const generateFlights = (count = 520) => {
  const flights = [];

  for (let i = 0; i < count; i++) {
    const fromIdx = Math.floor(seededRandom(i * 7.13)  * AIRPORTS.length);
    const toIdx   = Math.floor(seededRandom(i * 11.37) * AIRPORTS.length);
    if (fromIdx === toIdx) continue;

    const airline      = AIRLINES[Math.floor(seededRandom(i * 3.91) * AIRLINES.length)];
    const departureMin = Math.floor(seededRandom(i * 5.27) * 24 * 60);
    const durationMin  = 60 + Math.floor(seededRandom(i * 9.83) * 720);
    const arrivalMin   = departureMin + durationMin;
    const stops        = seededRandom(i * 13.7) > 0.6 ? (seededRandom(i * 17.1) > 0.5 ? 2 : 1) : 0;
    const travelClass  = TRAVEL_CLASSES[Math.floor(seededRandom(i * 19.3) * TRAVEL_CLASSES.length)];
  const basePrice = 25 + Math.floor(seededRandom(i * 23.9) * 600);

    flights.push({
      id:           `FL${String(i + 1).padStart(5, '0')}`,
      flightNumber: `${airline.code}${100 + (i % 9000)}`,
      airline,
      from:         AIRPORTS[fromIdx],
      to:           AIRPORTS[toIdx],
      departureTime:formatTime(departureMin),
      arrivalTime:  formatTime(arrivalMin),
      duration:     formatDuration(durationMin),
      durationMinutes: durationMin,
      stops,
      stopCities:   stops > 0 ? [AIRPORTS[(fromIdx + 5) % AIRPORTS.length].city] : [],
      class:        travelClass,
      price:        basePrice,
      seatsLeft:    1 + Math.floor(seededRandom(i * 29.7) * 30),
      refundable:   seededRandom(i * 31.3) > 0.5,
      baggage:      { cabin: '7 kg', checkin: '15 kg' },
    });
  }

  return flights;
};

export const DUMMY_FLIGHTS = generateFlights(520);

export const searchFlights = ({ from, to }) =>
  DUMMY_FLIGHTS
    .filter((f) => (!from || f.from.code === from) && (!to || f.to.code === to))
    .sort((a, b) => a.price - b.price);