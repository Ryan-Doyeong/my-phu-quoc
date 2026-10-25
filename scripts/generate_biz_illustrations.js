const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'biz');

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Common SVG helpers
function makeSvg({
  bgStart,
  bgEnd,
  accentColor,
  secondaryColor,
  iconSvg,
  eyebrow,
  title,
  subtitle
}) {
  const safeEyebrow = escapeXml(eyebrow.toUpperCase());
  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgStart}"/>
      <stop offset="50%" stop-color="${bgEnd}"/>
      <stop offset="100%" stop-color="#0a0a0c"/>
    </linearGradient>
    <radialGradient id="centerGlow" cx="50%" cy="50%" r="46%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/>
    </radialGradient>
    <filter id="dropShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
  </defs>

  <!-- Background Layer -->
  <rect width="1200" height="800" fill="url(#bgGrad)"/>
  <circle cx="600" cy="400" r="380" fill="url(#centerGlow)"/>

  <!-- Outer Architectural Framing -->
  <rect x="44" y="44" width="1112" height="712" rx="28" fill="none" stroke="${accentColor}" stroke-opacity="0.22" stroke-width="1.5"/>
  <rect x="56" y="56" width="1088" height="688" rx="20" fill="none" stroke="${accentColor}" stroke-opacity="0.1" stroke-width="1"/>

  <!-- Frame Corner Accents -->
  <circle cx="68" cy="68" r="3.5" fill="${accentColor}" opacity="0.6"/>
  <circle cx="1132" cy="68" r="3.5" fill="${accentColor}" opacity="0.6"/>
  <circle cx="68" cy="732" r="3.5" fill="${accentColor}" opacity="0.6"/>
  <circle cx="1132" cy="732" r="3.5" fill="${accentColor}" opacity="0.6"/>

  <!-- Central Illustrated Icon Group (Scaled 0.58, centered at y=315 -> spans y 237~393) -->
  <g transform="translate(600, 315) scale(0.58)" filter="url(#dropShadow)">
    ${iconSvg}
  </g>

  <!-- Typography & Editorial Label Area (Spans y 410~518, well inside y 240~560 safe zone) -->
  <g transform="translate(600, 420)" text-anchor="middle">
    <!-- Category & Subcategory Eyebrow -->
    <text y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="${accentColor}" letter-spacing="4" opacity="0.88">${safeEyebrow}</text>
    
    <!-- Business Title (Increased font size 54px for high legibility in card crops) -->
    <text y="52" font-family="Georgia, 'Playfair Display', -apple-system, serif" font-size="54" font-weight="600" fill="#FFFFFF" letter-spacing="0.8">${safeTitle}</text>

    <!-- Subtitle / Concept -->
    <text y="92" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="${secondaryColor}" opacity="0.75" letter-spacing="1.2">${safeSubtitle}</text>
  </g>
</svg>`;
}

// Icon builders
function nailIcon(bottleColor, capColor, accentColor, shapeStyle = 'classic') {
  return `
    <circle cx="0" cy="0" r="135" fill="#1b171c" stroke="${accentColor}" stroke-opacity="0.3" stroke-width="2"/>
    <circle cx="0" cy="0" r="122" fill="none" stroke="${accentColor}" stroke-dasharray="4 6" stroke-opacity="0.2" stroke-width="1.5"/>

    <!-- Polish Bottle -->
    <g transform="translate(-40, 12)">
      <rect x="-32" y="-10" width="64" height="76" rx="14" fill="${bottleColor}" stroke="${accentColor}" stroke-width="2.5"/>
      <path d="M-22,6 C-10,0 10,12 22,6 L22,54 C10,60 -10,48 -22,54 Z" fill="#000000" opacity="0.35"/>
      <rect x="-24" y="6" width="7" height="46" rx="3.5" fill="#FFFFFF" opacity="0.35"/>
      <rect x="-14" y="-30" width="28" height="20" rx="4" fill="${capColor}" stroke="${accentColor}" stroke-width="2"/>
      <rect x="-18" y="-76" width="36" height="48" rx="6" fill="${capColor}" stroke="#FFFFFF" stroke-width="1.5"/>
      <line x1="-9" y1="-70" x2="-9" y2="-34" stroke="${accentColor}" stroke-width="1.5"/>
      <line x1="0" y1="-70" x2="0" y2="-34" stroke="${accentColor}" stroke-width="1.5"/>
      <line x1="9" y1="-70" x2="9" y2="-34" stroke="${accentColor}" stroke-width="1.5"/>
    </g>

    <!-- Manicure Hand Silhouette & Polish Brush -->
    <g transform="translate(42, -10)">
      <g transform="rotate(30)">
        <rect x="-5" y="-76" width="10" height="60" rx="4" fill="${capColor}"/>
        <polygon points="-7,-16 7,-16 4,14 -4,14" fill="${bottleColor}"/>
        <path d="M0,22 C-6,28 -7,36 0,42 C7,36 6,28 0,22 Z" fill="${bottleColor}"/>
      </g>
    </g>

    <!-- Sparkles -->
    <g transform="translate(90, -70)">
      <path d="M0,-14 L3,-3 L14,0 L3,3 L0,14 L-3,3 L-14,0 L-3,-3 Z" fill="${accentColor}"/>
    </g>
    <g transform="translate(-90, -60)">
      <path d="M0,-10 L2,-2 L10,0 L2,2 L0,10 L-2,2 L-10,0 L-2,-2 Z" fill="${accentColor}" opacity="0.8"/>
    </g>
    <g transform="translate(95, 65)">
      <path d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z" fill="${accentColor}" opacity="0.7"/>
    </g>
  `;
}

function hairIcon(goldColor, accentColor) {
  return `
    <circle cx="0" cy="0" r="135" fill="#1b171c" stroke="${accentColor}" stroke-opacity="0.3" stroke-width="2"/>
    <circle cx="0" cy="0" r="122" fill="none" stroke="${accentColor}" stroke-dasharray="4 6" stroke-opacity="0.2" stroke-width="1.5"/>

    <!-- Oval Salon Mirror -->
    <ellipse cx="0" cy="-10" rx="65" ry="90" fill="#242127" stroke="${goldColor}" stroke-width="3"/>
    <ellipse cx="0" cy="-10" rx="55" ry="78" fill="#16141a" stroke="${goldColor}" stroke-dasharray="3 4" stroke-opacity="0.5" stroke-width="1.5"/>
    <ellipse cx="-18" cy="-28" rx="8" ry="40" fill="#ffffff" opacity="0.12" transform="rotate(-15, -18, -28)"/>

    <!-- Hair Shears / Scissors (Layered over mirror) -->
    <g transform="translate(0, 10)">
      <!-- Left Blade -->
      <g transform="rotate(-35)">
        <circle cx="0" cy="55" r="14" fill="none" stroke="${goldColor}" stroke-width="3"/>
        <path d="M0,41 L-3,-45 C-3,-65 0,-85 0,-85 C0,-85 3,-65 3,-45 L0,41" fill="${goldColor}"/>
      </g>
      <!-- Right Blade -->
      <g transform="rotate(35)">
        <circle cx="0" cy="55" r="14" fill="none" stroke="${goldColor}" stroke-width="3"/>
        <path d="M0,41 L-3,-45 C-3,-65 0,-85 0,-85 C0,-85 3,-65 3,-45 L0,41" fill="${goldColor}"/>
      </g>
      <!-- Center Pivot Screw -->
      <circle cx="0" cy="0" r="6" fill="#1b171c" stroke="${goldColor}" stroke-width="2"/>
    </g>

    <!-- Fine Comb -->
    <g transform="translate(-80, -25) rotate(-25)">
      <rect x="-6" y="-55" width="12" height="110" rx="4" fill="${goldColor}" opacity="0.85"/>
      <!-- Comb Teeth -->
      ${Array.from({length: 12}).map((_, i) => `<line x1="6" y1="${-45 + i * 8}" x2="24" y2="${-45 + i * 8}" stroke="${goldColor}" stroke-width="2" opacity="0.85"/>`).join('')}
    </g>

    <!-- Sparkles -->
    <g transform="translate(85, -65)">
      <path d="M0,-12 L3,-3 L12,0 L3,3 L0,12 L-3,3 L-12,0 L-3,-3 Z" fill="${goldColor}"/>
    </g>
  `;
}

function waxIcon(waxColor, accentColor) {
  return `
    <circle cx="0" cy="0" r="135" fill="#1b171c" stroke="${accentColor}" stroke-opacity="0.3" stroke-width="2"/>
    <circle cx="0" cy="0" r="122" fill="none" stroke="${accentColor}" stroke-dasharray="4 6" stroke-opacity="0.2" stroke-width="1.5"/>

    <!-- Wax Warmer Machine -->
    <g transform="translate(0, 20)">
      <!-- Pot base -->
      <rect x="-65" y="-30" width="130" height="75" rx="16" fill="#2A2228" stroke="${accentColor}" stroke-width="2.5"/>
      <ellipse cx="0" cy="-30" rx="65" ry="16" fill="#3D303A" stroke="${accentColor}" stroke-width="2.5"/>
      <!-- Molten Wax Reservoir -->
      <ellipse cx="0" cy="-30" rx="52" ry="12" fill="${waxColor}"/>
      <ellipse cx="-15" cy="-32" rx="20" ry="5" fill="#FFF" opacity="0.3"/>
      <!-- Temperature Dial -->
      <circle cx="0" cy="15" r="16" fill="#1B151A" stroke="${accentColor}" stroke-width="2"/>
      <circle cx="0" cy="15" r="5" fill="${waxColor}"/>
      <line x1="0" y1="15" x2="6" y2="9" stroke="${waxColor}" stroke-width="2"/>
      <!-- Indicator LEDs -->
      <circle cx="-32" cy="15" r="3.5" fill="#52B788"/>
      <circle cx="32" cy="15" r="3.5" fill="${waxColor}"/>
    </g>

    <!-- Wooden Spatula with Wax Drip -->
    <g transform="translate(45, -35) rotate(32)">
      <rect x="-7" y="-65" width="14" height="95" rx="6" fill="#D4A373" stroke="#8C6239" stroke-width="1.5"/>
      <!-- Smooth Wax Droplet at Tip -->
      <path d="M0,30 C-9,38 -10,48 0,56 C10,48 9,38 0,30 Z" fill="${waxColor}"/>
    </g>

    <!-- Spa Lotus Blossom -->
    <g transform="translate(-65, -35)">
      <path d="M0,15 C-12,0 -16,-18 0,-28 C16,-18 12,0 0,15 Z" fill="${accentColor}" opacity="0.85"/>
      <path d="M-6,15 C-22,6 -28,-10 -15,-20 C-5,-10 -2,4 -6,15 Z" fill="${accentColor}" opacity="0.6"/>
      <path d="M6,15 C22,6 28,-10 15,-20 C5,-10 2,4 6,15 Z" fill="${accentColor}" opacity="0.6"/>
    </g>

    <!-- Sparkles -->
    <g transform="translate(85, -70)">
      <path d="M0,-10 L2,-2 L10,0 L2,2 L0,10 L-2,2 L-10,0 L-2,-2 Z" fill="${accentColor}"/>
    </g>
  `;
}

function marketStallIcon(awningColor1, awningColor2, accentColor) {
  return `
    <circle cx="0" cy="0" r="135" fill="#1d1918" stroke="${accentColor}" stroke-opacity="0.3" stroke-width="2"/>
    <circle cx="0" cy="0" r="122" fill="none" stroke="${accentColor}" stroke-dasharray="4 6" stroke-opacity="0.2" stroke-width="1.5"/>

    <!-- Market Awning (Vietnamese Chợ canopy) -->
    <g transform="translate(0, -50)">
      <polygon points="-85,15 -70,-20 70,-20 85,15" fill="#2E2018" stroke="${accentColor}" stroke-width="2"/>
      <!-- Awning Stripes -->
      <path d="M-70,-20 L-85,15 L-55,15 L-42,-20 Z" fill="${awningColor1}"/>
      <path d="M-42,-20 L-55,15 L-25,15 L-14,-20 Z" fill="${awningColor2}"/>
      <path d="M-14,-20 L-25,15 L5,15 L14,-20 Z" fill="${awningColor1}"/>
      <path d="M14,-20 L5,15 L35,15 L42,-20 Z" fill="${awningColor2}"/>
      <path d="M42,-20 L35,15 L65,15 L70,-20 Z" fill="${awningColor1}"/>
      <path d="M70,-20 L65,15 L85,15 L70,-20 Z" fill="${awningColor2}"/>
      <!-- Awning Scallops -->
      ${Array.from({length: 6}).map((_, i) => `<path d="M${-85 + i * 28},15 Q${-71 + i * 28},24 ${-57 + i * 28},15" fill="${i % 2 === 0 ? awningColor1 : awningColor2}" stroke="${accentColor}" stroke-width="1"/>`).join('')}
    </g>

    <!-- Market Counter & Woven Bamboo Baskets -->
    <g transform="translate(0, 35)">
      <!-- Counter table -->
      <rect x="-75" y="-35" width="150" height="25" rx="5" fill="#8C532B" stroke="${accentColor}" stroke-width="2"/>
      
      <!-- Baskets with Fresh Produce -->
      <!-- Left basket (tropical fruit / watermelon) -->
      <ellipse cx="-45" cy="-28" rx="26" ry="14" fill="#C98A4C" stroke="#683B1B" stroke-width="2"/>
      <ellipse cx="-45" cy="-35" rx="14" ry="14" fill="#2D6A4F"/>
      <path d="M-55,-35 Q-45,-25 -35,-35" stroke="#1B4332" stroke-width="2" fill="none"/>

      <!-- Center basket (fresh mangoes / oranges) -->
      <ellipse cx="0" cy="-22" rx="28" ry="15" fill="#C98A4C" stroke="#683B1B" stroke-width="2"/>
      <circle cx="-10" cy="-28" r="9" fill="#E76F51"/>
      <circle cx="8" cy="-30" r="9" fill="#F4A261"/>
      <circle cx="0" cy="-36" r="8" fill="#E9C46A"/>

      <!-- Right basket (greens & herbs) -->
      <ellipse cx="45" cy="-28" rx="26" ry="14" fill="#C98A4C" stroke="#683B1B" stroke-width="2"/>
      <path d="M35,-42 Q45,-55 52,-38 Q60,-48 65,-36" stroke="#52B788" stroke-width="5" stroke-linecap="round" fill="none"/>
    </g>

    <!-- Traditional Conical Hat Accent (Nón lá) -->
    <g transform="translate(68, -48)">
      <polygon points="0,-18 -26,12 26,12" fill="#E9C46A" stroke="#B08938" stroke-width="1.5"/>
      <line x1="0" y1="-18" x2="0" y2="12" stroke="#B08938" stroke-width="1"/>
    </g>
  `;
}

function supermarketCartIcon(cartColor, accentColor) {
  return `
    <circle cx="0" cy="0" r="135" fill="#171b1d" stroke="${accentColor}" stroke-opacity="0.3" stroke-width="2"/>
    <circle cx="0" cy="0" r="122" fill="none" stroke="${accentColor}" stroke-dasharray="4 6" stroke-opacity="0.2" stroke-width="1.5"/>

    <!-- Modern Shopping Cart -->
    <g transform="translate(-15, 10)">
      <!-- Handle -->
      <path d="M-75,-50 L-55,-50 L-42,-15" stroke="${accentColor}" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <!-- Cart Basket Frame -->
      <polygon points="-42,-15 55,-15 42,35 -30,35" fill="none" stroke="${accentColor}" stroke-width="4" stroke-linejoin="round"/>
      <!-- Basket Grid Wire Lines -->
      <line x1="-36" y1="0" x2="48" y2="0" stroke="${accentColor}" stroke-width="2" opacity="0.6"/>
      <line x1="-33" y1="18" x2="45" y2="18" stroke="${accentColor}" stroke-width="2" opacity="0.6"/>
      <line x1="-15" y1="-15" x2="-8" y2="35" stroke="${accentColor}" stroke-width="2" opacity="0.6"/>
      <line x1="8" y1="-15" x2="12" y2="35" stroke="${accentColor}" stroke-width="2" opacity="0.6"/>
      <line x1="30" y1="-15" x2="28" y2="35" stroke="${accentColor}" stroke-width="2" opacity="0.6"/>
      
      <!-- Cart Wheels & Underframe -->
      <path d="M-30,35 L-20,48 L35,48 L42,35" stroke="${accentColor}" stroke-width="3.5" fill="none"/>
      <circle cx="-16" cy="54" r="8" fill="#171b1d" stroke="${accentColor}" stroke-width="3"/>
      <circle cx="35" cy="54" r="8" fill="#171b1d" stroke="${accentColor}" stroke-width="3"/>

      <!-- Fresh Groceries Inside Cart -->
      <!-- Baguette / Loaf -->
      <g transform="translate(18, -32) rotate(35)">
        <rect x="-8" y="-30" width="16" height="50" rx="8" fill="#E9C46A" stroke="#B08938" stroke-width="1.5"/>
        <line x1="-4" y1="-18" x2="4" y2="-12" stroke="#B08938" stroke-width="1.5"/>
        <line x1="-4" y1="-6" x2="4" y2="0" stroke="#B08938" stroke-width="1.5"/>
      </g>
      <!-- Wine / Bottle -->
      <g transform="translate(-18, -26) rotate(-15)">
        <rect x="-10" y="-15" width="20" height="35" rx="5" fill="${cartColor}" stroke="${accentColor}" stroke-width="1.5"/>
        <rect x="-5" y="-30" width="10" height="16" fill="${cartColor}" stroke="${accentColor}" stroke-width="1.5"/>
      </g>
      <!-- Fresh Apple / Orange -->
      <circle cx="0" cy="-18" r="14" fill="#E63946" stroke="#9E1B26" stroke-width="1.5"/>
      <path d="M0,-32 Q5,-35 8,-28" stroke="#52B788" stroke-width="2" fill="none"/>
    </g>

    <!-- Grocery Shelf in background -->
    <g transform="translate(0, -65)" opacity="0.35">
      <line x1="-70" y1="0" x2="70" y2="0" stroke="${accentColor}" stroke-width="2"/>
      <rect x="-50" y="-18" width="16" height="18" fill="${accentColor}"/>
      <rect x="-30" y="-22" width="14" height="22" fill="${accentColor}"/>
      <rect x="15" y="-20" width="18" height="20" fill="${accentColor}"/>
      <rect x="38" y="-16" width="14" height="16" fill="${accentColor}"/>
    </g>

    <!-- Sparkles -->
    <g transform="translate(85, -60)">
      <path d="M0,-10 L2,-2 L10,0 L2,2 L0,10 L-2,2 L-10,0 L-2,-2 Z" fill="${accentColor}"/>
    </g>
  `;
}

function washingMachineIcon(machineColor, accentColor, variant = 'express') {
  return `
    <circle cx="0" cy="0" r="135" fill="#151b22" stroke="${accentColor}" stroke-opacity="0.3" stroke-width="2"/>
    <circle cx="0" cy="0" r="122" fill="none" stroke="${accentColor}" stroke-dasharray="4 6" stroke-opacity="0.2" stroke-width="1.5"/>

    <!-- Front Load Washing Machine Body -->
    <g transform="translate(0, 10)">
      <rect x="-70" y="-75" width="140" height="135" rx="18" fill="#1F2833" stroke="${accentColor}" stroke-width="3"/>
      
      <!-- Top Control Console -->
      <line x1="-70" y1="-42" x2="70" y2="-42" stroke="${accentColor}" stroke-opacity="0.4" stroke-width="1.5"/>
      <!-- Detergent Drawer -->
      <rect x="-58" y="-66" width="34" height="16" rx="4" fill="#151b22" stroke="${accentColor}" stroke-width="1.5"/>
      <!-- Digital Display Panel -->
      <rect x="22" y="-66" width="38" height="16" rx="4" fill="#0B131C" stroke="${accentColor}" stroke-width="1.5"/>
      <circle cx="30" cy="-58" r="2.5" fill="#48CAE4"/>
      <circle cx="38" cy="-58" r="2.5" fill="#52B788"/>
      <circle cx="46" cy="-58" r="2.5" fill="${accentColor}"/>
      <!-- Cycle Dial -->
      <circle cx="-5" cy="-58" r="8" fill="#151b22" stroke="${accentColor}" stroke-width="2"/>

      <!-- Circular Porthole Door -->
      <circle cx="0" cy="18" r="46" fill="#111A24" stroke="${accentColor}" stroke-width="3"/>
      <circle cx="0" cy="18" r="38" fill="${machineColor}" fill-opacity="0.2" stroke="${accentColor}" stroke-dasharray="4 4" stroke-width="1.5"/>

      <!-- Swirling Water Drum Vortex -->
      <g transform="translate(0, 18)">
        <path d="M-22,-10 Q0,-26 22,-10 Q15,15 -5,22 Q-26,10 -22,-10 Z" fill="${accentColor}" fill-opacity="0.35"/>
        <path d="M-15,-4 Q0,-16 15,-4 Q10,10 -3,14 Q-16,8 -15,-4 Z" fill="#FFFFFF" fill-opacity="0.45"/>
        <circle cx="0" cy="2" r="5" fill="#FFFFFF" opacity="0.6"/>
      </g>
    </g>

    <!-- Floating Clean Detergent Bubbles -->
    <circle cx="75" cy="-45" r="14" fill="${accentColor}" fill-opacity="0.25" stroke="${accentColor}" stroke-width="1.5"/>
    <circle cx="78" cy="-48" r="4" fill="#FFFFFF" opacity="0.6"/>

    <circle cx="95" cy="-15" r="9" fill="${accentColor}" fill-opacity="0.2" stroke="${accentColor}" stroke-width="1.5"/>
    <circle cx="-75" cy="-35" r="11" fill="${accentColor}" fill-opacity="0.2" stroke="${accentColor}" stroke-width="1.5"/>
    <circle cx="-88" cy="10" r="7" fill="${accentColor}" fill-opacity="0.2" stroke="${accentColor}" stroke-width="1"/>

    <!-- Sparkles -->
    <g transform="translate(80, -75)">
      <path d="M0,-12 L3,-3 L12,0 L3,3 L0,12 L-3,3 L-12,0 L-3,-3 Z" fill="${accentColor}"/>
    </g>
    <g transform="translate(-75, 55)">
      <path d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z" fill="${accentColor}" opacity="0.8"/>
    </g>
  `;
}

// 16 Target Definitions
const TARGETS = [
  // 1. Eggsy Nails
  {
    category: 'beauty',
    slug: 'eggsy-nails-4e43a',
    title: 'Eggsy Nails',
    eyebrow: 'Nail Salon · Phu Quoc',
    subtitle: 'Artisan Gel Nails, Manicure & Nail Care',
    bgStart: '#2A1820',
    bgEnd: '#170E13',
    accentColor: '#F7C59F',
    secondaryColor: '#EFEFD0',
    iconSvg: nailIcon('#E88D67', '#F7C59F', '#F7C59F')
  },
  // 2. Fame Nails
  {
    category: 'beauty',
    slug: 'fame-nails-thao-dien-26e2f',
    title: 'Fame Nails',
    eyebrow: 'Nail Salon · Phu Quoc',
    subtitle: 'Chic Manicure Lounge & Premium Nail Art',
    bgStart: '#2B1224',
    bgEnd: '#150812',
    accentColor: '#E0AFA0',
    secondaryColor: '#F4ACB7',
    iconSvg: nailIcon('#B56576', '#E0AFA0', '#E0AFA0')
  },
  // 3. Golden Nail
  {
    category: 'beauty',
    slug: 'golden-nail-thao-ien-9e506',
    title: 'Golden Nail',
    eyebrow: 'Nail Salon · Phu Quoc',
    subtitle: 'Luxury Golden Care, Gel & Spa Manicure',
    bgStart: '#262016',
    bgEnd: '#14100A',
    accentColor: '#E9C46A',
    secondaryColor: '#F4A261',
    iconSvg: nailIcon('#DDA15E', '#E9C46A', '#E9C46A')
  },
  // 4. Ace Nails & Beauty
  {
    category: 'beauty',
    slug: 'ace-nails-beauty',
    title: 'Ace Nails & Beauty',
    eyebrow: 'Nail Salon · Phu Quoc',
    subtitle: 'Modern Nail Studio & Beauty Aesthetics',
    bgStart: '#241B26',
    bgEnd: '#120D14',
    accentColor: '#DDA15E',
    secondaryColor: '#CCD5AE',
    iconSvg: nailIcon('#BC6C25', '#DDA15E', '#DDA15E')
  },
  // 5. Maria Nail House
  {
    category: 'beauty',
    slug: 'maria-nail-house-nail-care-massage-hair-wash-lash-facial-tha-db227',
    title: 'Maria Nail House',
    eyebrow: 'Nail Salon · Phu Quoc',
    subtitle: 'Nail Care, Lash & Beauty Wellness Lounge',
    bgStart: '#29181E',
    bgEnd: '#160D10',
    accentColor: '#F28482',
    secondaryColor: '#F7EDE2',
    iconSvg: nailIcon('#84A59D', '#F28482', '#F28482')
  },
  // 6. Meadow Nails
  {
    category: 'beauty',
    slug: 'meadow-nails-thao-ien',
    title: 'Meadow Nails',
    eyebrow: 'Nail Salon · Phu Quoc',
    subtitle: 'Botanical Floral Nails & Gentle Care',
    bgStart: '#18241D',
    bgEnd: '#0D1410',
    accentColor: '#A3B18A',
    secondaryColor: '#DAD7CD',
    iconSvg: nailIcon('#588157', '#A3B18A', '#A3B18A')
  },
  // 7. Nail By My
  {
    category: 'beauty',
    slug: 'nail-by-my-goi-au-duong-sinh',
    title: 'Nail By Mỳ',
    eyebrow: 'Nail Salon · Phu Quoc',
    subtitle: 'Gội đầu dưỡng sinh & Nail Studio',
    bgStart: '#1F241C',
    bgEnd: '#10140E',
    accentColor: '#CCD5AE',
    secondaryColor: '#E9D8A6',
    iconSvg: nailIcon('#6B705C', '#CCD5AE', '#CCD5AE')
  },
  // 8. Golden Elegance Hair
  {
    category: 'beauty',
    slug: 'golden-elegance-hair-17d84',
    title: 'Golden Elegance Hair',
    eyebrow: 'Hair Salon · Phu Quoc',
    subtitle: 'Couture Hair Styling, Cut & Color Studio',
    bgStart: '#201C17',
    bgEnd: '#100D0A',
    accentColor: '#D4AF37',
    secondaryColor: '#F3E5AB',
    iconSvg: hairIcon('#D4AF37', '#F3E5AB')
  },
  // 9. EMPO Waxing
  {
    category: 'beauty',
    slug: 'empo-waxing-thao-ien',
    title: 'EMPO waxing',
    eyebrow: 'Waxing Studio · Phu Quoc',
    subtitle: 'Gentle Body & Facial Waxing Studio',
    bgStart: '#261F18',
    bgEnd: '#140F0A',
    accentColor: '#E07A5F',
    secondaryColor: '#F4F1DE',
    iconSvg: waxIcon('#F4A261', '#E07A5F')
  },
  // 10. Annam Gourmet
  {
    category: 'market',
    slug: 'annam-gourmet-thao-dien',
    title: 'Annam Gourmet',
    eyebrow: 'Supermarket · Phu Quoc',
    subtitle: 'Fine European Groceries & Gourmet Market',
    bgStart: '#14271D',
    bgEnd: '#0A150F',
    accentColor: '#E9C46A',
    secondaryColor: '#E76F51',
    iconSvg: supermarketCartIcon('#264653', '#E9C46A')
  },
  // 11. Cho Phu Quoc
  {
    category: 'market',
    slug: 'cho-thao-dien',
    title: 'Chợ Thảo Điền',
    eyebrow: 'Fresh Market · Phu Quoc',
    subtitle: 'Traditional Local Fresh Produce & Market Life',
    bgStart: '#2B1C15',
    bgEnd: '#160E0A',
    accentColor: '#F4A261',
    secondaryColor: '#E9C46A',
    iconSvg: marketStallIcon('#E76F51', '#F4A261', '#E9C46A')
  },
  // 12. WinMart Vincom Mega Mall
  {
    category: 'market',
    slug: 'winmart-vincom-mega-mall-thao-dien',
    title: 'WinMart Vincom',
    eyebrow: 'Supermarket · Phu Quoc',
    subtitle: 'Fresh Grocery & Daily Essentials Market',
    bgStart: '#261215',
    bgEnd: '#14080A',
    accentColor: '#E63946',
    secondaryColor: '#A8DADC',
    iconSvg: supermarketCartIcon('#E63946', '#F1FAEE')
  },
  // 13. Giat Sieu Toc 24/24
  {
    category: 'services',
    slug: 'giat-sieu-toc-thao-dien',
    title: 'Giặt Siêu Tốc 24/24',
    eyebrow: 'Laundry & Dry Clean · Phu Quoc',
    subtitle: '24/7 Express Wash & Fold Laundry Service',
    bgStart: '#0E2235',
    bgEnd: '#06111D',
    accentColor: '#48CAE4',
    secondaryColor: '#90E0EF',
    iconSvg: washingMachineIcon('#0077B6', '#48CAE4', 'express')
  },
  // 14. HUBI Cleaner
  {
    category: 'services',
    slug: 'hubi-cleaner-xuan-thuy',
    title: 'HUBI Cleaner',
    eyebrow: 'Cleaning & Laundry · Phu Quoc',
    subtitle: 'Garment Care, Dry Cleaning & Laundry Express',
    bgStart: '#122521',
    bgEnd: '#091512',
    accentColor: '#52B788',
    secondaryColor: '#D8F3DC',
    iconSvg: washingMachineIcon('#2D6A4F', '#52B788', 'clean')
  },
  // 15. Ocean Laundry
  {
    category: 'services',
    slug: 'ocean-laundry-thao-dien',
    title: 'Ocean Laundry',
    eyebrow: 'Laundry & Linen · Phu Quoc',
    subtitle: 'Fresh Ocean Scent Laundry & Towel Care',
    bgStart: '#0C202E',
    bgEnd: '#051019',
    accentColor: '#00B4D8',
    secondaryColor: '#CAF0F8',
    iconSvg: washingMachineIcon('#0077B6', '#00B4D8', 'ocean')
  },
  // 16. Ohashi Laundry
  {
    category: 'services',
    slug: 'ohashi-laundry-thao-dien',
    title: 'Ohashi Laundry',
    eyebrow: 'Premium Laundry · Phu Quoc',
    subtitle: 'Japanese Delicate Fabric & Garment Care',
    bgStart: '#141C2B',
    bgEnd: '#090E17',
    accentColor: '#B8C1EC',
    secondaryColor: '#EEBBC3',
    iconSvg: washingMachineIcon('#3D5A80', '#B8C1EC', 'delicate')
  }
];

async function generateAll() {
  console.log(`Starting generation of ${TARGETS.length} representative illustrations...`);
  const results = [];

  for (const t of TARGETS) {
    const filename = `${t.category}__${t.slug}-v2.webp`;
    const dest = path.join(OUT_DIR, filename);

    if (fs.existsSync(dest)) {
      console.warn(`[WARN] Destination file already exists: ${filename} - Skipping to avoid overwrite.`);
      continue;
    }

    const svg = makeSvg(t);
    const buf = await sharp(Buffer.from(svg))
      .webp({ quality: 90, effort: 6 })
      .toBuffer();

    fs.writeFileSync(dest, buf);
    const stat = fs.statSync(dest);

    console.log(`[OK] Generated: ${filename} (${(stat.size / 1024).toFixed(1)} KB, 1200x800)`);
    results.push({
      slug: t.slug,
      name: t.title,
      category: t.category,
      eyebrow: t.eyebrow,
      file: filename,
      path: `/images/biz/${filename}`,
      sizeKb: (stat.size / 1024).toFixed(1)
    });
  }

  console.log('\n--- Summary Table ---');
  console.table(results.map(r => ({
    Slug: r.slug,
    Name: r.name,
    Category: r.category,
    File: r.file,
    Size: `${r.sizeKb} KB`
  })));
}

generateAll().catch(err => {
  console.error('Fatal error during generation:', err);
  process.exit(1);
});
