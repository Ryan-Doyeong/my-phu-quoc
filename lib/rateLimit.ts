import { headers } from 'next/headers';

const rateLimits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 1000 * 60 * 60; // 1 hour

export async function checkRateLimit(maxRequests: number, formKey: string): Promise<void> {
  const headersList = await headers();
  const rawIp = headersList.get('x-forwarded-for');
  const ip = rawIp ? rawIp.split(',')[0].trim() : 'unknown';
  
  if (!ip || ip === 'unknown') {
    return; // Skip rate limiting if IP is unknown to prevent mass block
  }

  const now = Date.now();
  const key = `${formKey}:${ip}`;
  
  let limits = rateLimits.get(key);
  if (!limits || limits.resetAt < now) {
    limits = { count: 0, resetAt: now + WINDOW_MS };
  }
  
  if (limits.count >= maxRequests) {
    throw new Error('Too many submissions from this IP. Please try again later.');
  }
  
  limits.count++;
  rateLimits.set(key, limits);
}

export function checkSpam(formData: FormData): boolean {
  // 1. Honeypot check
  const honeypot = formData.get('website_url_confirm');
  if (honeypot && typeof honeypot === 'string' && honeypot.trim() !== '') {
    return true; // Is spam
  }

  // 2. Time-based check
  const renderTimeStr = formData.get('form_render_time');
  if (renderTimeStr && typeof renderTimeStr === 'string') {
    const renderTime = parseInt(renderTimeStr, 10);
    if (!isNaN(renderTime)) {
      const timeDiff = Date.now() - renderTime;
      if (timeDiff >= 0 && timeDiff < 2000) {
        return true; // Is spam (submitted too fast, < 2 seconds)
      }
    }
  }

  return false;
}
