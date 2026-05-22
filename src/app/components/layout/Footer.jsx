import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';
import { SITE_CONFIG, FOOTER_LINKS } from '../../../lib/constants';
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
} from '../../components/icons/SocialIcons';

// ✅ Yeh define hona chahiye tha — yahi missing tha
const SOCIAL_LINKS = [
  { Icon: FacebookIcon,  href: SITE_CONFIG.social.facebook,  label: 'Facebook'  },
  { Icon: TwitterIcon,   href: SITE_CONFIG.social.twitter,   label: 'Twitter'   },
  { Icon: InstagramIcon, href: SITE_CONFIG.social.instagram, label: 'Instagram' },
  { Icon: LinkedinIcon,  href: SITE_CONFIG.social.linkedin,  label: 'LinkedIn'  },
];

const FOOTER_COLUMNS = [
  { title: 'Company',  links: FOOTER_LINKS.company  },
  { title: 'Support',  links: FOOTER_LINKS.support  },
  { title: 'Services', links: FOOTER_LINKS.services },
  { title: 'Legal',    links: FOOTER_LINKS.legal    },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark-800 text-gray-300" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">

          {/* Brand block — 2 cols */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block bg-white rounded-lg px-3 py-2">
              <Image
                src="/images/logo.webp"
                alt={SITE_CONFIG.name}
                width={180}
                height={45}
                className="h-10 w-auto"
              />
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-400 max-w-xs">
              {SITE_CONFIG.description}
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <Phone className="h-5 w-5 flex-shrink-0 text-brand-orange-500 mt-0.5" />
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="h-5 w-5 flex-shrink-0 text-brand-orange-500 mt-0.5" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-brand-orange-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-400">
            © 2024 {SITE_CONFIG.name}. All rights reserved.
          </p>

          <ul className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand-orange-500 transition-colors"
                  aria-label={`Follow us on ${label}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}