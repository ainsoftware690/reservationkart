// Production-grade FAQ data — covers most user concerns
// Categories matter for SEO + user navigation

export const FAQ_CATEGORIES = [
  { id: 'all',          label: 'All Questions'    },
  { id: 'booking',      label: 'Booking'          },
  { id: 'payment',      label: 'Payment'          },
  { id: 'cancellation', label: 'Cancellation'     },
  { id: 'baggage',      label: 'Baggage'          },
  { id: 'account',      label: 'Account & Profile'},
  { id: 'support',      label: 'Customer Support' },
];

export const FAQS = [
  // ============ BOOKING ============
  {
    id:       1,
    category: 'booking',
    question: 'How do I book a flight on ReservationKart?',
    answer:   "Booking is simple: enter your origin, destination, travel dates, and number of passengers on our homepage. Browse available flights, filter by price, stops, or airline, then select your preferred option. Enter passenger details, complete payment, and you'll receive instant e-ticket confirmation via email and SMS.",
  },
  {
    id:       2,
    category: 'booking',
    question: 'Can I book one-way, round-trip, and multi-city flights?',
    answer:   "Yes, we support all three trip types. Select One Way for single journeys, Round Trip for return tickets (often cheaper than two one-ways), and Multi City to combine multiple destinations in a single booking — perfect for vacation tours or business circuits.",
  },
  {
    id:       3,
    category: 'booking',
    question: 'How early can I book my flight?',
    answer:   "You can book flights up to 11 months in advance for most airlines, and up to 1 hour before departure for last-minute travel. We recommend booking 6-8 weeks ahead for domestic flights and 3-4 months for international routes to secure the best prices.",
  },
  {
    id:       4,
    category: 'booking',
    question: 'Will I receive my e-ticket immediately after booking?',
    answer:   "Yes, e-tickets are issued instantly upon successful payment in 95% of cases. You'll receive a confirmation email with your PNR (Passenger Name Record), e-ticket PDF, and itinerary. For a small percentage of complex international bookings, ticketing may take up to 4 hours.",
  },

  // ============ PAYMENT ============
  {
    id:       5,
    category: 'payment',
    question: 'What payment methods do you accept?',
    answer:   "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and bank transfers. International customers can also pay in their local currency. All payments are processed through PCI-DSS compliant gateways with bank-level encryption.",
  },
  {
    id:       6,
    category: 'payment',
    question: 'Is it safe to enter my card details on your website?',
    answer:   "Absolutely. We use 256-bit SSL encryption and are fully PCI-DSS Level 1 compliant — the highest security standard in the payment industry. We never store your full card details on our servers. All transactions are processed through trusted gateways like Stripe and Razorpay.",
  },
  {
    id:       7,
    category: 'payment',
    question: 'Will I be charged any hidden fees?',
    answer:   "No hidden fees, ever. The price you see at checkout is the final price you pay — including all taxes, airline surcharges, and our service fee (clearly itemized). We believe in transparent pricing because trust matters more than tricks.",
  },
  {
    id:       8,
    category: 'payment',
    question: 'Do you offer EMI options for expensive flights?',
    answer:   "Yes, we offer no-cost EMI (Equated Monthly Installment) options on credit cards for bookings above $200/₹15,000. Choose 3, 6, 9, or 12-month tenures at checkout. EMI availability depends on your card issuer and is processed without any extra interest in most cases.",
  },
  {
    id:       9,
    category: 'payment',
    question: 'Why was my payment declined?',
    answer:   "Common reasons: insufficient funds, daily transaction limit reached, card not enabled for international transactions, or incorrect CVV/expiry. We recommend contacting your bank first, then trying an alternative payment method. Our 24/7 support can also help you complete the booking via phone.",
  },

  // ============ CANCELLATION ============
  {
    id:       10,
    category: 'cancellation',
    question: 'How do I cancel my flight booking?',
    answer:   "Log in to your account, go to My Bookings, select the flight you want to cancel, and click the Cancel button. You can also call our 24/7 support line for assistance. Refunds are processed based on the airline's cancellation policy, and credited back to your original payment method within 7-14 business days.",
  },
  {
    id:       11,
    category: 'cancellation',
    question: 'What is your refund policy?',
    answer:   "Refund eligibility depends on the airline's fare rules. Refundable fares typically refund 70-100% of the ticket price minus airline cancellation charges. Non-refundable fares may only refund government taxes (around 10-20% of total). We charge a flat $10/₹500 cancellation service fee. The exact refundable amount is shown before you confirm cancellation.",
  },
  {
    id:       12,
    category: 'cancellation',
    question: 'Can I change my travel dates instead of canceling?',
    answer:   "Yes, date changes are usually cheaper than cancellation. Go to My Bookings, select the flight, and click Modify. You'll pay only the fare difference (if any) plus the airline's change fee. Some flexible fares allow free changes within 24 hours of booking.",
  },
  {
    id:       13,
    category: 'cancellation',
    question: 'What if my flight is canceled by the airline?',
    answer:   "If an airline cancels your flight, you're entitled to a full refund or free rebooking on the next available flight. Our support team automatically contacts you with options. International travelers may also be eligible for compensation under EU 261 or similar regulations — we help you claim this at no extra cost.",
  },

  // ============ BAGGAGE ============
  {
    id:       14,
    category: 'baggage',
    question: 'How much baggage am I allowed to carry?',
    answer:   "Baggage allowance varies by airline, route, and fare class. Typically: domestic flights allow 7kg cabin + 15kg check-in, international economy allows 7kg cabin + 23kg check-in, and business class allows 14kg cabin + 32kg check-in. Exact details for your booking are shown on your e-ticket and during the search results.",
  },
  {
    id:       15,
    category: 'baggage',
    question: 'Can I add extra baggage after booking?',
    answer:   "Yes, additional baggage can be added through your account in the My Bookings section, or directly on the airline's website using your PNR. Pre-purchasing extra baggage online is significantly cheaper (often 50-70%) than paying at the airport counter.",
  },
  {
    id:       16,
    category: 'baggage',
    question: 'What items are restricted in cabin and check-in baggage?',
    answer:   "Common restrictions: liquids over 100ml in cabin, sharp objects, lithium batteries above 100Wh, flammable substances, and weapons. Power banks must be in cabin baggage only. Specific restrictions vary by airline and destination — we recommend checking the airline's official policy for international flights.",
  },

  // ============ ACCOUNT ============
  {
    id:       17,
    category: 'account',
    question: 'Do I need to create an account to book a flight?',
    answer:   "No, you can book as a guest without registering. However, creating a free account gives you benefits: saved traveler details for faster checkout, booking history, exclusive member discounts, easy cancellation/modification, and personalized travel recommendations.",
  },
  {
    id:       18,
    category: 'account',
    question: 'How do I reset my password?',
    answer:   "Click Login, then Forgot Password. Enter your registered email and we'll send a secure reset link valid for 30 minutes. If you signed up via Google, Facebook, or Apple, use the same social login — no separate password is needed.",
  },
  {
    id:       19,
    category: 'account',
    question: 'How can I update my personal information?',
    answer:   "Log in to your account, go to Profile Settings, and update your name, email, phone, address, or travel preferences. For security, changing your email or phone number requires verification via OTP sent to the new contact details.",
  },

  // ============ SUPPORT ============
  {
    id:       20,
    category: 'support',
    question: 'How do I contact customer support?',
    answer:   "We offer multiple support channels available 24/7: Phone (+1 8002345245), Live Chat on our website, Email (info@reservationkart.com), and WhatsApp. Average response time is under 2 minutes for chat and phone, and under 4 hours for email. Premium members get priority support.",
  },
  {
    id:       21,
    category: 'support',
    question: 'Do you support multiple languages?',
    answer:   "Yes, our support team handles inquiries in English, Hindi, Arabic, Spanish, French, and Mandarin. The website auto-detects your location and displays in your local language where available. You can also manually switch languages from the footer.",
  },
  {
    id:       22,
    category: 'support',
    question: 'What if I face an emergency during travel?',
    answer:   "Our 24/7 emergency hotline (+1 8002345245) is available for urgent issues like missed connections, sudden cancellations, lost documents, or medical emergencies abroad. We coordinate directly with airlines and partners worldwide to find the fastest resolution — even at 3 AM on holidays.",
  },
];