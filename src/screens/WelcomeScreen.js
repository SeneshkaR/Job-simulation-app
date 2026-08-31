import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient colors={['#0F1023', '#1A1B2E', '#252742']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.heroContainer}>
          <View style={styles.logoCircle}>
            <LinearGradient colors={colors.gradientPrimary} style={styles.logoInner}>
              <Text style={styles.logoEmoji}>🎯</Text>
            </LinearGradient>
          </View>
          <Text style={styles.brandName}>Career Trial</Text>
          <Text style={styles.tagline}>Try before you choose</Text>
        </View>

        <View style={styles.featuresContainer}>
          <FeatureRow icon="flash" color={colors.accentYellow} title="15-minute Quick Trial" subtitle="Get a taste of any career" />
          <FeatureRow icon="calendar" color={colors.accent} title="1-Day Professional" subtitle="Live a full workday" />
          <FeatureRow icon="rocket" color={colors.accentGreen} title="Week Simulation" subtitle="Full immersion with team" />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Onboarding')} activeOpacity={0.85}>
          <LinearGradient colors={colors.gradientPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.startButton}>
            <Text style={styles.startButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={22} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footerText}>Explore 50+ careers with real scenarios</Text>
      </ScrollView>
    </LinearGradient>
  );
}

function FeatureRow({ icon, color, title, subtitle }) {
  return (
    <View style={styles.featureRow}>
      <View style={[styles.featureIcon, { backgroundColor: `${color}22` }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.xxl,
    paddingTop: Platform.OS === 'web' ? 40 : 60,
    paddingBottom: 30,
  },
  heroContainer: { alignItems: 'center', marginTop: 10 },
  logoCircle: { width: 110, height: 110, borderRadius: 55, ...shadows.glow(colors.primary), marginBottom: spacing.lg, alignItems: 'center', justifyContent: 'center' },
  logoInner: { width: 110, height: 110, borderRadius: 55, alignItems: 'center', justifyContent: 'center' },
  logoEmoji: { fontSize: 50 },
  brandName: { fontSize: typography.hero, fontWeight: typography.heavy, color: colors.textPrimary, letterSpacing: 0.5 },
  tagline: { fontSize: typography.body, color: colors.textSecondary, marginTop: spacing.sm },
  featuresContainer: { gap: spacing.md, marginVertical: spacing.xl },
  featureRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border },
  featureIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  featureTitle: { color: colors.textPrimary, fontWeight: typography.semibold, fontSize: typography.bodySmall },
  featureSubtitle: { color: colors.textSecondary, fontSize: typography.caption, marginTop: 2 },
  startButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.lg, borderRadius: borderRadius.round, gap: spacing.sm, ...shadows.large },
  startButtonText: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold },
  footerText: { color: colors.textMuted, fontSize: typography.caption, textAlign: 'center', marginTop: spacing.md },
});
