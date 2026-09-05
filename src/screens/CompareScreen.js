import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { careerColors } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { useApp } from '../context/AppContext';
import { careers, getCareerById } from '../data/careers';
import { getCareerImage } from '../data/careerImages';

// ── Mapping & constants ──────────────────────────────────────────────
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

const DEMAND_SCORES = { high: 100, medium: 70, low: 40 };

// ── Component ────────────────────────────────────────────────────────
export default function CompareScreen({ navigation }) {
  const { state, addToComparison, clearComparisons } = useApp();
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [selectedIds, setSelectedIds] = useState([]);
  const [phase, setPhase] = useState('picker'); // 'picker' | 'results'
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...new Set(careers.map(c => c.category))],
    [],
  );

  const filteredCareers = useMemo(() => {
    let list = careers;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q),
      );
    }
    if (activeCategory !== 'All') {
      list = list.filter(c => c.category === activeCategory);
    }
    return list;
  }, [search, activeCategory]);

  // ── Selection helpers ──────────────────────────────────────────────
  const toggle = id => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  };

  const handleCompare = () => {
    clearComparisons();
    selectedIds.forEach(id => {
      const c = getCareerById(id);
      if (c) addToComparison({ careerId: c.id, title: c.title, emoji: c.emoji });
    });
    setPhase('results');
  };

  const handleStartOver = () => {
    setSelectedIds([]);
    setPhase('picker');
  };

  // ── Results computations ───────────────────────────────────────────
  const selectedCareers = selectedIds.map(getCareerById).filter(Boolean);
  const ranked = phase === 'results' ? rankCareers(selectedCareers, state) : [];
  const winner = ranked[0];
  const canCompare = selectedIds.length >= 2;

  // ═══════════════════════════════════════════════════════════════════
  //  SELECTION PHASE
  // ═══════════════════════════════════════════════════════════════════
  if (phase === 'picker') {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.pickerHeader}>
            <Text style={styles.pickerTitle}>Compare Careers</Text>
            <Text style={styles.pickerSub}>
              Select 2 or more careers to find your best fit
            </Text>
          </View>
        </SafeAreaView>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search careers..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Category chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.85}
              style={[
                styles.categoryChip,
                activeCategory === cat && styles.categoryChipActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  activeCategory === cat && styles.categoryChipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Career grid */}
        <ScrollView
          contentContainerStyle={styles.gridWrap}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {filteredCareers.map(c => {
              const isSelected = selectedIds.includes(c.id);
              const grad = careerColors[c.id]?.gradient || colors.gradientPrimary;
              const image = getCareerImage(c.id);
              return (
                <TouchableOpacity
                  key={c.id}
                  onPress={() => toggle(c.id)}
                  activeOpacity={0.85}
                  style={[styles.gridCard, isSelected && styles.gridCardSelected]}
                >
                  {isSelected && (
                    <View style={styles.checkBadge}>
                      <Ionicons name="checkmark" size={14} color="#fff" />
                    </View>
                  )}
                  {image ? (
                    <Image source={image} style={styles.gridCardImage} />
                  ) : (
                    <LinearGradient colors={grad} style={styles.gridCardTop}>
                      <Text style={styles.gridEmoji}>{c.emoji}</Text>
                    </LinearGradient>
                  )}
                  <View style={styles.gridCardBody}>
                    <Text style={styles.gridCardTitle} numberOfLines={2}>
                      {c.title}
                    </Text>
                    <Text style={styles.gridCardCat}>{c.category}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Bottom action bar */}
        <View style={styles.bottomBar}>
          <View style={styles.bottomInfo}>
            <Text style={styles.bottomCount}>
              {selectedIds.length} selected
            </Text>
            {selectedIds.length > 0 && selectedIds.length < 2 && (
              <Text style={styles.bottomHint}>Pick at least 2 to compare</Text>
            )}
          </View>
          <TouchableOpacity
            onPress={handleCompare}
            disabled={!canCompare}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={canCompare ? colors.gradientPrimary : [colors.border, colors.border]}
              style={styles.compareBtn}
            >
              <Text style={styles.compareBtnText}>Compare Now</Text>
              <Ionicons
                name="arrow-forward"
                size={18}
                color={canCompare ? '#fff' : colors.textMuted}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  //  RESULTS PHASE
  // ═══════════════════════════════════════════════════════════════════
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.resultsHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.resultsTitle}>Your Results</Text>
            <Text style={styles.resultsSub}>
              {selectedCareers.length} career{selectedCareers.length !== 1 ? 's' : ''} compared
            </Text>
          </View>
          <TouchableOpacity onPress={handleStartOver} style={styles.startOverBtn}>
            <Ionicons name="refresh" size={18} color={colors.primary} />
            <Text style={styles.startOverText}>Redo</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.massive }}>
        {/* ── Side-by-side cards ──────────────────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardScroll}
        >
          {selectedCareers.map(c => {
            const grad = careerColors[c.id]?.gradient || colors.gradientPrimary;
            const image = getCareerImage(c.id);
            const bestScore = state.scores
              .filter(s => s.careerId === c.id)
              .sort((a, b) => averageScore(b) - averageScore(a))[0];
            const trialsDone = state.scores.filter(s => s.careerId === c.id).length;

            return (
              <View key={c.id} style={styles.card}>
                <View style={styles.cardHead}>
                  {image ? (
                    <View style={StyleSheet.absoluteFillObject}>
                      <Image source={image} style={styles.cardImage} />
                      <LinearGradient colors={['rgba(0,0,0,0.25)', 'rgba(0,0,0,0.65)']} style={styles.cardImageOverlay} />
                    </View>
                  ) : (
                    <LinearGradient colors={grad} style={StyleSheet.absoluteFillObject} />
                  )}
                  <Text style={styles.cardEmoji}>{image ? '' : c.emoji}</Text>
                  <Text style={styles.cardTitle}>{c.title}</Text>
                  <Text style={styles.cardCategory}>{c.category}</Text>
                </View>
                <View style={styles.cardBody}>
                  <Row label="Salary" value={`$${Math.round(c.salaryRange.min / 1000)}k–$${Math.round(c.salaryRange.max / 1000)}k`} colors={colors} />
                  <Row label="Education" value={`${c.educationYears} years`} colors={colors} />
                  <Row label="Demand" value={c.demandLevel} highlight colors={colors} />
                  <Row label="Work Style" value={c.workStyle} colors={colors} />
                  <Row label="Environment" value={c.environment} colors={colors} />
                  <View style={styles.divider} />
                  <Row label="Trials done" value={String(trialsDone)} colors={colors} />
                  <Row
                    label="Best score"
                    value={bestScore ? String(averageScore(bestScore)) : '—'}
                    highlight={!!bestScore}
                    colors={colors}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('CareerDetail', { careerId: c.id })}
                    activeOpacity={0.9}
                    style={{ marginTop: spacing.md }}
                  >
                    <LinearGradient colors={grad} style={styles.viewBtn}>
                      <Text style={styles.viewBtnText}>View Details</Text>
                      <Ionicons name="arrow-forward" size={16} color="#fff" />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* ── Ranking ─────────────────────────────────────────────── */}
        {ranked.length >= 2 ? (
          <View style={styles.rankingSection}>
            {/* Winner */}
            <View style={styles.sectionHeader}>
              <Ionicons name="trophy" size={22} color={colors.accentYellow} />
              <Text style={styles.sectionTitle}>Best Fit for You</Text>
            </View>

            <LinearGradient
              colors={careerColors[winner.career.id]?.gradient || colors.gradientSuccess}
              style={styles.winnerCard}
            >
              <View style={styles.winnerBadge}>
                <Text style={styles.winnerBadgeText}>#1 BEST FIT</Text>
              </View>
              {getCareerImage(winner.career.id) ? (
                <Image source={getCareerImage(winner.career.id)} style={styles.winnerImage} />
              ) : (
                <Text style={styles.winnerEmoji}>{winner.career.emoji}</Text>
              )}
              <Text style={styles.winnerTitle}>{winner.career.title}</Text>
              <Text style={styles.winnerScore}>
                Fit score: {Math.round(winner.fitScore)} / 100
              </Text>
              <View style={styles.winnerBreakdown}>
                <BreakdownPill label="Trial" value={Math.round(winner.breakdown.trial)} colors={colors} />
                <BreakdownPill label="Interest" value={Math.round(winner.breakdown.interest)} colors={colors} />
                <BreakdownPill label="Demand" value={Math.round(winner.breakdown.demand)} colors={colors} />
                <BreakdownPill label="Salary" value={Math.round(winner.breakdown.salary)} colors={colors} />
                <BreakdownPill label="Education" value={Math.round(winner.breakdown.education)} colors={colors} />
              </View>
            </LinearGradient>

            {/* Winner explanation */}
            <View style={styles.explanationCard}>
              <Text style={styles.explanationTitle}>
                Why {winner.career.title} is the best fit
              </Text>
              <Text style={styles.explanationText}>
                {generateWinnerExplanation(winner, ranked.slice(1), state)}
              </Text>
            </View>

            {/* Runner-ups */}
            {ranked.length > 1 && (
              <>
                <View style={styles.sectionHeader}>
                  <Ionicons name="list" size={22} color={colors.textSecondary} />
                  <Text style={styles.sectionTitle}>Full Ranking</Text>
                </View>

                {ranked.map((entry, index) => {
                  const isWinner = index === 0;
                  const rankColor = isWinner ? colors.accentYellow : colors.primary;
                  const runnerImage = getCareerImage(entry.career.id);
                  return (
                    <View key={entry.career.id} style={styles.runnerCard}>
                      <View style={styles.runnerLeft}>
                        <View style={[styles.runnerRank, { backgroundColor: `${rankColor}22` }]}>
                          <Text style={[styles.runnerRankText, { color: rankColor }]}>
                            #{index + 1}
                          </Text>
                        </View>
                        {runnerImage ? (
                          <Image source={runnerImage} style={styles.runnerThumb} />
                        ) : (
                          <Text style={styles.runnerEmoji}>{entry.career.emoji}</Text>
                        )}
                        <View style={{ flex: 1 }}>
                          <Text style={styles.runnerTitle}>{entry.career.title}</Text>
                          <Text style={styles.runnerScore}>
                            Fit {Math.round(entry.fitScore)} · Best trial {entry.bestTrialScore}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}

                {/* Per-career explanations */}
                <View style={styles.explanationCard}>
                  <Text style={styles.explanationTitle}>How we ranked them</Text>
                  {ranked.map((entry, index) => (
                    <Text
                      key={entry.career.id}
                      style={[styles.explanationText, index > 0 && { marginTop: spacing.sm }]}
                    >
                      <Text style={{ fontWeight: typography.bold, color: colors.textPrimary }}>
                        #{index + 1} {entry.career.title}:{' '}
                      </Text>
                      {generateCareerExplanation(entry, winner, index, state)}
                    </Text>
                  ))}
                </View>

                <View style={styles.methodCard}>
                  <Ionicons name="information-circle" size={20} color={colors.accent} />
                  <Text style={styles.methodText}>
                    Each career gets a fit score out of 100 based on five factors:
                    trial performance (45%), interest match (25%),
                    job demand (15%), salary (10%), and education (5%).
                    Only careers you have tried are ranked; others are shown for reference.
                  </Text>
                </View>
              </>
            )}
          </View>
        ) : (
          <View style={styles.needTrialsCard}>
            <Ionicons name="information-circle" size={28} color={colors.accentYellow} />
            <Text style={styles.needTrialsTitle}>Complete trials to see rankings</Text>
            <Text style={styles.needTrialsText}>
              {ranked.length === 1
                ? 'You have tried one career so far. Try at least one more selected career to compare them.'
                : 'None of the selected careers have been tried yet. Start a quick trial for at least two careers to get a ranked best-fit recommendation.'}
            </Text>

            {/* Quick links to untried careers */}
            {selectedCareers.filter(c => !state.scores.some(s => s.careerId === c.id)).length > 0 && (
              <View style={styles.untriedList}>
                {selectedCareers
                  .filter(c => !state.scores.some(s => s.careerId === c.id))
                  .map(c => (
                    <TouchableOpacity
                      key={c.id}
                      onPress={() => navigation.navigate('TrialSelection', { careerId: c.id })}
                      activeOpacity={0.9}
                      style={styles.untriedChip}
                    >
                      {getCareerImage(c.id) ? (
                        <Image source={getCareerImage(c.id)} style={styles.untriedThumb} />
                      ) : (
                        <Text style={styles.untriedEmoji}>{c.emoji}</Text>
                      )}
                      <Text style={styles.untriedText}>{c.title}</Text>
                      <Ionicons name="play-circle" size={18} color={colors.primary} />
                    </TouchableOpacity>
                  ))}
              </View>
            )}
          </View>
        )}

        {/* Choose different button */}
        <TouchableOpacity onPress={handleStartOver} activeOpacity={0.9} style={styles.redoWrap}>
          <LinearGradient colors={colors.gradientDark} style={styles.redoBtn}>
            <Ionicons name="swap-horizontal" size={18} color={colors.primary} />
            <Text style={styles.redoBtnText}>Choose Different Careers</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ── Sub-components ───────────────────────────────────────────────────
function BreakdownPill({ label, value, colors }) {
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return (
    <View style={styles.pill}>
      <Text style={styles.pillLabel}>{label}</Text>
      <Text style={styles.pillValue}>{value}</Text>
    </View>
  );
}

function Row({ label, value, highlight, colors }) {
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text
        style={[styles.rowValue, highlight && { color: colors.accentGreen, fontWeight: typography.bold }]}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

// ── Scoring helpers ──────────────────────────────────────────────────
function averageScore(s) {
  const keys = ['skills', 'decisionMaking', 'communication', 'problemSolving', 'careerFit'];
  return Math.round(keys.reduce((sum, k) => sum + (s[k] || 0), 0) / keys.length);
}

function getSalaryScore(career) {
  const allMins = careers.map(c => c.salaryRange.min);
  const allMaxs = careers.map(c => c.salaryRange.max);
  const min = Math.min(...allMins);
  const max = Math.max(...allMaxs);
  if (max === min) return 50;
  const avg = (career.salaryRange.min + career.salaryRange.max) / 2;
  return Math.round(((avg - min) / (max - min)) * 100);
}

function getEducationScore(career) {
  const allYears = careers.map(c => c.educationYears);
  const min = Math.min(...allYears);
  const max = Math.max(...allYears);
  if (max === min) return 50;
  return Math.round(((max - career.educationYears) / (max - min)) * 100);
}

function interestMatchScore(career, interests) {
  if (!interests || interests.length === 0) return 50;
  const cats = interests.flatMap(i => interestCategoryMap[i] || []);
  return cats.includes(career.category) ? 100 : 20;
}

function computeFitScore(career, state) {
  const careerScores = state.scores.filter(s => s.careerId === career.id);
  const bestTrial = careerScores.length > 0 ? Math.max(...careerScores.map(averageScore)) : 0;
  const interest = interestMatchScore(career, state.user.interests);
  const demand = DEMAND_SCORES[career.demandLevel] || 50;
  const salary = getSalaryScore(career);
  const education = getEducationScore(career);

  const fitScore =
    bestTrial * 0.45 +
    interest * 0.25 +
    demand * 0.15 +
    salary * 0.10 +
    education * 0.05;

  return {
    career,
    fitScore,
    bestTrialScore: bestTrial,
    breakdown: {
      trial: bestTrial * 0.45,
      interest: interest * 0.25,
      demand: demand * 0.15,
      salary: salary * 0.10,
      education: education * 0.05,
    },
    raw: { trial: bestTrial, interest, demand, salary, education },
  };
}

function rankCareers(items, state) {
  return items
    .filter(c => state.scores.some(s => s.careerId === c.id))
    .map(c => computeFitScore(c, state))
    .sort((a, b) => b.fitScore - a.fitScore);
}

// ── Explanation generators ───────────────────────────────────────────
function generateWinnerExplanation(winner, runners, state) {
  const { career, raw, breakdown } = winner;
  const parts = [];

  const contributors = [
    { label: 'your trial performance', value: breakdown.trial },
    { label: 'your interest match', value: breakdown.interest },
    { label: 'job demand', value: breakdown.demand },
    { label: 'salary potential', value: breakdown.salary },
    { label: 'education required', value: breakdown.education },
  ].sort((a, b) => b.value - a.value);

  parts.push(`${career.title} scores highest overall, driven by ${contributors[0].label}.`);

  if (raw.trial >= 80) {
    parts.push(`You performed exceptionally well in the trial (${raw.trial}/100), which carries the largest weight at 45%.`);
  } else if (raw.trial >= 60) {
    parts.push(`Your trial score of ${raw.trial}/100 shows solid performance in the simulation.`);
  }

  if (raw.interest === 100) {
    parts.push('It also matches the interests you selected during onboarding.');
  }

  if (raw.demand === 100) {
    parts.push('Employer demand is strong, so opportunities should be plentiful.');
  }

  if (runners.length > 0) {
    const gap = winner.fitScore - runners[0].fitScore;
    if (gap >= 8) {
      parts.push(`It leads ${runners[0].career.title} by ${Math.round(gap)} points, mainly because ${gapReason(winner, runners[0])}.`);
    } else {
      parts.push(`It is only slightly ahead of ${runners[0].career.title}, so either path could work depending on your preference.`);
    }
  }

  return parts.join(' ');
}

function generateCareerExplanation(entry, winner, index, state) {
  const { career, raw, breakdown } = entry;
  const parts = [];

  if (raw.trial > 0) {
    parts.push(`Trial score of ${raw.trial}/100.`);
  } else {
    parts.push('No trial completed yet.');
  }

  const contributors = [
    { label: 'interest match', value: breakdown.interest },
    { label: 'job demand', value: breakdown.demand },
    { label: 'salary', value: breakdown.salary },
    { label: 'education', value: breakdown.education },
  ].sort((a, b) => b.value - a.value);

  parts.push(`Strongest factor: ${contributors[0].label}.`);

  if (index > 0) {
    const gap = winner.fitScore - entry.fitScore;
    parts.push(`${Math.round(gap)} points behind #1.`);
  }

  return parts.join(' ');
}

function gapReason(winner, runner) {
  const diff = {};
  for (const key of Object.keys(winner.raw)) {
    diff[key] = winner.breakdown[key] - runner.breakdown[key];
  }
  const sorted = Object.entries(diff).sort((a, b) => b[1] - a[1]);
  const [topKey] = sorted[0];
  const labels = {
    trial: 'your trial performance was stronger',
    interest: 'it matches your interests better',
    demand: 'it has stronger job demand',
    salary: 'the salary potential is higher',
    education: 'it needs less schooling to start',
  };
  return labels[topKey] || 'it scored higher across the board';
}

// ── Styles ───────────────────────────────────────────────────────────
const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  // ── Picker ──────────────────────────────────────────────────────
  pickerHeader: { paddingHorizontal: spacing.xxl, paddingTop: Platform.OS === 'web' ? 16 : spacing.lg, paddingBottom: spacing.sm },
  pickerTitle: { color: colors.textPrimary, fontSize: typography.hero, fontWeight: typography.heavy },
  pickerSub: { color: colors.textSecondary, fontSize: typography.body, marginTop: 4 },

  searchWrap: { flexDirection: 'row', alignItems: 'center', marginHorizontal: spacing.lg, marginTop: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.md, paddingHorizontal: spacing.md, height: 44, borderWidth: 1, borderColor: colors.border },
  searchInput: { flex: 1, color: colors.textPrimary, fontSize: typography.body },

  categoryRow: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.sm },
  categoryChip: { paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  categoryChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryChipText: { color: colors.textSecondary, fontSize: typography.caption, fontWeight: typography.semibold },
  categoryChipTextActive: { color: '#fff' },

  gridWrap: { paddingHorizontal: spacing.lg, paddingBottom: 120 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  gridCard: { width: '47%', backgroundColor: colors.card, borderRadius: borderRadius.md, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  gridCardSelected: { borderColor: colors.primary, borderWidth: 2 },
  gridCardTop: { height: 90, alignItems: 'center', justifyContent: 'center' },
  gridCardImage: { width: '100%', height: 90, resizeMode: 'cover' },
  gridEmoji: { fontSize: 36 },
  gridCardBody: { padding: spacing.sm, alignItems: 'center' },
  gridCardTitle: { color: colors.textPrimary, fontSize: typography.caption, fontWeight: typography.semibold, textAlign: 'center' },
  gridCardCat: { color: colors.textMuted, fontSize: typography.tiny, marginTop: 2 },
  checkBadge: { position: 'absolute', top: 6, right: 6, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', zIndex: 2 },

  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surface, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  bottomInfo: { flex: 1 },
  bottomCount: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.bold },
  bottomHint: { color: colors.textMuted, fontSize: typography.caption, marginTop: 2 },
  compareBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: borderRadius.md },
  compareBtnText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.body },

  // ── Results ─────────────────────────────────────────────────────
  resultsHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.xxl, paddingTop: Platform.OS === 'web' ? 16 : spacing.lg, paddingBottom: spacing.sm },
  resultsTitle: { color: colors.textPrimary, fontSize: typography.hero, fontWeight: typography.heavy },
  resultsSub: { color: colors.textSecondary, fontSize: typography.body, marginTop: 4 },
  startOverBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: spacing.sm, paddingVertical: 4 },
  startOverText: { color: colors.primary, fontSize: typography.bodySmall, fontWeight: typography.semibold },

  cardScroll: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.md },
  card: { width: 260, backgroundColor: colors.card, borderRadius: borderRadius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  cardHead: { position: 'relative', height: 150, alignItems: 'center', justifyContent: 'center', padding: spacing.lg, overflow: 'hidden' },
  cardImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%', resizeMode: 'cover' },
  cardImageOverlay: { ...StyleSheet.absoluteFillObject },
  cardEmoji: { fontSize: 48 },
  cardTitle: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold, marginTop: spacing.sm, textAlign: 'center', zIndex: 2 },
  cardCategory: { color: 'rgba(255,255,255,0.85)', fontSize: typography.caption, marginTop: 2, zIndex: 2 },
  cardBody: { padding: spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  rowLabel: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.semibold },
  rowValue: { color: colors.textPrimary, fontSize: typography.caption, fontWeight: typography.semibold, textTransform: 'capitalize', maxWidth: '55%', textAlign: 'right' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  viewBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
  viewBtnText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.bodySmall },

  rankingSection: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md, marginTop: spacing.lg },
  sectionTitle: { color: colors.textPrimary, fontSize: typography.h3, fontWeight: typography.bold },

  winnerCard: { borderRadius: borderRadius.lg, padding: spacing.lg, alignItems: 'center' },
  winnerBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: spacing.md, paddingVertical: 4, borderRadius: 12, marginBottom: spacing.sm },
  winnerBadgeText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.caption, letterSpacing: 1 },
  winnerEmoji: { fontSize: 56 },
  winnerImage: { width: 84, height: 84, borderRadius: 42, borderWidth: 3, borderColor: 'rgba(255,255,255,0.85)', marginTop: spacing.sm },
  winnerTitle: { color: '#fff', fontSize: typography.h2, fontWeight: typography.bold, marginTop: spacing.sm, textAlign: 'center' },
  winnerScore: { color: 'rgba(255,255,255,0.9)', fontSize: typography.body, fontWeight: typography.semibold, marginTop: 4 },
  winnerBreakdown: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.sm, marginTop: spacing.md },
  pill: { backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: borderRadius.md, paddingHorizontal: spacing.sm, paddingVertical: 6, alignItems: 'center', minWidth: 56 },
  pillLabel: { color: 'rgba(255,255,255,0.8)', fontSize: typography.tiny, fontWeight: typography.semibold },
  pillValue: { color: '#fff', fontSize: typography.bodySmall, fontWeight: typography.bold, marginTop: 2 },

  explanationCard: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.lg, marginTop: spacing.md, borderWidth: 1, borderColor: colors.border },
  explanationTitle: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.bold },
  explanationText: { color: colors.textSecondary, fontSize: typography.bodySmall, marginTop: spacing.sm, lineHeight: 20 },

  runnerCard: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  runnerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  runnerRank: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  runnerRankText: { color: colors.primary, fontWeight: typography.bold, fontSize: typography.bodySmall },
  runnerEmoji: { fontSize: 28 },
  runnerThumb: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: colors.border },
  runnerTitle: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.bold },
  runnerScore: { color: colors.textSecondary, fontSize: typography.caption, marginTop: 2 },

  methodCard: { flexDirection: 'row', gap: spacing.sm, backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.lg, marginTop: spacing.lg, borderWidth: 1, borderColor: colors.border },
  methodText: { flex: 1, color: colors.textSecondary, fontSize: typography.caption, lineHeight: 18 },

  needTrialsCard: { margin: spacing.lg, backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  needTrialsTitle: { color: colors.textPrimary, fontSize: typography.h3, fontWeight: typography.bold, marginTop: spacing.sm, textAlign: 'center' },
  needTrialsText: { color: colors.textSecondary, fontSize: typography.bodySmall, textAlign: 'center', marginTop: spacing.sm, lineHeight: 20 },
  untriedList: { width: '100%', marginTop: spacing.md, gap: spacing.sm },
  untriedChip: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surfaceLight, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
  untriedEmoji: { fontSize: 22 },
  untriedThumb: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: colors.border },
  untriedText: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.semibold, flex: 1 },

  redoWrap: { paddingHorizontal: spacing.lg, marginTop: spacing.xl, marginBottom: spacing.lg },
  redoBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  redoBtnText: { color: colors.primary, fontWeight: typography.bold, fontSize: typography.body },
});
