import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { useApp } from '../context/AppContext';

const steps = ['name', 'age', 'interests'];
const ageGroups = [
  { id: 'teen', label: 'Teen', range: '13 - 17', icon: '🎓', description: 'Exploring career paths' },
  { id: 'young-adult', label: 'Young Adult', range: '18 - 24', icon: '🎯', description: 'Choosing majors or first jobs' },
];
const interests = [
  { id: 'tech', label: 'Technology', icon: '💻' },
  { id: 'health', label: 'Healthcare', icon: '🩺' },
  { id: 'design', label: 'Design', icon: '🎨' },
  { id: 'business', label: 'Business', icon: '📊' },
  { id: 'science', label: 'Science', icon: '🔬' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'law', label: 'Law', icon: '⚖️' },
  { id: 'engineering', label: 'Engineering', icon: '🏗️' },
];

export default function OnboardingScreen({ navigation }) {
  const { setUser } = useApp();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (id) => {
    setSelectedInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const canProceed = () => {
    if (step === 0) return name.trim().length > 0;
    if (step === 1) return ageGroup !== null;
    if (step === 2) return selectedInterests.length > 0;
  };

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setUser({ name, ageGroup, interests: selectedInterests });
      navigation.replace('Main');
    }
  };

  return (
    <LinearGradient colors={['#0F1023', '#1A1B2E']} style={styles.container}>
      <View style={styles.header}>
        {step > 0 && (
          <TouchableOpacity onPress={() => setStep(step - 1)}>
            <Ionicons name="arrow-back" size={26} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
        <View style={styles.progressBar}>
          {steps.map((_, i) => (
            <View key={i} style={[styles.progressDot, i <= step && styles.progressDotActive]} />
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {step === 0 && (
          <>
            <Text style={styles.title}>What should we call you?</Text>
            <Text style={styles.subtitle}>Let's personalize your experience</Text>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor={colors.textMuted}
              value={name}
              onChangeText={setName}
              autoFocus
            />
          </>
        )}

        {step === 1 && (
          <>
            <Text style={styles.title}>How old are you?</Text>
            <Text style={styles.subtitle}>We'll tailor content to your level</Text>
            {ageGroups.map(g => (
              <TouchableOpacity
                key={g.id}
                onPress={() => setAgeGroup(g.id)}
                activeOpacity={0.85}
                style={[styles.ageCard, ageGroup === g.id && styles.ageCardActive]}
              >
                <Text style={styles.ageEmoji}>{g.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.ageLabel}>{g.label}</Text>
                  <Text style={styles.ageRange}>{g.range}</Text>
                  <Text style={styles.ageDesc}>{g.description}</Text>
                </View>
                {ageGroup === g.id && <Ionicons name="checkmark-circle" size={26} color={colors.primary} />}
              </TouchableOpacity>
            ))}
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.title}>What interests you?</Text>
            <Text style={styles.subtitle}>Pick as many as you like</Text>
            <View style={styles.interestGrid}>
              {interests.map(i => (
                <TouchableOpacity
                  key={i.id}
                  onPress={() => toggleInterest(i.id)}
                  activeOpacity={0.85}
                  style={[styles.interestChip, selectedInterests.includes(i.id) && styles.interestChipActive]}
                >
                  <Text style={styles.interestIcon}>{i.icon}</Text>
                  <Text style={[styles.interestLabel, selectedInterests.includes(i.id) && { color: '#fff' }]}>{i.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <TouchableOpacity onPress={next} disabled={!canProceed()} activeOpacity={0.85} style={{ opacity: canProceed() ? 1 : 0.4 }}>
        <LinearGradient colors={colors.gradientPrimary} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>{step === steps.length - 1 ? 'Start Exploring' : 'Continue'}</Text>
          <Ionicons name="arrow-forward" size={22} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'web' ? 24 : 60, paddingHorizontal: spacing.xxl, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, marginBottom: spacing.xxl },
  progressBar: { flex: 1, flexDirection: 'row', gap: spacing.sm },
  progressDot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.border },
  progressDotActive: { backgroundColor: colors.primary },
  content: { paddingVertical: spacing.xl },
  title: { fontSize: typography.h1, fontWeight: typography.bold, color: colors.textPrimary, marginBottom: spacing.sm },
  subtitle: { fontSize: typography.body, color: colors.textSecondary, marginBottom: spacing.xxxl },
  input: { backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.lg, color: colors.textPrimary, fontSize: typography.h3, borderWidth: 1, borderColor: colors.border },
  ageCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: spacing.lg, borderRadius: borderRadius.lg, marginBottom: spacing.md, borderWidth: 2, borderColor: colors.border },
  ageCardActive: { borderColor: colors.primary, ...shadows.glow(colors.primary) },
  ageEmoji: { fontSize: 40, marginRight: spacing.lg },
  ageLabel: { fontSize: typography.h3, fontWeight: typography.bold, color: colors.textPrimary },
  ageRange: { color: colors.primary, fontSize: typography.bodySmall, marginTop: 2 },
  ageDesc: { color: colors.textSecondary, fontSize: typography.caption, marginTop: 2 },
  interestGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.md },
  interestChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: borderRadius.round, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, gap: spacing.sm },
  interestChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  interestIcon: { fontSize: 20 },
  interestLabel: { color: colors.textSecondary, fontWeight: typography.semibold },
  nextButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.lg, borderRadius: borderRadius.round, gap: spacing.sm, ...shadows.large },
  nextButtonText: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold },
});
