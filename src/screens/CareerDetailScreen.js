import React, { useMemo } from 'react';
import { Alert, View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { careerColors } from '../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { useApp } from '../context/AppContext';
import { getCareerById } from '../data/careers';
import { getCareerImage } from '../data/careerImages';

export default function CareerDetailScreen({ route, navigation }) {
  const { careerId } = route.params;
  const career = getCareerById(careerId);
  const { addToComparison, state } = useApp();
  const { isGuest } = useAuth();
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  if (!career) return null;

  const image = getCareerImage(career.id);
  const grad = careerColors[career.id]?.gradient || colors.gradientPrimary;
  const inComparison = state.comparisons.find(c => c.careerId === careerId);
  const ageGroup = state.user.ageGroup;

  const openTrial = (screen) => {
    if (!isGuest || screen === 'QuickTrial') {
      navigation.navigate(screen, { careerId });
      return;
    }

    Alert.alert(
      'Registered account required',
      'Explore mode includes 15-minute trials only. Sign in or register to unlock longer trials.',
      [
        { text: 'Not now', style: 'cancel' },
        { text: 'Login / Register', onPress: () => navigation.navigate('Login') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        {image ? (
          <>
            <Image source={image} style={styles.heroImage} />
            <LinearGradient colors={['rgba(0,0,0,0.45)', 'rgba(0,0,0,0.65)']} style={styles.heroOverlay} />
          </>
        ) : (
          <LinearGradient colors={grad} style={StyleSheet.absoluteFillObject} />
        )}
        <SafeAreaView style={styles.heroSafe}>
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
      </View>

      <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.statsRow}>
          <Stat icon="cash-outline" label="Salary" value={`$${Math.round(career.salaryRange.min/1000)}k-${Math.round(career.salaryRange.max/1000)}k`} colors={colors} />
          <Stat icon="school-outline" label="Education" value={`${career.educationYears} yrs`} colors={colors} />
          <Stat icon="trending-up-outline" label="Demand" value={career.demandLevel} colors={colors} />
        </View>

        <Section title="About this Career" colors={colors}>
          <Text style={styles.paragraph}>{career.description}</Text>
        </Section>

        <GuidanceSection ageGroup={ageGroup} career={career} colors={colors} />

        <Section title="Work Style" colors={colors}>
          <View style={styles.chipRow}>
            <View style={styles.chip}><Text style={styles.chipText}>{career.workStyle}</Text></View>
            <View style={styles.chip}><Text style={styles.chipText}>{career.environment}</Text></View>
          </View>
        </Section>

        <Section title="Your Future Colleagues" colors={colors}>
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

        <Section title="3 Ways to Try This Career" colors={colors}>
          <TrialCard
            icon="flash" title="15-Minute Trial" subtitle="Quick taste — lecture + mini exercise"
            gradient={['#FFD93D', '#FF8C42']}
            onPress={() => openTrial('QuickTrial')}
            colors={colors}
          />
          <TrialCard
            icon="calendar" title="Full Day Trial" subtitle={isGuest ? 'Registered accounts only' : 'Live one workday from morning to wrap-up'}
            gradient={['#6C63FF', '#00D9FF']}
            onPress={() => openTrial('DayTrial')}
            colors={colors}
            locked={isGuest}
          />
          <TrialCard
            icon="rocket" title="Week Simulation" subtitle={isGuest ? 'Registered accounts only' : 'Random calls, meetings, real career pressure'}
            gradient={['#00E5A0', '#00D9FF']}
            onPress={() => openTrial('WeekTrial')}
            colors={colors}
            locked={isGuest}
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

function Stat({ icon, label, value, colors }) {
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={18} color={colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Section({ title, children, colors }) {
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return (
    <View style={{ marginBottom: spacing.xl }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function TrialCard({ icon, title, subtitle, gradient, onPress, colors, locked = false }) {
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={{ opacity: locked ? 0.58 : 1 }}>
      <LinearGradient colors={gradient} style={styles.trialCard}>
        <View style={styles.trialIconWrap}>
          <Ionicons name={locked ? 'lock-closed' : icon} size={24} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.trialTitle}>{title}</Text>
          <Text style={styles.trialSubtitle}>{subtitle}</Text>
        </View>
        <Ionicons name={locked ? 'lock-closed-outline' : 'chevron-forward'} size={22} color="#fff" />
      </LinearGradient>
    </TouchableOpacity>
  );
}

function GuidanceSection({ ageGroup, career, colors }) {
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const grad = careerColors[career.id]?.gradient || colors.gradientPrimary;
  if (ageGroup === 'young-adult') {
    return (
      <Section title="For Young Adults (18–24)" colors={colors}>
        <LinearGradient colors={grad} style={styles.guidanceCard}>
          <View style={styles.guidanceHeader}>
            <Ionicons name="school-outline" size={20} color="#fff" />
            <Text style={styles.guidanceLabel}>Choosing Majors or First Jobs</Text>
          </View>
          <Text style={styles.guidanceText}>{career.guidance.youngAdult}</Text>
        </LinearGradient>
      </Section>
    );
  }
  // Default to teen view (also used when no age group is selected yet)
  return (
    <Section title="For Teens (13–17)" colors={colors}>
      <LinearGradient colors={grad} style={styles.guidanceCard}>
        <View style={styles.guidanceHeader}>
          <Ionicons name="compass-outline" size={20} color="#fff" />
          <Text style={styles.guidanceLabel}>Exploring Career Paths</Text>
        </View>
        <Text style={styles.guidanceText}>{career.guidance.teen}</Text>
      </LinearGradient>
    </Section>
  );
}

const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: { height: 360, position: 'relative', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, overflow: 'hidden' },
  heroImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%', resizeMode: 'cover' },
  heroOverlay: { ...StyleSheet.absoluteFillObject },
  heroSafe: { flex: 1, paddingHorizontal: spacing.xxl, paddingTop: Platform.OS === 'web' ? 16 : 50 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.25)', alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 64, marginTop: spacing.md, textAlign: 'center', color: '#fff' },
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
  guidanceCard: { padding: spacing.lg, borderRadius: borderRadius.lg, ...shadows.small },
  guidanceHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  guidanceLabel: { color: '#fff', fontSize: typography.caption, fontWeight: typography.bold, textTransform: 'uppercase', letterSpacing: 1 },
  guidanceText: { color: 'rgba(255,255,255,0.95)', fontSize: typography.bodySmall, lineHeight: 22 },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, paddingBottom: Platform.OS === 'web' ? 16 : 30, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border, flexDirection: 'row', gap: spacing.sm },
  chatBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: spacing.md, backgroundColor: colors.card, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  chatBtnText: { color: colors.textPrimary, fontWeight: typography.semibold, fontSize: typography.bodySmall },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.md, borderRadius: borderRadius.md, ...shadows.medium },
  primaryBtnText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.body },
});
