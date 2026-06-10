import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================================
// Rate Limiting — 5 emails/hour per IP
// ============================================================
const rateLimit = new Map();
const WINDOW    = 60 * 60 * 1000;
const MAX       = 5;

function checkRateLimit(ip) {
  const now      = Date.now();
  const requests = rateLimit.get(ip) || [];
  const recent   = requests.filter((time) => now - time < WINDOW);

  if (recent.length >= MAX) return false;
  recent.push(now);
  rateLimit.set(ip, recent);
  return true;
}

// ============================================================
// Helpers — Sanitize + Validate
// ============================================================
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim()
    .slice(0, 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================================
// POST Handler
// ============================================================
export async function POST(request) {
  try {
    // ===== Rate Limiting =====
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]
            || request.headers.get('x-real-ip')
            || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in an hour.' },
        { status: 429 }
      );
    }

    // ===== Parse Body =====
    const { name, email, phone, topic, message } = await request.json();

    // ===== Validation =====
    if (!name || !email || !topic || !message) {
      return NextResponse.json(
        { error: 'Please fill all required fields' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message is too short (minimum 10 characters)' },
        { status: 400 }
      );
    }

    // ===== Sanitize =====
    const safeName    = sanitize(name);
    const safeEmail   = sanitize(email);
    const safePhone   = phone ? sanitize(phone) : 'Not provided';
    const safeTopic   = sanitize(topic);
    const safeMessage = sanitize(message);

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone:  'America/New_York',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    const fromEmail   = process.env.FROM_EMAIL    || 'onboarding@resend.dev';
    const fromName    = process.env.FROM_NAME     || 'ReservationKart';
    const toEmail     = process.env.CONTACT_EMAIL || 'info@reservationkart.com';

    // ===== Email 1: Notify YOU (info@reservationkart.com) =====
    const ownerEmail = await resend.emails.send({
      from:     `${fromName} Contact <${fromEmail}>`,
      to:       [toEmail],
      replyTo:  safeEmail,
      subject:  `🔔 New Contact: ${safeTopic} — from ${safeName}`,
      html: getOwnerEmailHTML({
        name:    safeName,
        email:   safeEmail,
        phone:   safePhone,
        topic:   safeTopic,
        message: safeMessage,
        timestamp,
        ip,
      }),
    });

    if (ownerEmail.error) {
      console.error('Resend error (owner):', ownerEmail.error);
      throw new Error(ownerEmail.error.message || 'Failed to send notification');
    }

    // ===== Email 2: Auto-Reply to Customer =====
    await resend.emails.send({
      from:    `${fromName} <${fromEmail}>`,
      to:      [safeEmail],
      subject: `Thanks for contacting ReservationKart, ${safeName.split(' ')[0]}! ✈️`,
      html:    getCustomerEmailHTML({
        name:    safeName,
        topic:   safeTopic,
        message: safeMessage,
      }),
    });

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      {
        error:   'Failed to send message. Please call +1 855 316 3173 or try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// ============================================================
// HTML EMAIL TEMPLATES
// ============================================================

function getOwnerEmailHTML({ name, email, phone, topic, message, timestamp, ip }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Contact Inquiry</title></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

        <tr><td style="background:linear-gradient(135deg,#F26522,#E04C0E);padding:30px 40px;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;font-weight:700;">🔔 New Contact Inquiry</h1>
          <p style="margin:8px 0 0;opacity:0.9;font-size:14px;">Someone has contacted you through your website</p>
        </td></tr>

        <tr><td style="padding:24px 40px 0;">
          <span style="display:inline-block;padding:6px 14px;background:#FFF4ED;color:#BA380E;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;border-radius:20px;">
            ${topic}
          </span>
        </td></tr>

        <tr><td style="padding:20px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFA;border-radius:12px;padding:20px;">
            <tr><td style="padding:8px 0;border-bottom:1px solid #EEEEEE;">
              <div style="font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Name</div>
              <div style="font-size:16px;color:#1A1A1A;font-weight:600;margin-top:4px;">${name}</div>
            </td></tr>
            <tr><td style="padding:12px 0 8px;border-bottom:1px solid #EEEEEE;">
              <div style="font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Email</div>
              <div style="font-size:16px;color:#1A1A1A;font-weight:600;margin-top:4px;">
                <a href="mailto:${email}" style="color:#F26522;text-decoration:none;">${email}</a>
              </div>
            </td></tr>
            <tr><td style="padding:12px 0 8px;border-bottom:1px solid #EEEEEE;">
              <div style="font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Phone</div>
              <div style="font-size:16px;color:#1A1A1A;font-weight:600;margin-top:4px;">${phone}</div>
            </td></tr>
            <tr><td style="padding:12px 0 8px;">
              <div style="font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Submitted</div>
              <div style="font-size:14px;color:#666;margin-top:4px;">${timestamp}</div>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:0 40px 24px;">
          <div style="font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Message</div>
          <div style="background:#FFFFFF;border:2px solid #F0F0F0;border-radius:12px;padding:20px;font-size:15px;line-height:1.6;color:#333;white-space:pre-wrap;">${message}</div>
        </td></tr>

        <tr><td style="padding:0 40px 32px;text-align:center;">
          <a href="mailto:${email}?subject=Re: ${topic}"
             style="display:inline-block;background:linear-gradient(135deg,#F26522,#E04C0E);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:10px;font-weight:700;font-size:15px;">
            Reply to ${name.split(' ')[0]}
          </a>
        </td></tr>

        <tr><td style="background:#1A1A1A;padding:20px 40px;text-align:center;color:#888;font-size:12px;">
          <p style="margin:0;">ReservationKart Contact Form Notification</p>
          <p style="margin:6px 0 0;font-size:11px;opacity:0.7;">Submitted from IP: ${ip}</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function getCustomerEmailHTML({ name, topic, message }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>We received your message</title></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

        <tr><td style="background:linear-gradient(135deg,#F26522,#E04C0E);padding:40px;text-align:center;color:#ffffff;">
          <div style="font-size:48px;margin-bottom:8px;">✈️</div>
          <h1 style="margin:0;font-size:28px;font-weight:700;">Thanks, ${name.split(' ')[0]}!</h1>
          <p style="margin:12px 0 0;opacity:0.95;font-size:16px;">We've received your message</p>
        </td></tr>

        <tr><td style="padding:32px 40px 24px;">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#333;">Hi <strong>${name.split(' ')[0]}</strong>,</p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#333;">
            Thank you for reaching out to ReservationKart! We've received your inquiry about <strong>${topic}</strong>.
          </p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#333;">
            Our travel expert team is reviewing your message and will get back to you within <strong>4 hours</strong>. For urgent matters, feel free to call us anytime.
          </p>
        </td></tr>

        <tr><td style="padding:0 40px 24px;">
          <div style="background:#FAFAFA;border-left:4px solid #F26522;border-radius:8px;padding:16px 20px;">
            <div style="font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Your Message:</div>
            <div style="font-size:14px;line-height:1.6;color:#555;white-space:pre-wrap;">${message}</div>
          </div>
        </td></tr>

        <tr><td style="padding:0 40px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:12px;background:#FFF4ED;border-radius:12px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:14px;color:#333;line-height:1.5;">
                    <strong>📞 Need immediate help?</strong><br>
                    <span style="color:#666;">Call our 24/7 support hotline</span>
                  </td>
                  <td align="right">
                    <a href="tel:+1 855 316 3173" style="background:#F26522;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:700;font-size:13px;white-space:nowrap;">
                      Call Now
                    </a>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:0 40px 32px;text-align:center;">
          <p style="margin:0 0 16px;font-size:14px;color:#666;">While you wait, explore:</p>
          <a href="https://reservationkart.com/flights" style="display:inline-block;margin:4px;padding:8px 16px;background:#ffffff;border:1px solid #E5E5E5;border-radius:8px;color:#1A1A1A;text-decoration:none;font-size:13px;font-weight:600;">✈️ Flights</a>
          <a href="https://reservationkart.com/hotels" style="display:inline-block;margin:4px;padding:8px 16px;background:#ffffff;border:1px solid #E5E5E5;border-radius:8px;color:#1A1A1A;text-decoration:none;font-size:13px;font-weight:600;">🏨 Hotels</a>
          <a href="https://reservationkart.com/offers" style="display:inline-block;margin:4px;padding:8px 16px;background:#ffffff;border:1px solid #E5E5E5;border-radius:8px;color:#1A1A1A;text-decoration:none;font-size:13px;font-weight:600;">🎁 Offers</a>
        </td></tr>

        <tr><td style="background:#1A1A1A;padding:24px 40px;text-align:center;color:#888;font-size:13px;">
          <p style="margin:0 0 8px;color:#ffffff;font-weight:700;">ReservationKart</p>
          <p style="margin:0;font-size:12px;">Your dream travel, just a phone call away</p>
          <p style="margin:16px 0 0;font-size:11px;opacity:0.6;">
            30 Summer St, Hagerstown, Maryland 21740<br>
            +1 855 316 3173 • info@reservationkart.com
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}