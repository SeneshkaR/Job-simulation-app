import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, careerColors } from '../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { useApp } from '../context/AppContext';
import { careers } from '../data/careers';

export default function HomeScreen({ navigation }) {
  const { state } = useApp();
  const name = state.user.name || 'Explorer';
  const featuredCareers = careers.slice(0, 4);
  const completedCount = state.user.completedTrials.length;

  return (
    <LinearGradient colors={['#0F1023', '#1A1B2E']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>Hey {name} 👋</Text>
            <Text style={styles.subGreeting}>Ready to explore a career today?</Text>
          </View>
          <TouchableOpacity style={styles.avatarButton}>
            <LinearGradient colors={colors.gradientPrimary} style={styles.avatar}>
              <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard icon="trophy" color={colors.accentYellow} value={completedCount} label="Trials done" />
          <StatCard icon="star" color={colors.accentGreen} value={state.scores.length} label="Scores earned" />
          <StatCard icon="git-compare" color={colors.accent} value={state.comparisons.length} label="Comparisons" />
        </View>

        {/* Continue trial banner */}
        {state.trials.active && (
          <TouchableOpacity
            onPress={() => navigation.navigate(state.trials.active.trialType || 'DayTrial')}
            activeOpacity={0.9}
          >
            <LinearGradient colors={['#FF6B9D', '#FF8C42']} style={styles.continueBanner}>
              <View style={{ flex: 1 }}>
                <Text style={styles.continueLabel}>CONTINUE TRIAL</Text>
                <Text style={styles.continueTitle}>{state.trials.active.careerTitle}</Text>
              </View>
              <Ionicons name="play-circle" size={44} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Quick actions */}
        <Text style={styles.sectionTitle}>Quick Start</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActions}>
          <QuickAction icon="flash" label="15-min Trial" gradient={['#FFD93D', '#FF8C42']}
            onPress={() => navigation.navigate('Explore')} />
          <QuickAction icon="calendar" label="Day Trial" gradient={['#6C63FF', '#00D9FF']}
            onPress={() => navigation.navigate('Explore')} />
          <QuickAction icon="rocket" label="Week Sim" gradient={['#00E5A0', '#00D9FF']}
            onPress={() => navigation.navigate('Explore')} />
          <QuickAction icon="git-compare" label="Compare" gradient={['#FF6B9D', '#8B83FF']}
            onPress={() => navigation.navigate('Compare')} />
        </ScrollView>

        {/* Featured careers */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Featured Careers</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {featuredCareers.map(career => (
          <TouchableOpacity
            key={career.id}
            onPress={() => navigation.navigate('CareerDetail', { careerId: career.id })}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={careerColors[career.id]?.gradient || colors.gradientPrimary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.careerCard}
            >
              <View style={styles.careerCardContent}>
                <Text style={styles.careerEmoji}>{career.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.careerTitle}>{career.title}</Text>
                  <Text style={styles.careerDesc}>{career.shortDescription}</Text>
                  <View style={styles.careerMetaRow}>
                    <View style={styles.metaChip}>
                      <Ionicons name="cash" size={12} color="#fff" />
                      <Text style={styles.metaText}>${Math.round(career.salaryRange.min/1000)}k+</Text>
                    </View>
                    <View style={styles.metaChip}>
                      <Ionicons name="trending-up" size={12} color="#fff" />
                      <Text style={styles.metaText}>{career.demandLevel}</Text>
                    </View>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
}

function StatCard({ icon, color, value, label }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIconWrap, { backgroundColor: `${color}22` }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function QuickAction({ icon, label, gradient, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <LinearGradient colors={gradient} style={styles.quickAction}>
        <Ionicons name={icon} size={26} color="#fff" />
        <Text style={styles.quickActionLabel}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingTop: Platform.OS === 'web' ? 24 : 60, paddingHorizontal: spacing.xxl, paddingBottom: 30 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xxl },
  greeting: { fontSize: typography.h1, fontWeight: typography.bold, color: colors.textPrimary },
  subGreeting: { fontSize: typography.body, color: colors.textSecondary, marginTop: 4 },
  avatarButton: { width: 50, height: 50 },
  avatar: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold },
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xxl },
  statCard: { flex: 1, backgroundColor: colors.card, padding: spacing.lg, borderRadius: borderRadius.lg, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  statIconWrap: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  statValue: { color: colors.textPrimary, fontSize: typography.h2, fontWeight: typography.bold },
  statLabel: { color: colors.textSecondary, fontSize: typography.caption, marginTop: 2 },
  continueBanner: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderRadius: borderRadius.lg, marginBottom: spacing.xl, ...shadows.medium },
  continueLabel: { color: 'rgba(255,255,255,0.85)', fontSize: typography.caption, fontWeight: typography.bold, letterSpacing: 1 },
  continueTitle: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold, marginTop: 2 },
  sectionTitle: { fontSize: typography.h2, fontWeight: typography.bold, color: colors.textPrimary, marginBottom: spacing.lg, marginTop: spacing.md },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  seeAll: { color: colors.primary, fontWeight: typography.semibold, fontSize: typography.bodySmall },
  quickActions: { gap: spacing.md, paddingRight: spacing.lg },
  quickAction: { width: 120, height: 100, borderRadius: borderRadius.lg, padding: spacing.md, justifyContent: 'space-between', ...shadows.medium },
  quickActionLabel: { color: '#fff', fontWeight: typography.bold, fontSize: typography.bodySmall },
  careerCard: { borderRadius: borderRadius.lg, marginBottom: spacing.md, ...shadows.medium },
  careerCardContent: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, gap: spacing.md },
  careerEmoji: { fontSize: 44 },
  careerTitle: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold },
  careerDesc: { color: 'rgba(255,255,255,0.85)', fontSize: typography.bodySmall, marginTop: 2 },
  careerMetaRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  metaChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: 10 },
  metaText: { color: '#fff', fontSize: typography.tiny, fontWeight: typography.semibold, textTransform: 'capitalize' },
});
