import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Easing, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../theme';

const { width: SCREEN_W } = Dimensions.get('window');

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: 4 + Math.random() * 8,
  x: Math.random() * SCREEN_W,
  y: Math.random() * 600,
  speed: 1500 + Math.random() * 3000,
  opacity: 0.1 + Math.random() * 0.25,
}));

function FloatingParticle({ p }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: p.speed, useNativeDriver: Platform.OS !== 'web', easing: Easing.linear }),
        Animated.timing(anim, { toValue: 0, duration: 0, useNativeDriver: Platform.OS !== 'web' }),
      ])
    ).start();
  }, []);
  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -130] });
  const opacity = anim.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, p.opacity, p.opacity, 0] });
  return (
    <Animated.View style={[styles.particle, { width: p.size, height: p.size, borderRadius: p.size / 2, left: p.x, top: p.y, opacity, transform: [{ translateY }], backgroundColor: p.id % 3 === 0 ? colors.primary : p.id % 3 === 1 ? colors.accent : colors.accentGreen }]} />
  );
}

export default function WelcomeScreen({ navigation }) {
  // Staggered entrance animations
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  const featuresOpacity = useRef(new Animated.Value(0)).current;
  const featuresTranslateY = useRef(new Animated.Value(40)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.9)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;

  // Pulsing glow
  const pulseAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    // Logo entrance: bounce scale + rotate
    Animated.parallel([
      Animated.spring(logoScale, { toValue: 1, friction: 5, tension: 80, useNativeDriver: Platform.OS !== 'web' }),
      Animated.timing(logoRotate, { toValue: 1, duration: 600, useNativeDriver: Platform.OS !== 'web', easing: Easing.out(Easing.back(1.5)) }),
    ]).start();

    // Title fade-in after logo
    Animated.parallel([
      Animated.timing(titleOpacity, { toValue: 1, duration: 500, delay: 300, useNativeDriver: Platform.OS !== 'web' }),
      Animated.timing(titleTranslateY, { toValue: 0, duration: 500, delay: 300, useNativeDriver: Platform.OS !== 'web', easing: Easing.out(Easing.cubic) }),
    ]).start();

    // Features stagger in
    Animated.parallel([
      Animated.timing(featuresOpacity, { toValue: 1, duration: 600, delay: 600, useNativeDriver: Platform.OS !== 'web' }),
      Animated.timing(featuresTranslateY, { toValue: 0, duration: 600, delay: 600, useNativeDriver: Platform.OS !== 'web', easing: Easing.out(Easing.cubic) }),
    ]).start();

    // Button bounce in
    Animated.parallel([
      Animated.timing(buttonOpacity, { toValue: 1, duration: 400, delay: 900, useNativeDriver: Platform.OS !== 'web' }),
      Animated.spring(buttonScale, { toValue: 1, friction: 6, tension: 100, delay: 900, useNativeDriver: Platform.OS !== 'web' }),
    ]).start();

    // Footer
    Animated.timing(footerOpacity, { toValue: 1, duration: 400, delay: 1100, useNativeDriver: Platform.OS !== 'web' }).start();

    // Continuous pulse glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: Platform.OS !== 'web', easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulseAnim, { toValue: 0.6, duration: 1500, useNativeDriver: Platform.OS !== 'web', easing: Easing.inOut(Easing.ease) }),
      ])
    ).start();
  }, []);

  const rotateInterp = logoRotate.interpolate({ inputRange: [0, 1], outputRange: ['-15deg', '0deg'] });
  const pulseGlow = pulseAnim.interpolate({ inputRange: [0.6, 1], outputRange: [0.3, 0.7] });

  return (
    <LinearGradient colors={['#0F1023', '#1A1B2E', '#252742']} style={styles.container}>
      {/* Floating particles */}
      {particles.map(p => <FloatingParticle key={p.id} p={p} />)}

      <View style={styles.scrollContent}>
        {/* Hero section */}
        <View style={styles.heroContainer}>
          {/* Pulsing glow ring */}
          <Animated.View style={[styles.glowRing, { opacity: pulseGlow }]} />
          <Animated.View style={[styles.logoCircle, { transform: [{ scale: logoScale }, { rotate: rotateInterp }] }]}>
            <LinearGradient colors={colors.gradientPrimary} style={styles.logoInner}>
              <Text style={styles.logoEmoji}>🎯</Text>
            </LinearGradient>
          </Animated.View>

          <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleTranslateY }], alignItems: 'center' }}>
            <Text style={styles.brandName}>Career Trial</Text>
            <Text style={styles.tagline}>Try before you choose</Text>
          </Animated.View>
        </View>

        {/* Feature cards with staggered entrance */}
        <Animated.View style={[styles.featuresContainer, { opacity: featuresOpacity, transform: [{ translateY: featuresTranslateY }] }]}>
          <FeatureRow icon="flash" color={colors.accentYellow} title="15-minute Quick Trial" subtitle="Get a taste of any career" delay={0} />
          <FeatureRow icon="calendar" color={colors.accent} title="1-Day Professional" subtitle="Live a full workday" delay={100} />
          <FeatureRow icon="rocket" color={colors.accentGreen} title="Week Simulation" subtitle="Full immersion with team" delay={200} />
        </Animated.View>

        {/* CTA button */}
        <Animated.View style={{ opacity: buttonOpacity, transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity onPress={() => navigation.navigate('Onboarding')} activeOpacity={0.85}>
            <LinearGradient colors={colors.gradientPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.startButton}>
              <Text style={styles.startButtonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={22} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ opacity: footerOpacity }}>
          <Text style={styles.footerText}>Explore 50+ careers with real scenarios</Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

function FeatureRow({ icon, color, title, subtitle, delay }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 400, delay: 700 + delay, useNativeDriver: Platform.OS !== 'web' }),
      Animated.timing(translateX, { toValue: 0, duration: 400, delay: 700 + delay, useNativeDriver: Platform.OS !== 'web', easing: Easing.out(Easing.cubic) }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateX }] }}>
      <View style={styles.featureRow}>
        <View style={[styles.featureIcon, { backgroundColor: `${color}22` }]}>
          <Ionicons name={icon} size={22} color={color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.featureTitle}>{title}</Text>
          <Text style={styles.featureSubtitle}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.xxl,
    paddingTop: Platform.OS === 'web' ? 40 : 60,
    paddingBottom: 30,
    flex: 1,
    justifyContent: 'center',
  },
  particle: { position: 'absolute' },
  heroContainer: { alignItems: 'center', marginTop: 10, position: 'relative' },
  glowRing: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: colors.primary,
    top: -20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 20,
  },
  logoCircle: {
    width: 110, height: 110, borderRadius: 55,
    ...shadows.glow(colors.primary),
    marginBottom: spacing.lg, alignItems: 'center', justifyContent: 'center',
  },
  logoInner: { width: 110, height: 110, borderRadius: 55, alignItems: 'center', justifyContent: 'center' },
  logoEmoji: { fontSize: 50 },
  brandName: { fontSize: typography.hero, fontWeight: typography.heavy, color: colors.textPrimary, letterSpacing: 0.5 },
  tagline: { fontSize: typography.body, color: colors.textSecondary, marginTop: spacing.sm },
  featuresContainer: { gap: spacing.md, marginVertical: spacing.xl },
  featureRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card,
    padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border,
  },
  featureIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  featureTitle: { color: colors.textPrimary, fontWeight: typography.semibold, fontSize: typography.bodySmall },
  featureSubtitle: { color: colors.textSecondary, fontSize: typography.caption, marginTop: 2 },
  startButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: spacing.lg, borderRadius: borderRadius.round, gap: spacing.sm,
    ...shadows.large, marginTop: spacing.md,
  },
  startButtonText: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold },
  footerText: { color: colors.textMuted, fontSize: typography.caption, textAlign: 'center', marginTop: spacing.md },
});
