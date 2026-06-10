"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle,
  Send,
  Globe2,
} from "lucide-react";
import { SITE_CONFIG } from "../../lib/constants";

const CONTACT_INFO = [
  {
    icon: Phone,
    title: "Phone Support",
    desc: "Speak to a travel expert",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone}`,
    badge: "24/7 Available",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "We reply within 4 hours",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    badge: "Mon–Sun",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    desc: "Chat with us instantly",
    value: "Start Live Chat →",
    href: "#chat",
    badge: "< 2 min wait",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    icon: MapPin,
    title: "Head Office",
    desc: "Maryland, USA",
    value: " 30 Summer St Hagerstown ,Maryland 21740",
    href: "https://maps.google.com",
    badge: "USA",
    badgeColor: "bg-orange-100 text-orange-700",
  },
];

const TOPICS = [
  "New Booking",
  "Existing Booking",
  "Cancellation & Refund",
  "Baggage Inquiry",
  "Payment Issue",
  "Technical Support",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field, val) => {
    setForm((p) => ({ ...p, [field]: val }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.topic) e.topic = "Please select a topic";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitted(true);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-dark to-blue-900 py-16 sm:py-24 text-white text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-brand-orange-500/20 text-brand-orange-400 text-sm font-bold uppercase tracking-wider mb-4">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold">We're Here to Help</h1>
        <p className="mt-3 text-white/80 text-lg max-w-xl mx-auto">
          Our expert travel team is available 24/7 — ready to assist with
          bookings, changes, or any travel emergency.
        </p>
      </div>

      <div className="container-custom py-12 sm:py-16">
        {/* Contact methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CONTACT_INFO.map(
            ({ icon: Icon, title, desc, value, href, badge, badgeColor }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all border border-gray-100 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange-100 flex items-center justify-center text-brand-orange-500 group-hover:bg-brand-orange-500 group-hover:text-white transition-all">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-brand-dark">{title}</h3>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeColor}`}
                    >
                      {badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{desc}</p>
                  <p className="text-sm font-semibold text-brand-orange-600 mt-2 group-hover:underline truncate">
                    {value}
                  </p>
                </div>
              </a>
            ),
          )}
        </div>

        {/* Form + info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-brand-dark">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-gray-600">
                    We'll get back to you at <strong>{form.email}</strong>{" "}
                    within 4 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        topic: "",
                        message: "",
                      });
                    }}
                    className="mt-6 px-6 py-3 rounded-xl bg-brand-orange-500 text-white font-bold hover:bg-brand-orange-600"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-brand-dark mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Full Name" error={errors.name} required>
                        <input
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="John Doe"
                          className={input(errors.name)}
                        />
                      </Field>
                      <Field
                        label="Email Address"
                        error={errors.email}
                        required
                      >
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="you@example.com"
                          className={input(errors.email)}
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Phone (Optional)">
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+1 855 316 3173"
                          className={input()}
                        />
                      </Field>
                      <Field label="Topic" error={errors.topic} required>
                        <select
                          value={form.topic}
                          onChange={(e) => update("topic", e.target.value)}
                          className={input(errors.topic)}
                        >
                          <option value="">Select a topic...</option>
                          {TOPICS.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field label="Message" error={errors.message} required>
                      <textarea
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        rows={5}
                        placeholder="Tell us how we can help..."
                        className={`${input(errors.message)} resize-none`}
                      />
                    </Field>
                    {errors.submit && (
                      <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-2">
                        <svg
                          className="h-4 w-4 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{errors.submit}</span>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white font-bold shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 transition-all"
                    >
                      {loading ? (
                        <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )}
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-5 space-y-4">
            {/* Hours */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-brand-dark flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-brand-orange-500" />
                Support Hours
              </h3>
              <div className="space-y-3">
                {[
                  { day: "Phone & Chat", hours: "24/7 — Always Available" },
                  { day: "Email", hours: "Mon–Sun, reply within 4hrs" },
                  { day: "Office", hours: "Mon–Fri, 9 AM – 6 PM EST" },
                ].map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between text-sm py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="font-semibold text-brand-dark">
                      {item.day}
                    </span>
                    <span className="text-gray-600">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Offices */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-brand-dark flex items-center gap-2 mb-4">
                <Globe2 className="h-5 w-5 text-brand-orange-500" />
                Our Offices
              </h3>
              <div className="space-y-4">
                {[
                  {
                    city: "New York",
                    flag: "🇺🇸",
                    addr: "350 Fifth Avenue, NY 10118",
                    primary: true,
                  },
                  {
                    city: "Dubai",
                    flag: "🇦🇪",
                    addr: "DIFC, Sheikh Zayed Road",
                  },
                  { city: "London", flag: "🇬🇧", addr: "Canary Wharf, E14 5AB" },
                  { city: "Mumbai", flag: "🇮🇳", addr: "Bandra Kurla Complex" },
                ].map((o) => (
                  <div key={o.city} className="flex items-start gap-3">
                    <span className="text-xl">{o.flag}</span>
                    <div>
                      <div className="font-bold text-brand-dark text-sm flex items-center gap-2">
                        {o.city}
                        {o.primary && (
                          <span className="text-xs bg-brand-orange-100 text-brand-orange-700 px-2 py-0.5 rounded-full font-semibold">
                            HQ
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {o.addr}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <h3 className="font-bold text-red-800 mb-2">
                🚨 Travel Emergency?
              </h3>
              <p className="text-sm text-red-700 mb-3">
                Missed connection, lost passport, medical emergency? Our
                emergency team is ready.
              </p>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700"
              >
                <Phone className="h-4 w-4" /> Emergency Hotline
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper components
function Field({ label, error, required, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <div className="mt-1">{children}</div>
      {error && (
        <span className="mt-1 text-xs text-red-600 block">{error}</span>
      )}
    </label>
  );
}

const input = (err) =>
  `w-full px-4 py-3 rounded-xl border-2 bg-white focus:outline-none transition-all text-base ${
    err
      ? "border-red-300 focus:border-red-500"
      : "border-gray-200 focus:border-brand-orange-500"
  }`;
