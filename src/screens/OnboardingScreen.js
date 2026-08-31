import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Animated, Platform, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { useApp } from '../context/AppContext';
import { careers } from '../data/careers';

const steps = ['info', 'interests'];

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
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
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

  const getCareerCount = (interest) => {
    return careers.filter(c => interest.categories.includes(c.category)).length;
  };

  const validateForm = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Please enter your name';
    if (!age.trim()) errs.age = 'Please enter your age';
    else {
      const n = parseInt(age, 10);
      if (isNaN(n) || n < 10 || n > 99) errs.age = 'Enter a valid age (10-99)';
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Enter a valid email';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const canProceed = () => {
    if (step === 0) return name.trim().length > 0 && age.trim().length > 0;
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
        name: name.trim(),
        age: parseInt(age, 10),
        email: email.trim(),
        ageGroup,
        interests: selectedInterests,
      });
      navigation.replace('Main');
    }
  };

  const back = () => {
    if (step > 0) animateStep(() => setStep(step - 1));
    else navigation.goBack();
  };

  return (
    <LinearGradient colors={['#0F1023', '#1A1B2E']} style={styles.container}>
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

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={{ opacity: stepOpacity, transform: [{ translateY: stepTranslateY }] }}>
            {step === 0 && (
              <>
                <Text style={styles.title}>Tell us about you</Text>
                <Text style={styles.subtitle}>Basic info helps us personalize your experience</Text>

                {/* Name field */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Full Name <Text style={{ color: colors.error }}>*</Text></Text>
                  <View style={[styles.inputWrap, errors.name && styles.inputWrapError]}>
                    <Ionicons name="person-outline" size={20} color={colors.textMuted} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your name"
                      placeholderTextColor={colors.textMuted}
                      value={name}
                      onChangeText={(t) => { setName(t); if (errors.name) setErrors({ ...errors, name: null }); }}
                      autoFocus
                    />
                  </View>
                  {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
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
                  {/* Auto age group badge */}
                  {ageGroup && (
                    <Animated.View style={styles.ageGroupBadge}>
                      <LinearGradient colors={colors.gradientPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ageGroupBadgeInner}>
                        <Ionicons name="checkmark-circle" size={16} color="#fff" />
                        <Text style={styles.ageGroupText}>{getAgeGroupLabel(ageGroup)}</Text>
                      </LinearGradient>
                    </Animated.View>
                  )}
                </View>

                {/* Email field */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Email <Text style={styles.optional}>(optional)</Text></Text>
                  <View style={[styles.inputWrap, errors.email && styles.inputWrapError]}>
                    <Ionicons name="mail-outline" size={20} color={colors.textMuted} />
                    <TextInput
                      style={styles.input}
                      placeholder="your@email.com"
                      placeholderTextColor={colors.textMuted}
                      value={email}
                      onChangeText={(t) => { setEmail(t); if (errors.email) setErrors({ ...errors, email: null }); }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>
              </>
            )}

            {step === 1 && (
              <>
                <Text style={styles.title}>What interests you?</Text>
                <Text style={styles.subtitle}>Select topics to filter careers that match your passions</Text>

                <View style={styles.selectedCount}>
                  <Ionicons name="funnel" size={16} color={colors.primary} />
                  <Text style={styles.countText}>
                    {selectedInterests.length > 0
                      ? `${selectedInterests.length} selected · ${
                          careers.filter(c => {
                            const selectedCats = selectedInterests.flatMap(i => interests.find(x => x.id === i)?.categories || []);
                            return selectedCats.includes(c.category);
                          }).length
                        } careers matched`
                      : 'Pick at least 1 topic'}
                  </Text>
                </View>

                <View style={styles.interestGrid}>
                  {interests.map(i => {
                    const active = selectedInterests.includes(i.id);
                    const count = getCareerCount(i);
                    return (
                      <TouchableOpacity
                        key={i.id}
                        onPress={() => toggleInterest(i.id)}
                        activeOpacity={0.85}
                        style={[styles.interestChip, active && styles.interestChipActive]}
                      >
                        <Text style={styles.interestIcon}>{i.icon}</Text>
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.interestLabel, active && { color: '#fff' }]}>{i.label}</Text>
                          <Text style={[styles.interestCount, active && { color: 'rgba(255,255,255,0.7)' }]}>
                            {count} career{count !== 1 ? 's' : ''}
                          </Text>
                        </View>
                        {active && <Ionicons name="checkmark-circle" size={20} color="#fff" />}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            )}
          </Animated.View>
        </ScrollView>

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

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'web' ? 24 : 60 },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, marginBottom: spacing.xl, paddingHorizontal: spacing.xxl },
  backBtn: { padding: 4 },
  progressBar: { flex: 1, flexDirection: 'row', gap: spacing.sm },
  progressDot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.border },
  progressDotActive: { backgroundColor: colors.primary },
  stepLabel: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.semibold },
  content: { paddingHorizontal: spacing.xxl, paddingVertical: spacing.lg },
  title: { fontSize: typography.h1, fontWeight: typography.bold, color: colors.textPrimary, marginBottom: spacing.sm },
  subtitle: { fontSize: typography.body, color: colors.textSecondary, marginBottom: spacing.xxl },

  // Form fields
  fieldGroup: { marginBottom: spacing.xl },
  fieldLabel: { color: colors.textPrimary, fontSize: typography.bodySmall, fontWeight: typography.semibold, marginBottom: spacing.sm },
  optional: { color: colors.textMuted, fontWeight: '400', fontSize: typography.caption },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card,
    borderRadius: borderRadius.lg, paddingHorizontal: spacing.lg, gap: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  inputWrapError: { borderColor: colors.error },
  input: { flex: 1, paddingVertical: spacing.md, color: colors.textPrimary, fontSize: typography.body },
  errorText: { color: colors.error, fontSize: typography.caption, marginTop: spacing.xs },
  ageGroupBadge: { marginTop: spacing.sm },
  ageGroupBadgeInner: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
    borderRadius: borderRadius.round, alignSelf: 'flex-start',
  },
  ageGroupText: { color: '#fff', fontSize: typography.caption, fontWeight: typography.semibold },

  // Interests
  selectedCount: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.lg, backgroundColor: `${colors.primary}15`, padding: spacing.md, borderRadius: borderRadius.lg },
  countText: { color: colors.primary, fontWeight: typography.semibold, fontSize: typography.bodySmall },
  interestGrid: { gap: spacing.md },
  interestChip: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
    borderRadius: borderRadius.lg, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, gap: spacing.md,
  },
  interestChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  interestIcon: { fontSize: 24 },
  interestLabel: { color: colors.textSecondary, fontWeight: typography.semibold, fontSize: typography.bodySmall },
  interestCount: { color: colors.textMuted, fontSize: typography.tiny, marginTop: 2 },

  // Bottom
  bottomBar: { paddingHorizontal: spacing.xxl, paddingBottom: Platform.OS === 'web' ? 20 : 40, paddingTop: spacing.md },
  nextButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.lg, borderRadius: borderRadius.round, gap: spacing.sm, ...shadows.large },
  nextButtonText: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold },
});
