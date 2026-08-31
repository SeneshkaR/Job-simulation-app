// Dark luxurious theme with vibrant accents — feels premium and game-like
export const colors = {
  // Core backgrounds
  background: '#0F1023',
  surface: '#1A1B2E',
  surfaceLight: '#252742',
  card: '#1E2035',
  
  // Primary gradient (energetic purple-blue)
  primary: '#6C63FF',
  primaryLight: '#8B83FF',
  primaryDark: '#4A42DB',
  
  // Accent colors for career categories
  accent: '#00D9FF',
  accentGreen: '#00E5A0',
  accentOrange: '#FF8C42',
  accentPink: '#FF6B9D',
  accentYellow: '#FFD93D',
  
  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A8A8C8',
  textMuted: '#6B6B8A',
  textDark: '#1A1B2E',
  
  // Status
  success: '#00E5A0',
  warning: '#FFD93D',
  error: '#FF4D6A',
  info: '#00D9FF',
  
  // Scores
  scoreHigh: '#00E5A0',
  scoreMedium: '#FFD93D',
  scoreLow: '#FF6B9D',
  
  // Gradients (array format for LinearGradient)
  gradientPrimary: ['#6C63FF', '#00D9FF'],
  gradientWarm: ['#FF6B9D', '#FF8C42'],
  gradientSuccess: ['#00E5A0', '#00D9FF'],
  gradientDark: ['#0F1023', '#1A1B2E'],
  gradientCard: ['#1E2035', '#252742'],
  
  // Overlays
  overlay: 'rgba(15, 16, 35, 0.85)',
  overlayLight: 'rgba(15, 16, 35, 0.5)',
  
  // Borders
  border: '#2A2B45',
  borderLight: '#353660',
};

// Career-specific colors (all 50 careers)
export const careerColors = {
  // Technology
  'software-engineer': { primary: '#6C63FF', gradient: ['#6C63FF', '#8B83FF'] },
  'data-scientist': { primary: '#00D9FF', gradient: ['#6C63FF', '#00D9FF'] },
  'cybersecurity-analyst': { primary: '#6C63FF', gradient: ['#4A42DB', '#6C63FF'] },
  'cloud-engineer': { primary: '#00D9FF', gradient: ['#00D9FF', '#6C63FF'] },
  'game-developer': { primary: '#8B83FF', gradient: ['#8B83FF', '#6C63FF'] },
  'ai-ml-engineer': { primary: '#6C63FF', gradient: ['#6C63FF', '#00D9FF'] },
  // Healthcare
  'nurse': { primary: '#FF6B9D', gradient: ['#FF6B9D', '#FF8C42'] },
  'pharmacist': { primary: '#FF6B9D', gradient: ['#FF6B9D', '#8B83FF'] },
  'physical-therapist': { primary: '#FF8C42', gradient: ['#FF6B9D', '#FF8C42'] },
  'dentist': { primary: '#FF6B9D', gradient: ['#FF8C42', '#FF6B9D'] },
  'veterinarian': { primary: '#00E5A0', gradient: ['#FF6B9D', '#00E5A0'] },
  'physical-therapist-assistant': { primary: '#FF8C42', gradient: ['#FF6B9D', '#FF8C42'] },
  // Engineering
  'civil-engineer': { primary: '#FF8C42', gradient: ['#FF8C42', '#FFD93D'] },
  // Business
  'digital-marketer': { primary: '#00D9FF', gradient: ['#00D9FF', '#6C63FF'] },
  'accountant': { primary: '#FFD93D', gradient: ['#FFD93D', '#FF8C42'] },
  'financial-analyst': { primary: '#FFD93D', gradient: ['#FF8C42', '#FFD93D'] },
  'human-resources-manager': { primary: '#FF8C42', gradient: ['#FFD93D', '#FF8C42'] },
  'product-manager': { primary: '#FFD93D', gradient: ['#FFD93D', '#6C63FF'] },
  'management-consultant': { primary: '#FF8C42', gradient: ['#FF8C42', '#FFD93D'] },
  'supply-chain-analyst': { primary: '#FFD93D', gradient: ['#FFD93D', '#00D9FF'] },
  'e-commerce-entrepreneur': { primary: '#FF8C42', gradient: ['#FF8C42', '#FFD93D'] },
  'public-relations-specialist': { primary: '#FFD93D', gradient: ['#FF6B9D', '#FFD93D'] },
  'real-estate-agent': { primary: '#FF8C42', gradient: ['#FFD93D', '#FF8C42'] },
  // Education
  'teacher': { primary: '#00E5A0', gradient: ['#00E5A0', '#00D9FF'] },
  'school-counselor': { primary: '#00E5A0', gradient: ['#00D9FF', '#00E5A0'] },
  // Law
  'lawyer': { primary: '#8B83FF', gradient: ['#8B83FF', '#FF6B9D'] },
  // Design
  'ux-ui-designer': { primary: '#FF6B9D', gradient: ['#FF6B9D', '#00D9FF'] },
  'graphic-designer': { primary: '#FF6B9D', gradient: ['#FF6B9D', '#FFD93D'] },
  // Science
  'psychologist': { primary: '#FF6B9D', gradient: ['#FF6B9D', '#8B83FF'] },
  'architect': { primary: '#FF8C42', gradient: ['#FF8C42', '#FFD93D'] },
  'biomedical-scientist': { primary: '#00D9FF', gradient: ['#00D9FF', '#00E5A0'] },
  'environmental-scientist': { primary: '#00E5A0', gradient: ['#00E5A0', '#6C63FF'] },
  'meteorologist': { primary: '#00D9FF', gradient: ['#00D9FF', '#8B83FF'] },
  // Trades
  'electrician': { primary: '#FFD93D', gradient: ['#FFD93D', '#FF8C42'] },
  'plumber': { primary: '#00D9FF', gradient: ['#00D9FF', '#FFD93D'] },
  'hvac-technician': { primary: '#FF8C42', gradient: ['#FF8C42', '#00D9FF'] },
  'welder': { primary: '#FF8C42', gradient: ['#FF8C42', '#FF6B9D'] },
  // Creative
  'video-editor': { primary: '#8B83FF', gradient: ['#8B83FF', '#FF6B9D'] },
  'journalist': { primary: '#6C63FF', gradient: ['#6C63FF', '#FFD93D'] },
  'musician-composer': { primary: '#FF6B9D', gradient: ['#8B83FF', '#FF6B9D'] },
  'content-creator-youtuber': { primary: '#FF6B9D', gradient: ['#FF6B9D', '#FFD93D'] },
  // Public Service
  'police-officer': { primary: '#6C63FF', gradient: ['#6C63FF', '#00D9FF'] },
  'firefighter': { primary: '#FF8C42', gradient: ['#FF6B9D', '#FF8C42'] },
  'social-worker': { primary: '#00E5A0', gradient: ['#00E5A0', '#8B83FF'] },
  'diplomat-foreign-service-officer': { primary: '#8B83FF', gradient: ['#8B83FF', '#00D9FF'] },
  // Hospitality
  'chef': { primary: '#FF8C42', gradient: ['#FF8C42', '#FF6B9D'] },
  'hotel-manager': { primary: '#FFD93D', gradient: ['#FFD93D', '#FF6B9D'] },
  // Sports & Wellness
  'personal-trainer': { primary: '#00E5A0', gradient: ['#00E5A0', '#FFD93D'] },
  'athletic-trainer-coach': { primary: '#00E5A0', gradient: ['#FFD93D', '#00E5A0'] },
  // Transportation
  'airline-pilot': { primary: '#00D9FF', gradient: ['#00D9FF', '#FFD93D'] },
};
