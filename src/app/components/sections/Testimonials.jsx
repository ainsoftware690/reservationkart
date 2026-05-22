// Server Component
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/testimonials';

export default function Testimonials() {
  return (
    <section
      className="py-16 sm:py-20 bg-gradient-to-br from-brand-dark to-brand-dark-900 relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Decorative orbs */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute top-10 left-10 w-72 h-72 bg-brand-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-orange-400">
            Customer Stories
          </span>
          <h2
            id="testimonials-heading"
            className="mt-2 text-3xl sm:text-4xl font-bold text-white"
          >
            Loved by Travelers Worldwide
          </h2>
          <p className="mt-2 text-white/70 max-w-xl mx-auto">
            See why 10 million+ travelers trust ReservationKart for their journeys
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.id}
              className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-4 right-4 h-8 w-8 text-brand-orange-500/30"
                aria-hidden="true"
              />

              {/* Stars */}
              <div
                className="flex gap-1 mb-3"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-brand-orange-400 text-brand-orange-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-white/90 leading-relaxed">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white truncate">
                    {t.name}
                  </div>
                  <div className="text-xs text-white/60 truncate">
                    {t.role} • {t.city}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}