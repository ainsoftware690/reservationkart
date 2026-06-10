"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import {TRENDING_ROUTES} from "../../../lib/constants";

export default function TrendingRoutes() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="bg-white py-16 px-4 sm:px-8 lg:px-16">
      {/* ── Section Header ── */}
      <div className="mb-10">
        <p className="text-sm font-semibold tracking-widest text-[#ff7438] uppercase mb-1">
          ✈ Popular Picks
        </p>
        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
          Trending Routes
        </h2>
        <p className="text-gray-400 mt-2 text-sm">
          Favorite routes based on customer reviews
        </p>
        {/* animated underline */}
        <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#ff7438] to-[#ff7438]" />
      </div>

      {/* ── Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {TRENDING_ROUTES.map((route, i) => (
          <div
            key={route.id}
            onMouseEnter={() => setHovered(route.id)}
            onMouseLeave={() => setHovered(null)}
            className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            style={{
              animation: `fadeSlideUp 0.5s ease both`,
              animationDelay: `${i * 120}ms`,
            }}
          >
            {/* ── Image ── */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={route.img}
                alt={`${route.from} to ${route.to}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Badge */}
              <span
                className={`absolute top-3 left-3 bg-gradient-to-r ${route.badgeClass} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg tracking-wide`}
              >
                {route.badge}
              </span>

              {/* Price tag */}
              <span className="absolute bottom-3 right-3 bg-white/95 text-gray-900 text-sm font-extrabold px-3 py-1 rounded-full shadow-md">
                From {route.price}
              </span>
            </div>

            {/* ── Card Body ── */}
            <div className="bg-white px-5 pt-4 pb-5">
              {/* Route title */}
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900">
                  {route.from}
                </h3>
                <svg
                  className="w-4 h-4 text-yellow-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                <h3 className="text-lg font-bold text-gray-900">{route.to}</h3>
              </div>

              {/* Meta row */}
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {route.country}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {route.duration}
                </span>
              </div>

              {/* CTA Button */}
              <a
                href="tel:+1 855 316 3173"
                className="flex items-center justify-center gap-2 w-full bg-[#ff8025] hover:bg-[#ff8025]/90 active:scale-95 text-gray-900 font-bold text-sm py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-[#ff7438]/60 hover:shadow-lg"
              >
                <Phone className="w-4 h-4" />
                Call Now For Booking
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}