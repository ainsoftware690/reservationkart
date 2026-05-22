// 75+ major airports worldwide — autocomplete data source
export const AIRPORTS = [
  // India
  { code: 'DEL', city: 'New Delhi',    name: 'Indira Gandhi International',  country: 'India' },
  { code: 'BOM', city: 'Mumbai',       name: 'Chhatrapati Shivaji Maharaj',  country: 'India' },
  { code: 'BLR', city: 'Bengaluru',    name: 'Kempegowda International',     country: 'India' },
  { code: 'MAA', city: 'Chennai',      name: 'Chennai International',        country: 'India' },
  { code: 'CCU', city: 'Kolkata',      name: 'Netaji Subhas Chandra Bose',   country: 'India' },
  { code: 'HYD', city: 'Hyderabad',    name: 'Rajiv Gandhi International',   country: 'India' },
  { code: 'COK', city: 'Kochi',        name: 'Cochin International',         country: 'India' },
  { code: 'AMD', city: 'Ahmedabad',    name: 'Sardar Vallabhbhai Patel',     country: 'India' },
  { code: 'PNQ', city: 'Pune',         name: 'Pune International',           country: 'India' },
  { code: 'GOI', city: 'Goa',          name: 'Dabolim Airport',              country: 'India' },
  { code: 'JAI', city: 'Jaipur',       name: 'Jaipur International',         country: 'India' },
  { code: 'LKO', city: 'Lucknow',      name: 'Chaudhary Charan Singh',       country: 'India' },
  { code: 'IXC', city: 'Chandigarh',   name: 'Chandigarh International',     country: 'India' },
  { code: 'GAU', city: 'Guwahati',     name: 'Lokpriya Gopinath Bordoloi',   country: 'India' },
  { code: 'TRV', city: 'Trivandrum',   name: 'Trivandrum International',     country: 'India' },
  { code: 'NAG', city: 'Nagpur',       name: 'Dr. Babasaheb Ambedkar',       country: 'India' },
  { code: 'PAT', city: 'Patna',        name: 'Jay Prakash Narayan',          country: 'India' },
  { code: 'BBI', city: 'Bhubaneswar',  name: 'Biju Patnaik International',   country: 'India' },
  { code: 'IDR', city: 'Indore',       name: 'Devi Ahilyabai Holkar',        country: 'India' },
  { code: 'SXR', city: 'Srinagar',     name: 'Srinagar International',       country: 'India' },

  // USA
  { code: 'JFK', city: 'New York',     name: 'John F. Kennedy International',country: 'USA' },
  { code: 'LAX', city: 'Los Angeles',  name: 'Los Angeles International',    country: 'USA' },
  { code: 'ORD', city: 'Chicago',      name: "O'Hare International",         country: 'USA' },
  { code: 'SFO', city: 'San Francisco',name: 'San Francisco International',  country: 'USA' },
  { code: 'MIA', city: 'Miami',        name: 'Miami International',          country: 'USA' },
  { code: 'ATL', city: 'Atlanta',      name: 'Hartsfield-Jackson',           country: 'USA' },
  { code: 'DFW', city: 'Dallas',       name: 'Dallas/Fort Worth',            country: 'USA' },
  { code: 'SEA', city: 'Seattle',      name: 'Seattle-Tacoma',               country: 'USA' },
  { code: 'BOS', city: 'Boston',       name: 'Logan International',          country: 'USA' },
  { code: 'EWR', city: 'Newark',       name: 'Newark Liberty',               country: 'USA' },
  { code: 'LAS', city: 'Las Vegas',    name: 'Harry Reid International',     country: 'USA' },
  { code: 'IAD', city: 'Washington',   name: 'Dulles International',         country: 'USA' },

  // UK & Europe
  { code: 'LHR', city: 'London',       name: 'Heathrow Airport',             country: 'UK' },
  { code: 'LGW', city: 'London',       name: 'Gatwick Airport',              country: 'UK' },
  { code: 'MAN', city: 'Manchester',   name: 'Manchester Airport',           country: 'UK' },
  { code: 'CDG', city: 'Paris',        name: 'Charles de Gaulle',            country: 'France' },
  { code: 'FRA', city: 'Frankfurt',    name: 'Frankfurt Airport',            country: 'Germany' },
  { code: 'MUC', city: 'Munich',       name: 'Munich Airport',               country: 'Germany' },
  { code: 'AMS', city: 'Amsterdam',    name: 'Schiphol Airport',             country: 'Netherlands' },
  { code: 'FCO', city: 'Rome',         name: 'Leonardo da Vinci',            country: 'Italy' },
  { code: 'MAD', city: 'Madrid',       name: 'Barajas Airport',              country: 'Spain' },
  { code: 'BCN', city: 'Barcelona',    name: 'El Prat Airport',              country: 'Spain' },
  { code: 'ZRH', city: 'Zurich',       name: 'Zurich Airport',               country: 'Switzerland' },
  { code: 'IST', city: 'Istanbul',     name: 'Istanbul Airport',             country: 'Turkey' },

  // Middle East
  { code: 'DXB', city: 'Dubai',        name: 'Dubai International',          country: 'UAE' },
  { code: 'AUH', city: 'Abu Dhabi',    name: 'Abu Dhabi International',      country: 'UAE' },
  { code: 'DOH', city: 'Doha',         name: 'Hamad International',          country: 'Qatar' },
  { code: 'RUH', city: 'Riyadh',       name: 'King Khalid International',    country: 'Saudi Arabia' },
  { code: 'JED', city: 'Jeddah',       name: 'King Abdulaziz International', country: 'Saudi Arabia' },
  { code: 'KWI', city: 'Kuwait',       name: 'Kuwait International',         country: 'Kuwait' },
  { code: 'BAH', city: 'Bahrain',      name: 'Bahrain International',        country: 'Bahrain' },
  { code: 'MCT', city: 'Muscat',       name: 'Muscat International',         country: 'Oman' },

  // Asia
  { code: 'SIN', city: 'Singapore',    name: 'Changi Airport',               country: 'Singapore' },
  { code: 'BKK', city: 'Bangkok',      name: 'Suvarnabhumi Airport',         country: 'Thailand' },
  { code: 'HKG', city: 'Hong Kong',    name: 'Hong Kong International',      country: 'Hong Kong' },
  { code: 'NRT', city: 'Tokyo',        name: 'Narita International',         country: 'Japan' },
  { code: 'HND', city: 'Tokyo',        name: 'Haneda Airport',               country: 'Japan' },
  { code: 'ICN', city: 'Seoul',        name: 'Incheon International',        country: 'South Korea' },
  { code: 'PEK', city: 'Beijing',      name: 'Beijing Capital',              country: 'China' },
  { code: 'PVG', city: 'Shanghai',     name: 'Pudong International',         country: 'China' },
  { code: 'KUL', city: 'Kuala Lumpur', name: 'Kuala Lumpur International',   country: 'Malaysia' },
  { code: 'CGK', city: 'Jakarta',      name: 'Soekarno-Hatta International', country: 'Indonesia' },
  { code: 'MNL', city: 'Manila',       name: 'Ninoy Aquino International',   country: 'Philippines' },
  { code: 'CMB', city: 'Colombo',      name: 'Bandaranaike International',   country: 'Sri Lanka' },
  { code: 'KTM', city: 'Kathmandu',    name: 'Tribhuvan International',      country: 'Nepal' },
  { code: 'DAC', city: 'Dhaka',        name: 'Hazrat Shahjalal International',country: 'Bangladesh' },

  // Australia & Others
  { code: 'SYD', city: 'Sydney',       name: 'Kingsford Smith Airport',      country: 'Australia' },
  { code: 'MEL', city: 'Melbourne',    name: 'Melbourne Airport',            country: 'Australia' },
  { code: 'AKL', city: 'Auckland',     name: 'Auckland Airport',             country: 'New Zealand' },
  { code: 'YYZ', city: 'Toronto',      name: 'Pearson International',        country: 'Canada' },
  { code: 'YVR', city: 'Vancouver',    name: 'Vancouver International',      country: 'Canada' },
];

// Fast multi-field search helper
export const searchAirports = (query, limit = 8) => {
  if (!query || query.trim().length < 1) return AIRPORTS.slice(0, limit);
  const q = query.toLowerCase().trim();
  return AIRPORTS.filter(
    (a) =>
      a.code.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q)
  ).slice(0, limit);
};