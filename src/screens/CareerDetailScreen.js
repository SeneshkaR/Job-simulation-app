import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, careerColors } from '../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { useApp } from '../context/AppContext';
import { getCareerById } from '../data/careers';

export default function CareerDetailScreen({ route, navigation }) {
  const { careerId } = route.params;
  const career = getCareerById(careerId);
  const { addToComparison, state } = useApp();
  const inComparison = state.comparisons.find(c => c.careerId === careerId);

  if (!career) return null;
  const grad = careerColors[career.id]?.gradient || colors.gradientPrimary;

  return (
    <View style={styles.container}>
      <LinearGradient colors={grad} style={styles.hero}>
        <SafeAreaView>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => addToComparison({ careerId: career.id, title: career.title, emoji: career.emoji })}
              style={styles.iconBtn}
            >
              <Ionicons name={inComparison ? 'bookmark' : 'bookmark-outline'} size={22} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.emoji}>{career.emoji}</Text>
          <Text style={styles.title}>{career.title}</Text>
          <Text style={styles.category}>{career.category}</Text>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.statsRow}>
          <Stat icon="cash-outline" label="Salary" value={`$${Math.round(career.salaryRange.min/1000)}k-${Math.round(career.salaryRange.max/1000)}k`} />
          <Stat icon="school-outline" label="Education" value={`${career.educationYears} yrs`} />
          <Stat icon="trending-up-outline" label="Demand" value={career.demandLevel} />
        </View>

        <Section title="About this Career">
          <Text style={styles.paragraph}>{career.description}</Text>
        </Section>

        <Section title="Work Style">
          <View style={styles.chipRow}>
            <View style={styles.chip}><Text style={styles.chipText}>{career.workStyle}</Text></View>
            <View style={styles.chip}><Text style={styles.chipText}>{career.environment}</Text></View>
          </View>
        </Section>

        <Section title="Your Future Colleagues">
          {career.colleagues.map(col => (
            <View key={col.id} style={styles.colleagueCard}>
              <Text style={styles.avatar}>{col.avatar}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.colleagueName}>{col.name}</Text>
                <Text style={styles.colleagueRole}>{col.role}</Text>
                <Text style={styles.colleaguePersonality}>{col.personality}</Text>
              </View>
            </View>
          ))}
        </Section>

        <Section title="3 Ways to Try This Career">
          <TrialCard
            icon="flash" title="15-Minute Trial" subtitle="Quick taste — lecture + mini exercise"
            gradient={['#FFD93D', '#FF8C42']}
            onPress={() => navigation.navigate('QuickTrial', { careerId })}
          />
          <TrialCard
            icon="calendar" title="Full Day Trial" subtitle="Live one workday from morning to wrap-up"
            gradient={['#6C63FF', '#00D9FF']}
            onPress={() => navigation.navigate('DayTrial', { careerId })}
          />
          <TrialCard
            icon="rocket" title="Week Simulation" subtitle="Random calls, meetings, real career pressure"
            gradient={['#00E5A0', '#00D9FF']}
            onPress={() => navigation.navigate('WeekTrial', { careerId })}
          />
        </Section>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.chatBtn}
          onPress={() => navigation.navigate('Chat', { careerId, colleagueId: career.colleagues[0].id })}
          activeOpacity={0.85}
        >
          <Ionicons name="chatbubbles" size={20} color={colors.textPrimary} />
          <Text style={styles.chatBtnText}>Chat with {career.colleagues[0].name.split(' ')[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TrialSelection', { careerId })}
          activeOpacity={0.9}
          style={{ flex: 1.2 }}
        >
          <LinearGradient colors={grad} style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Start Trial</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Stat({ icon, label, value }) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={18} color={colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}
function Section({ title, children }) {
  return (
    <View style={{ marginBottom: spacing.xl }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}
function TrialCard({ icon, title, subtitle, gradient, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <LinearGradient colors={gradient} style={styles.trialCard}>
        <View style={styles.trialIconWrap}>
          <Ionicons name={icon} size={24} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.trialTitle}>{title}</Text>
          <Text style={styles.trialSubtitle}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#fff" />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: { paddingBottom: spacing.xxl, paddingHorizontal: spacing.xxl, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, paddingTop: Platform.OS === 'web' ? 8 : 0 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 64, marginTop: spacing.md, textAlign: 'center' },
  title: { fontSize: typography.hero, fontWeight: typography.bold, color: '#fff', textAlign: 'center', marginTop: spacing.sm },
  category: { fontSize: typography.body, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: 4 },
  body: { flex: 1, paddingHorizontal: spacing.xxl, paddingTop: spacing.xl },
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
  stat: { flex: 1, backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  statValue: { color: colors.textPrimary, fontSize: typography.bodySmall, fontWeight: typography.bold, marginTop: 4, textTransform: 'capitalize' },
  statLabel: { color: colors.textMuted, fontSize: typography.tiny, marginTop: 2 },
  sectionTitle: { color: colors.textPrimary, fontSize: typography.h3, fontWeight: typography.bold, marginBottom: spacing.md },
  paragraph: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 22 },
  chipRow: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  chip: { backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: colors.border },
  chipText: { color: colors.textPrimary, fontSize: typography.bodySmall, textTransform: 'capitalize' },
  colleagueCard: { flexDirection: 'row', backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border, alignItems: 'center', gap: spacing.md },
  avatar: { fontSize: 40 },
  colleagueName: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.bold },
  colleagueRole: { color: colors.primary, fontSize: typography.caption, fontWeight: typography.semibold },
  colleaguePersonality: { color: colors.textSecondary, fontSize: typography.caption, marginTop: 4 },
  trialCard: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderRadius: borderRadius.lg, marginBottom: spacing.sm, gap: spacing.md, ...shadows.small },
  trialIconWrap: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  trialTitle: { color: '#fff', fontSize: typography.body, fontWeight: typography.bold },
  trialSubtitle: { color: 'rgba(255,255,255,0.85)', fontSize: typography.caption, marginTop: 2 },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, paddingBottom: Platform.OS === 'web' ? 16 : 30, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border, flexDirection: 'row', gap: spacing.sm },
  chatBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: spacing.md, backgroundColor: colors.card, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  chatBtnText: { color: colors.textPrimary, fontWeight: typography.semibold, fontSize: typography.bodySmall },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.md, borderRadius: borderRadius.md, ...shadows.medium },
  primaryBtnText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.body },
});
