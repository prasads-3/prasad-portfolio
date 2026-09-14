/**
 * Visitor Notification Service
 * Automatically sends an email alert to pj344504@gmail.com when someone visits the portfolio.
 * Uses FormSubmit.co AJAX API (zero server required, free, secure).
 */

const TARGET_EMAIL = 'pj344504@gmail.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;
const COOLDOWN_MINUTES = 30; // Do not send duplicate alerts from same browser within 30 min

interface LocationData {
  ip?: string;
  city?: string;
  region?: string;
  country_name?: string;
  org?: string;
}

/**
 * Detect client device, browser, and OS from userAgent
 */
function getClientDetails(): { device: string; browser: string; os: string } {
  if (typeof window === 'undefined') {
    return { device: 'Unknown', browser: 'Unknown', os: 'Unknown' };
  }

  const ua = navigator.userAgent;
  let device = 'Desktop';
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    device = 'Tablet';
  } else if (/mobile|iphone|ipod|android|blackberry|iemobile|kindle/i.test(ua)) {
    device = 'Mobile';
  }

  let browser = 'Unknown Browser';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg/')) browser = 'Microsoft Edge';
  else if (ua.includes('Chrome')) browser = 'Google Chrome';
  else if (ua.includes('Safari')) browser = 'Apple Safari';
  else if (ua.includes('MSIE') || ua.includes('Trident/')) browser = 'Internet Explorer';

  let os = 'Unknown OS';
  if (ua.includes('Win')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  return { device, browser: `${browser} (${os})`, os };
}

/**
 * Fetch approximate visitor geolocation without blocking or failing
 */
async function getVisitorLocation(): Promise<LocationData | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country_name: data.country_name,
        org: data.org
      };
    }
  } catch {
    // Fail silently if ad-blocked or network error
  }
  return null;
}

/**
 * Send automatic visitor arrival notification email
 */
export async function notifyVisitorArrival(force = false): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const sessionKey = 'prasad_visitor_alert_sent';
  const timestampKey = 'prasad_visitor_alert_timestamp';

  // Check cooldown to avoid spamming user's inbox on page reloads
  if (!force) {
    if (sessionStorage.getItem(sessionKey)) {
      return false; // Already sent in this tab/session
    }

    const lastSent = localStorage.getItem(timestampKey);
    if (lastSent) {
      const diffMinutes = (Date.now() - Number(lastSent)) / (1000 * 60);
      if (diffMinutes < COOLDOWN_MINUTES) {
        return false; // Under cooldown
      }
    }
  }

  // Mark as sent immediately to avoid race conditions
  sessionStorage.setItem(sessionKey, 'true');
  localStorage.setItem(timestampKey, Date.now().toString());

  try {
    const client = getClientDetails();
    const location = await getVisitorLocation();

    const formattedTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    }) + ' (IST)';

    const referrer = document.referrer || 'Direct Visit (Typed URL or Bookmark)';
    const screenRes = typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'Unknown';

    const locationString = location 
      ? `${location.city || ''}, ${location.region || ''}, ${location.country_name || ''} [IP: ${location.ip || 'N/A'}, ISP: ${location.org || 'N/A'}]`
      : 'Location query withheld / Ad-blocked';

    const payload = {
      _subject: '🚀 New Visitor on Your Portfolio Website! (Prasad DevOps)',
      _template: 'table',
      _captcha: 'false',
      'Visitor Status': '🟢 Active Now on Website',
      'Visit Time': formattedTime,
      'Device Type': client.device,
      'Browser & OS': client.browser,
      'Approximate Location': locationString,
      'Referral Source': referrer,
      'Page URL': window.location.href,
      'Screen Resolution': screenRes,
      'Language': navigator.language || 'en'
    };

    const res = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    return res.ok;
  } catch (err) {
    console.debug('Visitor notification error:', err);
    return false;
  }
}

/**
 * Send contact form message to pj344504@gmail.com
 */
export async function sendContactMessage(name: string, email: string, message: string): Promise<{ success: boolean; message: string }> {
  try {
    const client = getClientDetails();
    const res = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        _subject: `💬 New Portfolio Message from ${name}`,
        _template: 'table',
        _captcha: 'false',
        'Sender Name': name,
        'Sender Email': email,
        'Message': message,
        'Sent At': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' (IST)',
        'Device': `${client.device} - ${client.browser}`
      })
    });

    if (res.ok) {
      return { success: true, message: 'Your message has been delivered to Prasad!' };
    } else {
      return { success: false, message: 'Could not send message. Please try again or email directly.' };
    }
  } catch (err) {
    return { success: false, message: 'Network error while sending message.' };
  }
}
