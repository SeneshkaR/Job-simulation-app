import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, careerColors } from '../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { useApp } from '../context/AppContext';
import { careers, getCareerById } from '../data/careers';

export default function CompareScreen({ navigation }) {
  const { state, removeFromComparison, addToComparison } = useApp();
  const items = state.comparisons.map(c => getCareerById(c.careerId)).filter(Boolean);

  if (items.length === 0) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.emptyWrap} showsVerticalScrollIndicator={false}>
        <View style={styles.emptyIconWrap}>
          <Ionicons name="git-compare" size={44} color={colors.primary} />
        </View>
        <Text style={styles.emptyTitle}>Compare Careers Side by Side</Text>
        <Text style={styles.emptyDesc}>
          Bookmark careers you're curious about to compare salary, education, demand, and your scores.
        </Text>

        <Text style={styles.suggestLabel}>QUICK ADD</Text>
        <View style={styles.suggestGrid}>
          {careers.map(c => (
            <TouchableOpacity
              key={c.id}
              onPress={() => addToComparison({ careerId: c.id, title: c.title, emoji: c.emoji })}
              activeOpacity={0.85}
              style={styles.suggestChip}
            >
              <Text style={{ fontSize: 22 }}>{c.emoji}</Text>
              <Text style={styles.suggestText} numberOfLines={1}>{c.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Compare</Text>
          <Text style={styles.headerSub}>{items.length} career{items.length !== 1 ? 's' : ''} selected</Text>
        </View>
      </SafeAreaView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardScroll}>
        {items.map(c => {
          const grad = careerColors[c.id]?.gradient || colors.gradientPrimary;
          const bestScore = state.scores.filter(s => s.careerId === c.id).sort((a, b) => {
            const avgA = averageScore(a);
            const avgB = averageScore(b);
            return avgB - avgA;
          })[0];
          const trialsDone = state.scores.filter(s => s.careerId === c.id).length;

          return (
            <View key={c.id} style={styles.card}>
              <LinearGradient colors={grad} style={styles.cardHead}>
                <TouchableOpacity
                  onPress={() => removeFromComparison(c.id)}
                  style={styles.removeBtn}
                >
                  <Ionicons name="close" size={16} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.cardEmoji}>{c.emoji}</Text>
                <Text style={styles.cardTitle}>{c.title}</Text>
                <Text style={styles.cardCategory}>{c.category}</Text>
              </LinearGradient>

              <View style={styles.cardBody}>
                <Row label="Salary" value={`$${Math.round(c.salaryRange.min/1000)}k-$${Math.round(c.salaryRange.max/1000)}k`} />
                <Row label="Education" value={`${c.educationYears} years`} />
                <Row label="Demand" value={c.demandLevel} highlight />
                <Row label="Work Style" value={c.workStyle} />
                <Row label="Environment" value={c.environment} />

                <View style={styles.divider} />

                <Row label="Trials done" value={String(trialsDone)} />
                <Row
                  label="Best score"
                  value={bestScore ? String(averageScore(bestScore)) : '—'}
                  highlight={!!bestScore}
                />

                <TouchableOpacity
                  onPress={() => navigation.navigate('CareerDetail', { careerId: c.id })}
                  activeOpacity={0.9}
                  style={{ marginTop: spacing.md }}
                >
                  <LinearGradient colors={grad} style={styles.viewBtn}>
                    <Text style={styles.viewBtnText}>View</Text>
                    <Ionicons name="arrow-forward" size={16} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.legendCard}>
        <Text style={styles.legendTitle}>🎯 Which career fits YOU?</Text>
        <Text style={styles.legendText}>
          Higher demand = easier to find jobs. Lower education = faster start. Higher scores = you handled the trials well.
        </Text>
      </View>
    </View>
  );
}

function averageScore(s) {
  const keys = ['skills', 'decisionMaking', 'communication', 'problemSolving', 'careerFit'];
  const total = keys.reduce((sum, k) => sum + (s[k] || 0), 0);
  return Math.round(total / keys.length);
}

function Row({ label, value, highlight }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, highlight && { color: colors.accentGreen, fontWeight: typography.bold }]} numberOfLines={1}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.xxl, paddingTop: Platform.OS === 'web' ? 16 : spacing.lg, paddingBottom: spacing.sm },
  headerTitle: { color: colors.textPrimary, fontSize: typography.hero, fontWeight: typography.heavy },
  headerSub: { color: colors.textSecondary, fontSize: typography.body, marginTop: 2 },
  cardScroll: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.md },
  card: { width: 260, backgroundColor: colors.card, borderRadius: borderRadius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border, ...shadows.medium },
  cardHead: { padding: spacing.lg, alignItems: 'center', position: 'relative' },
  removeBtn: { position: 'absolute', top: 8, right: 8, width: 26, height: 26, borderRadius: 13, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  cardEmoji: { fontSize: 48 },
  cardTitle: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold, marginTop: spacing.sm, textAlign: 'center' },
  cardCategory: { color: 'rgba(255,255,255,0.85)', fontSize: typography.caption, marginTop: 2 },
  cardBody: { padding: spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  rowLabel: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.semibold },
  rowValue: { color: colors.textPrimary, fontSize: typography.caption, fontWeight: typography.semibold, textTransform: 'capitalize', maxWidth: '55%', textAlign: 'right' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  viewBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
  viewBtnText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.bodySmall },
  legendCard: { margin: spacing.lg, padding: spacing.lg, backgroundColor: colors.card, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  legendTitle: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.bold },
  legendText: { color: colors.textSecondary, fontSize: typography.bodySmall, marginTop: spacing.sm, lineHeight: 20 },
  emptyWrap: { flex: 1, alignItems: 'center', paddingHorizontal: spacing.xxl, paddingTop: Platform.OS === 'web' ? 24 : spacing.huge },
  emptyIconWrap: { width: 80, height: 80, borderRadius: 40, backgroundColor: `${colors.primary}22`, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { color: colors.textPrimary, fontSize: typography.h2, fontWeight: typography.bold, marginTop: spacing.lg, textAlign: 'center' },
  emptyDesc: { color: colors.textSecondary, fontSize: typography.body, textAlign: 'center', marginTop: spacing.sm, lineHeight: 22 },
  suggestLabel: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.bold, letterSpacing: 1.5, marginTop: spacing.xxl, alignSelf: 'flex-start' },
  suggestGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md, width: '100%' },
  suggestChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.card, paddingHorizontal: spacing.sm, paddingVertical: 8, borderRadius: 16, borderWidth: 1, borderColor: colors.border },
  suggestText: { color: colors.textPrimary, fontSize: typography.caption, fontWeight: typography.semibold, maxWidth: 100 },
});
