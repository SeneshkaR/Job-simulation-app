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

// Career-specific colors
export const careerColors = {
  'software-engineer': { primary: '#6C63FF', gradient: ['#6C63FF', '#8B83FF'] },
  'nurse': { primary: '#FF6B9D', gradient: ['#FF6B9D', '#FF8C42'] },
  'civil-engineer': { primary: '#FF8C42', gradient: ['#FF8C42', '#FFD93D'] },
  'digital-marketer': { primary: '#00D9FF', gradient: ['#00D9FF', '#6C63FF'] },
  'teacher': { primary: '#00E5A0', gradient: ['#00E5A0', '#00D9FF'] },
  'lawyer': { primary: '#8B83FF', gradient: ['#8B83FF', '#FF6B9D'] },
  'accountant': { primary: '#FFD93D', gradient: ['#FFD93D', '#FF8C42'] },
  'data-scientist': { primary: '#00D9FF', gradient: ['#6C63FF', '#00D9FF'] },
  'psychologist': { primary: '#FF6B9D', gradient: ['#FF6B9D', '#8B83FF'] },
  'architect': { primary: '#FF8C42', gradient: ['#FF8C42', '#FFD93D'] },
};
