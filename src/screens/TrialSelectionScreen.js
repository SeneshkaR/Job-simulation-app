import React from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { careerColors } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { getCareerById } from '../data/careers';

export default function TrialSelectionScreen({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { isGuest } = useAuth();
  const { careerId } = route.params;
  const career = getCareerById(careerId);
  if (!career) return null;
  const grad = careerColors[career.id]?.gradient || colors.gradientPrimary;

  const trials = [
    { id: 'QuickTrial', icon: 'flash', title: '15-Minute Trial', duration: '15 min',
      subtitle: 'Perfect first taste', desc: 'Short lecture + interactive exercises tailored to your age group.',
      grad: ['#FFD93D', '#FF8C42'], difficulty: 'Easy' },
    { id: 'DayTrial', icon: 'calendar', title: 'Full Day', duration: '~30 min',
      subtitle: 'Live one workday', desc: 'Timeline of morning to evening. Meetings, tasks, stress events.',
      grad: ['#6C63FF', '#00D9FF'], difficulty: 'Medium' },
    { id: 'WeekTrial', icon: 'rocket', title: 'Full Week', duration: '~1 hour',
      subtitle: 'Feel the real thing', desc: '5 days with random calls, colleague messages, team meetings, deadlines.',
      grad: ['#00E5A0', '#00D9FF'], difficulty: 'Hard' },
  ];

  const openTrial = (trial) => {
    const locked = isGuest && trial.id !== 'QuickTrial';
    if (!locked) {
      navigation.navigate(trial.id, { careerId });
      return;
    }

    Alert.alert(
      'Registered account required',
      'Explore mode includes 15-minute trials only. Sign in or register to unlock Day and Week trials.',
      [
        { text: 'Not now', style: 'cancel' },
        { text: 'Login / Register', onPress: () => navigation.navigate('Login') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.eyebrow}>{career.title.toUpperCase()}</Text>
        <Text style={styles.heading}>Pick your{'\n'}experience</Text>
        <Text style={styles.subheading}>Each trial gets more real. Start small or dive in.</Text>

        {isGuest && (
          <View style={styles.guestNotice}>
            <Ionicons name="information-circle" size={20} color={colors.primary} />
            <Text style={styles.guestNoticeText}>Explore mode includes the 15-minute trial. Register or sign in for longer trials.</Text>
          </View>
        )}

        {trials.map((trial) => {
          const locked = isGuest && trial.id !== 'QuickTrial';
          return (
            <TouchableOpacity
              key={trial.id}
              onPress={() => openTrial(trial)}
              activeOpacity={0.9}
              style={{ marginTop: spacing.lg, opacity: locked ? 0.58 : 1 }}
            >
              <LinearGradient colors={trial.grad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
                <View style={styles.cardTopRow}>
                  <View style={styles.iconWrap}>
                    <Ionicons name={locked ? 'lock-closed' : trial.icon} size={28} color="#fff" />
                  </View>
                  <View style={styles.durationChip}>
                    <Ionicons name={locked ? 'lock-closed-outline' : 'time-outline'} size={12} color="#fff" />
                    <Text style={styles.durationText}>{locked ? 'REGISTERED ONLY' : trial.duration}</Text>
                  </View>
                </View>
                <Text style={styles.cardTitle}>{trial.title}</Text>
                <Text style={styles.cardSub}>{locked ? 'Login or register to unlock' : trial.subtitle}</Text>
                <Text style={styles.cardDesc}>{trial.desc}</Text>
                <View style={styles.cardFooter}>
                  <View style={styles.diffChip}><Text style={styles.diffText}>{trial.difficulty}</Text></View>
                  <View style={styles.startBtn}>
                    <Text style={styles.startBtnText}>{locked ? 'Unlock' : 'Start'}</Text>
                    <Ionicons name={locked ? 'lock-open-outline' : 'arrow-forward'} size={16} color="#fff" />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={styles.chatCard}
          onPress={() => navigation.navigate('Chat', { careerId, colleagueId: career.colleagues[0].id })}
        >
          <Text style={styles.avatar}>{career.colleagues[0].avatar}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.chatTitle}>Not sure? Chat with {career.colleagues[0].name.split(' ')[0]} first</Text>
            <Text style={styles.chatSub}>Ask anything about the career</Text>
          </View>
          <Ionicons name="chatbubbles" size={22} color={colors.primary} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerRow: { paddingHorizontal: spacing.lg, paddingTop: 10 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  scroll: { paddingHorizontal: spacing.xxl, paddingTop: spacing.lg, paddingBottom: 40 },
  eyebrow: { color: colors.primary, fontSize: typography.caption, fontWeight: typography.bold, letterSpacing: 1.5 },
  heading: { color: colors.textPrimary, fontSize: typography.hero, fontWeight: typography.heavy, marginTop: spacing.sm, lineHeight: 40 },
  subheading: { color: colors.textSecondary, fontSize: typography.body, marginTop: spacing.sm },
  guestNotice: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: `${colors.primary}14`, borderWidth: 1, borderColor: `${colors.primary}35`, borderRadius: borderRadius.md, padding: spacing.md, marginTop: spacing.lg },
  guestNoticeText: { flex: 1, color: colors.textSecondary, fontSize: typography.bodySmall, lineHeight: 19 },
  card: { padding: spacing.lg, borderRadius: borderRadius.xl, ...shadows.medium },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconWrap: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' },
  durationChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(0,0,0,0.25)', paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: 10 },
  durationText: { color: '#fff', fontSize: typography.caption, fontWeight: typography.bold },
  cardTitle: { color: '#fff', fontSize: typography.h2, fontWeight: typography.bold, marginTop: spacing.md },
  cardSub: { color: 'rgba(255,255,255,0.9)', fontSize: typography.bodySmall, fontWeight: typography.semibold, marginTop: 2 },
  cardDesc: { color: 'rgba(255,255,255,0.85)', fontSize: typography.bodySmall, marginTop: spacing.sm, lineHeight: 20 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.lg },
  diffChip: { backgroundColor: 'rgba(0,0,0,0.25)', paddingHorizontal: spacing.md, paddingVertical: 5, borderRadius: 10 },
  diffText: { color: '#fff', fontSize: typography.caption, fontWeight: typography.bold },
  startBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: 12 },
  startBtnText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.bodySmall },
  chatCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.card, padding: spacing.lg, borderRadius: borderRadius.lg, marginTop: spacing.xl, borderWidth: 1, borderColor: colors.border },
  avatar: { fontSize: 36 },
  chatTitle: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.semibold },
  chatSub: { color: colors.textSecondary, fontSize: typography.caption, marginTop: 2 },
});
