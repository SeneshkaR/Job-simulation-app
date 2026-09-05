import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { careerColors } from '../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { careers, categories } from '../data/careers';
import { getCareerImage } from '../data/careerImages';

// Interest -> category mapping (same as OnboardingScreen)
const interestCategoryMap = {
  tech: ['Technology'],
  health: ['Healthcare'],
  design: ['Design'],
  business: ['Business'],
  science: ['Science'],
  education: ['Education'],
  law: ['Law', 'Public Service'],
  engineering: ['Engineering'],
  trades: ['Trades'],
  creative: ['Creative', 'Design'],
  sports: ['Sports & Wellness'],
  service: ['Public Service'],
  hospitality: ['Hospitality'],
  transport: ['Transportation'],
};

function getFilteredCareers(interests) {
  if (!interests || interests.length === 0) return careers;
  const selectedCats = interests.flatMap(i => interestCategoryMap[i] || []);
  const filtered = careers.filter(c => selectedCats.includes(c.category));
  return filtered.length > 0 ? filtered : careers;
}

export default function HomeScreen({ navigation }) {
  const { state } = useApp();
  const { isAuthenticated, isGuest } = useAuth();
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const name = state.user.name || 'Explorer';
  const ageGroup = state.user.ageGroup;
  const interests = state.user.interests || [];
  const [selectedFilter, setSelectedFilter] = useState('All');

  const recommendedCareers = getFilteredCareers(interests);

  // Further filter by category chip if selected
  const displayCareers = selectedFilter === 'All'
    ? recommendedCareers
    : recommendedCareers.filter(c => c.category === selectedFilter);

  // Get unique categories from recommended careers
  const availableCategories = [...new Set(recommendedCareers.map(c => c.category))];

  const subtitle = ageGroup === 'young-adult'
    ? 'Compare paths and plan your next step'
    : 'Explore careers and find what excites you';
  const completedCount = state.user.completedTrials.length;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>Hey {name} 👋</Text>
            <Text style={styles.subGreeting}>{subtitle}</Text>
          </View>
          {!isAuthenticated ? (
            <TouchableOpacity style={styles.signInBtn} onPress={() => navigation.navigate('Login')}>
              <Ionicons name="log-in-outline" size={18} color="#fff" />
              <Text style={styles.signInBtnText}>Login / Register</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.avatarButton} onPress={() => navigation.navigate('Settings')}>
              <LinearGradient colors={colors.gradientPrimary} style={styles.avatar}>
                <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard icon="trophy" color={colors.accentYellow} value={completedCount} label="Trials done" colors={colors} />
          <StatCard icon="star" color={colors.accentGreen} value={state.scores.length} label="Scores earned" colors={colors} />
          <StatCard icon="git-compare" color={colors.accent} value={state.comparisons.length} label="Comparisons" colors={colors} />
        </View>

        {/* Continue trial banner */}
        {state.trials.active && (
          <TouchableOpacity
            onPress={() => navigation.navigate(
              state.trials.active.trialType || 'DayTrial',
              { careerId: state.trials.active.careerId }
            )}
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
            onPress={() => navigation.navigate('Explore')} colors={colors} />
          <QuickAction icon="calendar" label={isGuest ? 'Day Trial · Locked' : 'Day Trial'} gradient={['#6C63FF', '#00D9FF']}
            onPress={() => navigation.navigate(isGuest ? 'Login' : 'Explore')} colors={colors} locked={isGuest} />
          <QuickAction icon="rocket" label={isGuest ? 'Week Sim · Locked' : 'Week Sim'} gradient={['#00E5A0', '#00D9FF']}
            onPress={() => navigation.navigate(isGuest ? 'Login' : 'Explore')} colors={colors} locked={isGuest} />
          <QuickAction icon="git-compare" label="Compare" gradient={['#FF6B9D', '#8B83FF']}
            onPress={() => navigation.navigate('Compare')} colors={colors} />
        </ScrollView>

        {/* Recommended careers - filtered by interests */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>
              {interests.length >= 2 ? 'Recommended for You' : 'Featured Careers'}
            </Text>
            {interests.length >= 2 && (
              <Text style={styles.matchHint}>
                Based on your {interests.length} interest{interests.length > 1 ? 's' : ''} · {displayCareers.length} career{displayCareers.length !== 1 ? 's' : ''}
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Category filter chips */}
        {availableCategories.length > 1 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            <FilterChip label="All" active={selectedFilter === 'All'} onPress={() => setSelectedFilter('All')} count={recommendedCareers.length} colors={colors} />
            {availableCategories.map(cat => (
              <FilterChip
                key={cat}
                label={cat}
                active={selectedFilter === cat}
                onPress={() => setSelectedFilter(cat)}
                count={recommendedCareers.filter(c => c.category === cat).length}
                colors={colors}
              />
            ))}
          </ScrollView>
        )}

        {/* Career cards */}
        {displayCareers.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>No careers match this filter</Text>
            <TouchableOpacity onPress={() => setSelectedFilter('All')}>
              <Text style={styles.emptyLink}>Clear filter</Text>
            </TouchableOpacity>
          </View>
        ) : (
          displayCareers.map(career => {
            const image = getCareerImage(career.id);
            const grad = careerColors[career.id]?.gradient || colors.gradientPrimary;
            return (
              <TouchableOpacity
                key={career.id}
                onPress={() => navigation.navigate('CareerDetail', { careerId: career.id })}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={grad}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.careerCard}
                >
                  <View style={styles.careerCardContent}>
                    {image ? (
                      <Image source={image} style={styles.careerThumb} />
                    ) : (
                      <Text style={styles.careerEmoji}>{career.emoji}</Text>
                    )}
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
                        <View style={styles.metaChip}>
                          <Ionicons name="briefcase" size={12} color="#fff" />
                          <Text style={styles.metaText}>{career.workStyle}</Text>
                        </View>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#fff" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

function StatCard({ icon, color, value, label, colors }) {
  const styles = useMemo(() => makeStyles(colors), [colors]);
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

function QuickAction({ icon, label, gradient, onPress, colors, locked = false }) {
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={{ opacity: locked ? 0.58 : 1 }}>
      <LinearGradient colors={gradient} style={styles.quickAction}>
        <Ionicons name={locked ? 'lock-closed' : icon} size={26} color="#fff" />
        <Text style={styles.quickActionLabel}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function FilterChip({ label, active, onPress, count, colors }) {
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.filterChip, active && styles.filterChipActive]}>
        <Text style={[styles.filterChipText, active && { color: '#fff' }]}>{label}</Text>
        <Text style={[styles.filterChipCount, active && { color: 'rgba(255,255,255,0.7)' }]}>{count}</Text>
      </View>
    </TouchableOpacity>
  );
}

const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingTop: Platform.OS === 'web' ? 24 : 60, paddingHorizontal: spacing.xxl, paddingBottom: 30 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xxl },
  greeting: { fontSize: typography.h1, fontWeight: typography.bold, color: colors.textPrimary },
  subGreeting: { fontSize: typography.body, color: colors.textSecondary, marginTop: 4 },
  avatarButton: { width: 50, height: 50 },
  avatar: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold },
  signInBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.round },
  signInBtnText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.bodySmall },
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xxl },
  statCard: { flex: 1, backgroundColor: colors.card, padding: spacing.lg, borderRadius: borderRadius.lg, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  statIconWrap: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  statValue: { color: colors.textPrimary, fontSize: typography.h2, fontWeight: typography.bold },
  statLabel: { color: colors.textSecondary, fontSize: typography.caption, marginTop: 2 },
  continueBanner: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderRadius: borderRadius.lg, marginBottom: spacing.xl, ...shadows.medium },
  continueLabel: { color: 'rgba(255,255,255,0.85)', fontSize: typography.caption, fontWeight: typography.bold, letterSpacing: 1 },
  continueTitle: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold, marginTop: 2 },
  sectionTitle: { fontSize: typography.h2, fontWeight: typography.bold, color: colors.textPrimary, marginBottom: spacing.sm, marginTop: spacing.md },
  matchHint: { color: colors.textMuted, fontSize: typography.caption, marginBottom: spacing.sm },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: spacing.md },
  seeAll: { color: colors.primary, fontWeight: typography.semibold, fontSize: typography.bodySmall, marginTop: spacing.sm },
  filterRow: { gap: spacing.sm, paddingBottom: spacing.md },
  filterChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.round, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, gap: spacing.xs },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterChipText: { color: colors.textSecondary, fontWeight: typography.semibold, fontSize: typography.bodySmall },
  filterChipCount: { color: colors.textMuted, fontSize: typography.tiny, fontWeight: typography.semibold },
  quickActions: { gap: spacing.md, paddingRight: spacing.lg },
  quickAction: { width: 120, height: 100, borderRadius: borderRadius.lg, padding: spacing.md, justifyContent: 'space-between', ...shadows.medium },
  quickActionLabel: { color: '#fff', fontWeight: typography.bold, fontSize: typography.bodySmall },
  careerCard: { borderRadius: borderRadius.lg, marginBottom: spacing.md, ...shadows.medium },
  careerCardContent: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, gap: spacing.md },
  careerThumb: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  careerEmoji: { fontSize: 44 },
  careerTitle: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold },
  careerDesc: { color: 'rgba(255,255,255,0.85)', fontSize: typography.bodySmall, marginTop: 2 },
  careerMetaRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' },
  metaChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: 10 },
  metaText: { color: '#fff', fontSize: typography.tiny, fontWeight: typography.semibold, textTransform: 'capitalize' },
  emptyState: { alignItems: 'center', paddingVertical: spacing.xxxl, gap: spacing.md },
  emptyText: { color: colors.textMuted, fontSize: typography.body },
  emptyLink: { color: colors.primary, fontWeight: typography.semibold, fontSize: typography.bodySmall },
});
