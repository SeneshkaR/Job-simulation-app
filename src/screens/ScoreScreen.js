import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { careerColors } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { useApp } from '../context/AppContext';
import { getCareerById } from '../data/careers';
import { scorePerformance } from '../services/aiService';

const DIMENSIONS = [
  { key: 'skills', label: 'Technical Skills', icon: 'construct' },
  { key: 'decisionMaking', label: 'Decision Making', icon: 'flash' },
  { key: 'communication', label: 'Communication', icon: 'chatbubbles' },
  { key: 'problemSolving', label: 'Problem Solving', icon: 'bulb' },
  { key: 'careerFit', label: 'Career Fit', icon: 'ribbon' },
];

export default function ScoreScreen({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { careerId, trialType, actions = [] } = route.params;
  const career = getCareerById(careerId);
  const { state, completeTrial, addScore } = useApp();
  const [scoring, setScoring] = useState(true);
  const [score, setScore] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await scorePerformance(
        state.settings.openaiKey,
        career?.title || 'career',
        actions,
        trialType
      );
      setScore(result);
      setScoring(false);
      addScore({
        careerId, trialType, ...result,
        timestamp: new Date().toISOString(),
      });
      completeTrial({ finalScore: result });
    })();
  }, []);

  if (!career) return null;
  const grad = careerColors[career.id]?.gradient || colors.gradientPrimary;

  if (scoring) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingWrap}>
          <LinearGradient colors={grad} style={styles.loadingSpinner}>
            <ActivityIndicator size="large" color="#fff" />
          </LinearGradient>
          <Text style={styles.loadingTitle}>Analyzing your performance…</Text>
          <Text style={styles.loadingSub}>Our AI mentor is reviewing every decision you made</Text>
        </View>
      </View>
    );
  }

  const overall = Math.round(
    DIMENSIONS.reduce((s, d) => s + (score[d.key] || 0), 0) / DIMENSIONS.length
  );

  const overallColor = overall >= 80 ? colors.scoreHigh : overall >= 60 ? colors.scoreMedium : colors.scoreLow;
  const overallLabel = overall >= 85 ? 'Outstanding!' : overall >= 70 ? 'Great work!' : overall >= 55 ? 'Solid effort' : 'Room to grow';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <LinearGradient colors={grad} style={styles.hero}>
          <SafeAreaView>
            <View style={styles.heroTopRow}>
              <TouchableOpacity onPress={() => navigation.popToTop()} style={styles.iconBtn}>
                <Ionicons name="close" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="share-social" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.heroLabel}>{trialType.toUpperCase()} • {career.title.toUpperCase()}</Text>
            <View style={styles.circle}>
              <Text style={styles.circleScore}>{overall}</Text>
              <Text style={styles.circleOver}>/ 100</Text>
            </View>
            <Text style={styles.heroTitle}>{overallLabel}</Text>
          </SafeAreaView>
        </LinearGradient>

        <View style={styles.body}>
          <Text style={styles.sectionTitle}>Your Scorecard</Text>
          {DIMENSIONS.map(d => (
            <ScoreBar key={d.key} icon={d.icon} label={d.label} value={score[d.key] || 0} color={grad[0]} />
          ))}

          <View style={[styles.feedbackCard, { borderLeftColor: overallColor }]}>
            <Text style={styles.feedbackLabel}>💬 AI COACH FEEDBACK</Text>
            <Text style={styles.feedbackText}>{score.feedback}</Text>
          </View>

          {score.strengths?.length > 0 && (
            <View style={styles.listCard}>
              <View style={styles.listHeader}>
                <View style={[styles.badgeIcon, { backgroundColor: `${colors.scoreHigh}22` }]}>
                  <Ionicons name="trending-up" size={18} color={colors.scoreHigh} />
                </View>
                <Text style={styles.listTitle}>Your Strengths</Text>
              </View>
              {score.strengths.map((s, i) => (
                <View key={i} style={styles.listRow}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.scoreHigh} />
                  <Text style={styles.listText}>{s}</Text>
                </View>
              ))}
            </View>
          )}

          {score.growthAreas?.length > 0 && (
            <View style={styles.listCard}>
              <View style={styles.listHeader}>
                <View style={[styles.badgeIcon, { backgroundColor: `${colors.accentYellow}22` }]}>
                  <Ionicons name="school" size={18} color={colors.accentYellow} />
                </View>
                <Text style={styles.listTitle}>Areas to Grow</Text>
              </View>
              {score.growthAreas.map((s, i) => (
                <View key={i} style={styles.listRow}>
                  <Ionicons name="arrow-forward-circle" size={16} color={colors.accentYellow} />
                  <Text style={styles.listText}>{s}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={{ gap: spacing.sm, marginTop: spacing.xl }}>
            <TouchableOpacity onPress={() => navigation.replace('TrialSelection', { careerId })} activeOpacity={0.9}>
              <LinearGradient colors={grad} style={styles.primaryBtn}>
                <Ionicons name="refresh" size={20} color="#fff" />
                <Text style={styles.primaryBtnText}>Try Another Trial</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Compare' })} style={styles.secondaryBtn}>
              <Ionicons name="git-compare" size={20} color={colors.textPrimary} />
              <Text style={styles.secondaryBtnText}>Compare Careers</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.popToTop()} style={styles.tertiaryBtn}>
              <Text style={styles.tertiaryBtnText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function ScoreBar({ icon, label, value, color }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const barColor = value >= 80 ? colors.scoreHigh : value >= 60 ? colors.scoreMedium : colors.scoreLow;
  return (
    <View style={styles.scoreBarWrap}>
      <View style={styles.scoreBarHeader}>
        <View style={styles.scoreBarLeft}>
          <View style={[styles.scoreIconBox, { backgroundColor: `${color}22` }]}>
            <Ionicons name={icon} size={16} color={color} />
          </View>
          <Text style={styles.scoreBarLabel}>{label}</Text>
        </View>
        <Text style={[styles.scoreBarValue, { color: barColor }]}>{value}</Text>
      </View>
      <View style={styles.scoreBarTrack}>
        <View style={[styles.scoreBarFill, { width: `${value}%`, backgroundColor: barColor }]} />
      </View>
    </View>
  );
}

const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xxl },
  loadingSpinner: { width: 90, height: 90, borderRadius: 45, alignItems: 'center', justifyContent: 'center', ...shadows.large },
  loadingTitle: { color: colors.textPrimary, fontSize: typography.h3, fontWeight: typography.bold, marginTop: spacing.xl },
  loadingSub: { color: colors.textSecondary, fontSize: typography.bodySmall, textAlign: 'center', marginTop: spacing.sm, lineHeight: 20 },
  hero: { paddingHorizontal: spacing.xxl, paddingBottom: spacing.xxxl, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  heroTopRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' },
  heroLabel: { color: 'rgba(255,255,255,0.85)', fontSize: typography.caption, fontWeight: typography.bold, letterSpacing: 1.5, textAlign: 'center', marginTop: spacing.md },
  circle: { alignSelf: 'center', width: Platform.OS === 'web' ? 140 : 180, height: Platform.OS === 'web' ? 140 : 180, borderRadius: Platform.OS === 'web' ? 70 : 90, backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 4, borderColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', marginTop: spacing.lg },
  circleScore: { color: '#fff', fontSize: Platform.OS === 'web' ? 52 : 68, fontWeight: typography.heavy },
  circleOver: { color: 'rgba(255,255,255,0.85)', fontSize: typography.body },
  heroTitle: { color: '#fff', fontSize: typography.h1, fontWeight: typography.bold, textAlign: 'center', marginTop: spacing.md },
  body: { padding: spacing.xxl },
  sectionTitle: { color: colors.textPrimary, fontSize: typography.h3, fontWeight: typography.bold, marginBottom: spacing.md },
  scoreBarWrap: { backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm },
  scoreBarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scoreBarLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  scoreIconBox: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  scoreBarLabel: { color: colors.textPrimary, fontSize: typography.bodySmall, fontWeight: typography.semibold },
  scoreBarValue: { fontSize: typography.h3, fontWeight: typography.bold },
  scoreBarTrack: { height: 8, backgroundColor: colors.surfaceLight, borderRadius: 4, marginTop: spacing.sm, overflow: 'hidden' },
  scoreBarFill: { height: '100%', borderRadius: 4 },
  feedbackCard: { backgroundColor: colors.card, padding: spacing.lg, borderRadius: borderRadius.md, borderLeftWidth: 4, marginTop: spacing.xl },
  feedbackLabel: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.bold, letterSpacing: 1 },
  feedbackText: { color: colors.textPrimary, fontSize: typography.body, lineHeight: 22, marginTop: spacing.sm },
  listCard: { backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginTop: spacing.md },
  listHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  badgeIcon: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  listTitle: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.bold },
  listRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: 4 },
  listText: { color: colors.textSecondary, fontSize: typography.bodySmall, flex: 1, lineHeight: 20 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.md, borderRadius: borderRadius.md, ...shadows.medium },
  primaryBtnText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.body },
  secondaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.md, borderRadius: borderRadius.md, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  secondaryBtnText: { color: colors.textPrimary, fontWeight: typography.semibold, fontSize: typography.body },
  tertiaryBtn: { padding: spacing.md, alignItems: 'center' },
  tertiaryBtnText: { color: colors.textSecondary, fontSize: typography.bodySmall, fontWeight: typography.semibold },
});
