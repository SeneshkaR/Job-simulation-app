// AI-generated career hero images mapped by career id.
// Careers without a generated photo fall back to gradient + emoji in the UI.

export const careerImages = {
  // Careers with generated photos
  'software-engineer': require('../../assets/software-engineer.png'),
  'nurse': require('../../assets/nurse.png'),
  'civil-engineer': require('../../assets/civil-engineer.png'),
  'digital-marketer': require('../../assets/digital-marketer.png'),
  'teacher': require('../../assets/teacher.png'),
  'lawyer': require('../../assets/lawyer.png'),
  'accountant': require('../../assets/accountant.png'),
  'data-scientist': require('../../assets/data-scientist.png'),
  'psychologist': require('../../assets/psychologist.png'),
  'architect': require('../../assets/architect.png'),
  'pharmacist': require('../../assets/pharmacist.png'),
  'physical-therapist': require('../../assets/physical-therapist.png'),
  'dentist': require('../../assets/dentist.png'),
  'veterinarian': require('../../assets/veterinarian.png'),
  'biomedical-scientist': require('../../assets/biomedical-scientist.png'),
  'cybersecurity-analyst': require('../../assets/cybersecurity-analyst.png'),
  'ux-ui-designer': require('../../assets/ux-ui-designer.png'),
  'cloud-engineer': require('../../assets/cloud-engineer.png'),
  'game-developer': require('../../assets/game-developer.png'),
  'ai-ml-engineer': require('../../assets/ai-ml-engineer.png'),
  'financial-analyst': require('../../assets/financial-analyst.png'),
  'human-resources-manager': require('../../assets/human-resources-manager.png'),
  'product-manager': require('../../assets/product-manager.png'),
  'management-consultant': require('../../assets/management-consultant.png'),
  'electrician': require('../../assets/electrician.png'),
  'plumber': require('../../assets/plumber.png'),
  'hvac-technician': require('../../assets/hvac-technician.png'),
  'welder': require('../../assets/welder.png'),
  'graphic-designer': require('../../assets/graphic-designer.png'),
  'video-editor': require('../../assets/video-editor.png'),
  'journalist': require('../../assets/journalist.png'),
  'musician-composer': require('../../assets/musician-composer.png'),
  'police-officer': require('../../assets/police-officer.png'),
  'firefighter': require('../../assets/firefighter.png'),
  'social-worker': require('../../assets/social-worker.png'),
  'diplomat-foreign-service-officer': require('../../assets/diplomat-foreign-service-officer.png'),
  'chef': require('../../assets/chef.png'),
  'hotel-manager': require('../../assets/hotel-manager.png'),
  'environmental-scientist': require('../../assets/environmental-scientist.png'),

  // Careers using the gradient + emoji fallback until photos are generated
  'meteorologist': null,
  'personal-trainer': null,
  'physical-therapist-assistant': null,
  'school-counselor': null,
  'public-relations-specialist': null,
  'content-creator-youtuber': null,
  'e-commerce-entrepreneur': null,
  'supply-chain-analyst': null,
  'athletic-trainer-coach': null,
  'airline-pilot': null,
  'real-estate-agent': null,
};

export const heroWorkdayImage = require('../../assets/hero-workday.png');

export function getCareerImage(careerId) {
  return careerImages[careerId] || null;
}
