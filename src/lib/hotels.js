export const HOTELS = [
  {
    id: 'H001', name: 'Atlantis The Palm', city: 'Dubai', country: 'UAE', code: 'DXB',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80&auto=format&fit=crop',
    stars: 5, rating: 4.8, reviews: 12840, pricePerNight: 450,
    amenities: ['Pool', 'Spa', 'WiFi', 'Gym', 'Restaurant'],
    tag: 'Luxury',
  },
  {
    id: 'H002', name: 'Marina Bay Sands', city: 'Singapore', country: 'Singapore', code: 'SIN',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80&auto=format&fit=crop',
    stars: 5, rating: 4.9, reviews: 18320, pricePerNight: 520,
    amenities: ['Infinity Pool', 'Casino', 'WiFi', 'Gym', 'Spa'],
    tag: 'Iconic',
  },
  {
    id: 'H003', name: 'The Ritz-Carlton', city: 'New York', country: 'USA', code: 'JFK',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop',
    stars: 5, rating: 4.7, reviews: 9540, pricePerNight: 680,
    amenities: ['Spa', 'Fine Dining', 'WiFi', 'Concierge', 'Bar'],
    tag: 'Popular',
  },
  {
    id: 'H004', name: 'Le Meurice', city: 'Paris', country: 'France', code: 'CDG',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80&auto=format&fit=crop',
    stars: 5, rating: 4.9, reviews: 7230, pricePerNight: 890,
    amenities: ['Michelin Restaurant', 'Spa', 'WiFi', 'Butler', 'Bar'],
    tag: 'Trending',
  },
  {
    id: 'H005', name: 'Claridges London', city: 'London', country: 'UK', code: 'LHR',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80&auto=format&fit=crop',
    stars: 5, rating: 4.8, reviews: 11200, pricePerNight: 750,
    amenities: ['Fine Dining', 'Spa', 'WiFi', 'Gym', 'Bar'],
    tag: null,
  },
  {
    id: 'H006', name: 'Park Hyatt Tokyo', city: 'Tokyo', country: 'Japan', code: 'NRT',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80&auto=format&fit=crop',
    stars: 5, rating: 4.7, reviews: 8910, pricePerNight: 420,
    amenities: ['Pool', 'Spa', 'WiFi', 'Gym', 'Restaurant'],
    tag: 'Best Value',
  },
  {
    id: 'H007', name: 'Burj Al Arab', city: 'Dubai', country: 'UAE', code: 'DXB',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&auto=format&fit=crop',
    stars: 5, rating: 4.9, reviews: 15670, pricePerNight: 1200,
    amenities: ['Private Beach', 'Helipad', 'Butler', 'Pool', 'Spa'],
    tag: 'Ultra Luxury',
  },
  {
    id: 'H008', name: 'Taj Mahal Palace', city: 'Mumbai', country: 'India', code: 'BOM',
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80&auto=format&fit=crop',
    stars: 5, rating: 4.8, reviews: 13450, pricePerNight: 280,
    amenities: ['Pool', 'Spa', 'WiFi', 'Heritage Tour', 'Restaurant'],
    tag: 'Best Value',
  },
];

export const searchHotels = ({ city, checkIn, checkOut, guests } = {}) => {
  let result = [...HOTELS];
  if (city) {
    result = result.filter(
      (h) =>
        h.city.toLowerCase().includes(city.toLowerCase()) ||
        h.country.toLowerCase().includes(city.toLowerCase()) ||
        h.code.toLowerCase() === city.toLowerCase()
    );
  }
  return result.sort((a, b) => a.pricePerNight - b.pricePerNight);
};