import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Animated, Platform, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { careers } from '../data/careers';

const steps = ['info', 'interests'];

// Appearance modes offered during onboarding (applied app-wide)
const themeModes = [
  { id: 'light', label: 'Light', icon: 'sunny-outline' },
  { id: 'dark', label: 'Dark', icon: 'moon-outline' },
  { id: 'default', label: 'Default', icon: 'contrast-outline' },
];

// Gender options for the personal info step
const genderOptions = [
  { id: 'male', label: 'Male', icon: 'male-outline' },
  { id: 'female', label: 'Female', icon: 'female-outline' },
  { id: 'prefer-not-to-say', label: 'Prefer not to say', icon: 'person-outline' },
];

// Interest options with mapping to career categories
const interests = [
  { id: 'tech', label: 'Technology', icon: '💻', categories: ['Technology'] },
  { id: 'health', label: 'Healthcare', icon: '🩺', categories: ['Healthcare'] },
  { id: 'design', label: 'Design', icon: '🎨', categories: ['Design'] },
  { id: 'business', label: 'Business', icon: '📊', categories: ['Business'] },
  { id: 'science', label: 'Science', icon: '🔬', categories: ['Science'] },
  { id: 'education', label: 'Education', icon: '📚', categories: ['Education'] },
  { id: 'law', label: 'Law & Justice', icon: '⚖️', categories: ['Law', 'Public Service'] },
  { id: 'engineering', label: 'Engineering', icon: '🏗️', categories: ['Engineering'] },
  { id: 'trades', label: 'Skilled Trades', icon: '🔧', categories: ['Trades'] },
  { id: 'creative', label: 'Creative Arts', icon: '🎬', categories: ['Creative', 'Design'] },
  { id: 'sports', label: 'Sports & Fitness', icon: '⚽', categories: ['Sports & Wellness'] },
  { id: 'service', label: 'Public Service', icon: '🛡️', categories: ['Public Service'] },
  { id: 'hospitality', label: 'Food & Hospitality', icon: '🍳', categories: ['Hospitality'] },
  { id: 'transport', label: 'Aviation & Transport', icon: '✈️', categories: ['Transportation'] },
];

// Auto-determine age group from numeric age
function getAgeGroup(age) {
  if (!age) return null;
  const n = parseInt(age, 10);
  if (isNaN(n)) return null;
  if (n >= 13 && n <= 17) return 'teen';
  if (n >= 18 && n <= 24) return 'young-adult';
  if (n >= 25) return 'adult';
  return null;
}

function getAgeGroupLabel(group) {
  if (group === 'teen') return 'Teen Explorer (13–17)';
  if (group === 'young-adult') return 'Young Adult (18–24)';
  if (group === 'adult') return 'Adult (25+)';
  return '';
}

export default function OnboardingScreen({ navigation }) {
  const { setUser } = useApp();
  const { user: authUser } = useAuth();
  const { colors, theme, setMode } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const accountNameParts = (authUser?.name || '').trim().split(/\s+/).filter(Boolean);
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState(accountNameParts[0] || '');
  const [lastName, setLastName] = useState(accountNameParts.slice(1).join(' '));
  const [gender, setGender] = useState('prefer-not-to-say');
  const [age, setAge] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [errors, setErrors] = useState({});

  // Animations
  const stepOpacity = useRef(new Animated.Value(1)).current;
  const stepTranslateY = useRef(new Animated.Value(0)).current;

  const ageGroup = getAgeGroup(age);

  const toggleInterest = (id) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const validateForm = () => {
    const errs = {};
    if (!firstName.trim()) errs.firstName = 'Please enter your first name';
    if (!lastName.trim()) errs.lastName = 'Please enter your last name';
    if (!age.trim()) errs.age = 'Please enter your age';
    else {
      const n = parseInt(age, 10);
      if (isNaN(n) || n < 10 || n > 99) errs.age = 'Enter a valid age (10-99)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const canProceed = () => {
    if (step === 0) return firstName.trim().length > 0 && lastName.trim().length > 0 && age.trim().length > 0;
    if (step === 1) return selectedInterests.length > 0;
    return false;
  };

  const animateStep = (cb) => {
    Animated.parallel([
      Animated.timing(stepOpacity, { toValue: 0, duration: 150, useNativeDriver: Platform.OS !== 'web' }),
      Animated.timing(stepTranslateY, { toValue: -20, duration: 150, useNativeDriver: Platform.OS !== 'web' }),
    ]).start(() => {
      cb();
      stepTranslateY.setValue(20);
      Animated.parallel([
        Animated.timing(stepOpacity, { toValue: 1, duration: 300, useNativeDriver: Platform.OS !== 'web' }),
        Animated.timing(stepTranslateY, { toValue: 0, duration: 300, useNativeDriver: Platform.OS !== 'web' }),
      ]).start();
    });
  };

  const next = () => {
    if (step === 0) {
      if (!validateForm()) return;
    }
    if (step < steps.length - 1) {
      animateStep(() => setStep(step + 1));
    } else {
      setUser({
        name: `${firstName.trim()} ${lastName.trim()}`.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: authUser?.email || '',
        gender,
        age: parseInt(age, 10),
        ageGroup,
        interests: selectedInterests,
        hasCompletedOnboarding: true,
      });
      navigation.replace('Main');
    }
  };

  const back = () => {
    if (step > 0) animateStep(() => setStep(step - 1));
    else navigation.goBack();
  };

  // Count matched careers for current selections
  const matchedCareerCount = careers.filter(c => {
    const selectedCats = selectedInterests.flatMap(i => interests.find(x => x.id === i)?.categories || []);
    return selectedCats.includes(c.category);
  }).length;

  return (
    <LinearGradient colors={colors.gradientDark} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={back} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={26} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.progressBar}>
            {steps.map((_, i) => (
              <View key={i} style={[styles.progressDot, i <= step && styles.progressDotActive]} />
            ))}
          </View>
          <Text style={styles.stepLabel}>{step + 1}/{steps.length}</Text>
        </View>

        {step === 0 ? (
          /* Step 0: Tell us about you — scrollable for form fields */
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View style={{ opacity: stepOpacity, transform: [{ translateY: stepTranslateY }] }}>
              <Text style={styles.title}>Tell us about you</Text>
              <Text style={styles.subtitle}>Basic info helps us personalize your experience</Text>

              {/* Name fields */}
              <View style={styles.nameRow}>
                <View style={styles.fieldGroupHalf}>
                  <Text style={styles.fieldLabel}>First Name <Text style={{ color: colors.error }}>*</Text></Text>
                  <View style={[styles.inputWrap, errors.firstName && styles.inputWrapError]}>
                    <Ionicons name="person-outline" size={20} color={colors.textMuted} />
                    <TextInput
                      style={styles.input}
                      placeholder="First name"
                      placeholderTextColor={colors.textMuted}
                      value={firstName}
                      onChangeText={(t) => { setFirstName(t); if (errors.firstName) setErrors({ ...errors, firstName: null }); }}
                      autoFocus
                    />
                  </View>
                  {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                </View>
                <View style={styles.fieldGroupHalf}>
                  <Text style={styles.fieldLabel}>Last Name <Text style={{ color: colors.error }}>*</Text></Text>
                  <View style={[styles.inputWrap, errors.lastName && styles.inputWrapError]}>
                    <Ionicons name="person-outline" size={20} color={colors.textMuted} />
                    <TextInput
                      style={styles.input}
                      placeholder="Last name"
                      placeholderTextColor={colors.textMuted}
                      value={lastName}
                      onChangeText={(t) => { setLastName(t); if (errors.lastName) setErrors({ ...errors, lastName: null }); }}
                    />
                  </View>
                  {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                </View>
              </View>

              {/* Age field */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Age <Text style={{ color: colors.error }}>*</Text></Text>
                <View style={[styles.inputWrap, errors.age && styles.inputWrapError]}>
                  <Ionicons name="calendar-outline" size={20} color={colors.textMuted} />
                  <TextInput
                    style={styles.input}
                    placeholder="Your age"
                    placeholderTextColor={colors.textMuted}
                    value={age}
                    onChangeText={(t) => { setAge(t.replace(/[^0-9]/g, '')); if (errors.age) setErrors({ ...errors, age: null }); }}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                </View>
                {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
                {ageGroup && (
                  <Animated.View style={styles.ageGroupBadge}>
                    <LinearGradient colors={colors.gradientPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ageGroupBadgeInner}>
                      <Ionicons name="checkmark-circle" size={16} color="#fff" />
                      <Text style={styles.ageGroupText}>{getAgeGroupLabel(ageGroup)}</Text>
                    </LinearGradient>
                  </Animated.View>
                )}
              </View>

              {/* Gender picker */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Gender</Text>
                <View style={styles.genderRow}>
                  {genderOptions.map((g) => {
                    const active = gender === g.id;
                    return (
                      <TouchableOpacity
                        key={g.id}
                        onPress={() => setGender(g.id)}
                        activeOpacity={0.85}
                        style={[styles.genderBtn, active && styles.genderBtnActive]}
                      >
                        <Ionicons name={g.icon} size={22} color={active ? colors.primary : colors.textMuted} />
                        <Text style={[styles.genderBtnLabel, active && styles.genderBtnLabelActive]}>{g.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Appearance mode picker — applies to the whole app */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Appearance</Text>
                <View style={styles.modeRow}>
                  {themeModes.map((m) => {
                    const active = theme === m.id;
                    return (
                      <TouchableOpacity
                        key={m.id}
                        onPress={() => setMode(m.id)}
                        activeOpacity={0.85}
                        style={[styles.modeBtn, active && styles.modeBtnActive]}
                      >
                        <Ionicons name={m.icon} size={20} color={active ? colors.primary : colors.textMuted} />
                        <Text style={[styles.modeBtnLabel, active && styles.modeBtnLabelActive]}>{m.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Text style={styles.modeHint}>
                  {theme === 'default' ? 'Default follows your device setting' : `${theme.charAt(0).toUpperCase() + theme.slice(1)} mode selected`} · you can change it anytime in Settings
                </Text>
              </View>
            </Animated.View>
          </ScrollView>
        ) : (
          /* Step 1: Interests — fits on one screen, no scroll needed */
          <View style={styles.content}>
            <Animated.View style={{ opacity: stepOpacity, transform: [{ translateY: stepTranslateY }] }}>
              <Text style={styles.title}>What interests you?</Text>
              <Text style={styles.subtitle}>Select topics to see matching careers</Text>

              <View style={styles.selectedCount}>
                <Ionicons name="funnel" size={16} color={colors.primary} />
                <Text style={styles.countText}>
                  {selectedInterests.length > 0
                    ? `${selectedInterests.length} selected · ${matchedCareerCount} careers matched`
                    : 'Pick at least 1 topic'}
                </Text>
                {selectedInterests.length >= 2 && (
                  <View style={styles.recommendedBadge}>
                    <Ionicons name="sparkles" size={12} color={colors.accentYellow} />
                    <Text style={styles.recommendedText}>Recommended for You</Text>
                  </View>
                )}
              </View>

              {/* 2-column grid that fits on screen */}
              <View style={styles.interestGrid}>
                {interests.map(i => {
                  const active = selectedInterests.includes(i.id);
                  return (
                    <TouchableOpacity
                      key={i.id}
                      onPress={() => toggleInterest(i.id)}
                      activeOpacity={0.85}
                      style={[styles.interestChip, active && styles.interestChipActive]}
                    >
                      <Text style={styles.interestIcon}>{i.icon}</Text>
                      <Text style={[styles.interestLabel, active && { color: '#fff' }]} numberOfLines={1}>{i.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Animated.View>
          </View>
        )}

        {/* Bottom button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={next} disabled={!canProceed()} activeOpacity={0.85} style={{ opacity: canProceed() ? 1 : 0.4, flex: 1 }}>
            <LinearGradient colors={colors.gradientPrimary} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>
                {step === steps.length - 1 ? 'Start Exploring' : 'Continue'}
              </Text>
              <Ionicons name="arrow-forward" size={22} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'web' ? 24 : 60 },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, marginBottom: spacing.lg, paddingHorizontal: spacing.xxl },
  backBtn: { padding: 4 },
  progressBar: { flex: 1, flexDirection: 'row', gap: spacing.sm },
  progressDot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.border },
  progressDotActive: { backgroundColor: colors.primary },
  stepLabel: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.semibold },
  content: { paddingHorizontal: spacing.xxl, paddingVertical: spacing.sm, flex: 1 },
  title: { fontSize: typography.h1, fontWeight: typography.bold, color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: typography.body, color: colors.textSecondary, marginBottom: spacing.lg },

  // Form fields
  fieldGroup: { marginBottom: spacing.lg },
  fieldLabel: { color: colors.textPrimary, fontSize: typography.bodySmall, fontWeight: typography.semibold, marginBottom: spacing.sm },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card,
    borderRadius: borderRadius.lg, paddingHorizontal: spacing.lg, gap: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  inputWrapError: { borderColor: colors.error },
  input: { flex: 1, paddingVertical: spacing.md, color: colors.textPrimary, fontSize: typography.body },
  errorText: { color: colors.error, fontSize: typography.caption, marginTop: spacing.xs },

  // Name fields — side by side
  nameRow: { flexDirection: 'row', gap: spacing.md },
  fieldGroupHalf: { flex: 1, marginBottom: spacing.lg },
  ageGroupBadge: { marginTop: spacing.sm },
  ageGroupBadgeInner: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
    borderRadius: borderRadius.round, alignSelf: 'flex-start',
  },
  ageGroupText: { color: '#fff', fontSize: typography.caption, fontWeight: typography.semibold },

  // Gender picker
  genderRow: { flexDirection: 'row', gap: spacing.sm },
  genderBtn: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.xs,
    paddingVertical: spacing.md, minHeight: 72, borderRadius: borderRadius.lg,
    backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.border,
  },
  genderBtnActive: { borderColor: colors.primary, backgroundColor: `${colors.primary}18` },
  genderBtnLabel: { color: colors.textSecondary, fontSize: typography.caption, fontWeight: typography.semibold, textAlign: 'center' },
  genderBtnLabelActive: { color: colors.primary, fontWeight: typography.bold },

  // Appearance mode picker
  modeRow: { flexDirection: 'row', gap: spacing.sm },
  modeBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
    paddingVertical: spacing.md, borderRadius: borderRadius.lg,
    backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.border,
  },
  modeBtnActive: { borderColor: colors.primary, backgroundColor: `${colors.primary}18` },
  modeBtnLabel: { color: colors.textSecondary, fontSize: typography.bodySmall, fontWeight: typography.semibold },
  modeBtnLabelActive: { color: colors.primary, fontWeight: typography.bold },
  modeHint: { color: colors.textMuted, fontSize: typography.caption, marginTop: spacing.sm },

  // Interests — compact 2-column grid
  selectedCount: {
    flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.sm,
    marginBottom: spacing.md, backgroundColor: `${colors.primary}15`,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.lg,
  },
  countText: { color: colors.primary, fontWeight: typography.semibold, fontSize: typography.bodySmall },
  recommendedBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: `${colors.accentYellow}22`, paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: 10 },
  recommendedText: { color: colors.accentYellow, fontSize: typography.tiny, fontWeight: typography.bold },
  interestGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm,
  },
  interestChip: {
    width: '48%', flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderRadius: borderRadius.md, backgroundColor: colors.card,
    borderWidth: 1, borderColor: colors.border, gap: spacing.sm,
  },
  interestChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  interestIcon: { fontSize: 18 },
  interestLabel: { color: colors.textSecondary, fontWeight: typography.semibold, fontSize: typography.caption, flex: 1 },

  // Bottom
  bottomBar: { paddingHorizontal: spacing.xxl, paddingBottom: Platform.OS === 'web' ? 20 : 40, paddingTop: spacing.sm },
  nextButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.lg, borderRadius: borderRadius.round, gap: spacing.sm, ...shadows.large },
  nextButtonText: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold },
});
