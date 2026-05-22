// Pricing breakdown helper — single source of truth
export const calculateFare = (basePrice, passengers, addons = {}) => {
  const adults    = passengers.adults   || 1;
  const children  = passengers.children || 0;
  const infants   = passengers.infants  || 0;

  // Industry-standard pricing tiers
  const childMultiplier  = 0.75;  // 25% off
  const infantMultiplier = 0.10;  // 90% off

  const adultFare   = basePrice * adults;
  const childFare   = basePrice * childMultiplier  * children;
  const infantFare  = basePrice * infantMultiplier * infants;

  const baseFare    = adultFare + childFare + infantFare;
  const taxes       = baseFare * 0.18;        // ~18% taxes
  const serviceFee  = 12;                      // Flat $12
  const insurance   = addons.insurance ? 8 * (adults + children) : 0;
  const seatFee     = addons.seatSelection ? 15 * (adults + children) : 0;
  const mealFee     = addons.meal ? 12 * (adults + children) : 0;

  const totalAddons = insurance + seatFee + mealFee;
  const total       = baseFare + taxes + serviceFee + totalAddons;

  return {
    baseFare:    Math.round(baseFare * 100) / 100,
    taxes:       Math.round(taxes * 100) / 100,
    serviceFee,
    insurance,
    seatFee,
    mealFee,
    totalAddons,
    total:       Math.round(total * 100) / 100,
    breakdown: {
      adults:   { count: adults,   fare: adultFare  },
      children: { count: children, fare: childFare  },
      infants:  { count: infants,  fare: infantFare },
    },
  };
};

// Generate random PNR (real airlines use 6-char alphanumeric)
export const generatePNR = () => {
  const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ23456789';  // No O/0/1/I confusion
  let pnr = '';
  for (let i = 0; i < 6; i++) {
    pnr += chars[Math.floor(Math.random() * chars.length)];
  }
  return pnr;
};

// Generate booking ID
export const generateBookingId = () => {
  return `RK${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 100)}`;
};

// Save booking to sessionStorage (for confirmation page)
export const saveBooking = (booking) => {
  try {
    sessionStorage.setItem(`booking_${booking.pnr}`, JSON.stringify(booking));
  } catch (err) {
    // Storage blocked
  }
};

export const getBooking = (pnr) => {
  try {
    const data = sessionStorage.getItem(`booking_${pnr}`);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    return null;
  }
};