import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, careerColors } from '../../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../../theme';
import { useApp } from '../../context/AppContext';
import { getCareerById } from '../../data/careers';

const TYPE_ICONS = {
  inbox: 'mail', meeting: 'people', task: 'briefcase', review: 'code-slash',
  social: 'cafe', urgent: 'warning', critical: 'medkit', break: 'restaurant',
  communication: 'chatbubbles', wrap: 'checkmark-done', design: 'color-palette',
  research: 'search', build: 'construct',
};

export default function DayTrialScreen({ route, navigation }) {
  const { careerId } = route.params;
  const career = getCareerById(careerId);
  const { startTrial } = useApp();

  const [step, setStep] = useState(-1); // -1 intro, then index into schedule
  const [energy, setEnergy] = useState(100);
  const [stress, setStress] = useState(20);
  const [completed, setCompleted] = useState([]);
  const [actions, setActions] = useState([]);
  const [activeEvent, setActiveEvent] = useState(null);
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startTrial({
      id: `${careerId}-day-${Date.now()}`,
      careerId, careerTitle: career.title,
      trialType: 'DayTrial', startedAt: new Date().toISOString(),
    });
  }, []);

  if (!career) return null;
  const grad = careerColors[career.id]?.gradient || colors.gradientPrimary;
  const schedule = career.dayTrial.schedule;
  const stressEvents = career.dayTrial.stressEvents || [];

  const startDay = () => setStep(0);

  const handleTask = (idx, choice) => {
    const item = schedule[idx];
    let score = 60;
    let dStress = 5;
    let dEnergy = -8;
    if (choice === 'quick') { score = 50; dStress = 10; dEnergy = -5; }
    if (choice === 'careful') { score = 90; dStress = 3; dEnergy = -12; }
    if (choice === 'ask') { score = 80; dStress = -5; dEnergy = -6; }
    setStress(s => Math.min(100, Math.max(0, s + dStress)));
    setEnergy(e => Math.min(100, Math.max(0, e + dEnergy)));
    setCompleted(prev => [...prev, idx]);
    setActions(prev => [...prev, { taskId: idx, taskTitle: item.title, choice, score }]);

    // Randomly trigger stress event mid-day
    if (idx === Math.floor(schedule.length / 2) && stressEvents.length > 0) {
      setActiveEvent(stressEvents[0]);
      Animated.spring(bounce, { toValue: 1, useNativeDriver: true }).start();
    }

    if (idx < schedule.length - 1) setStep(idx + 1);
    else finishDay();
  };

  const resolveStressEvent = (handledWell) => {
    if (handledWell) {
      setStress(s => Math.max(0, s - 10));
      setActions(prev => [...prev, { taskId: 'stress', taskTitle: activeEvent.title, choice: 'resolved', score: 90 }]);
    } else {
      setStress(s => Math.min(100, s + 20));
      setActions(prev => [...prev, { taskId: 'stress', taskTitle: activeEvent.title, choice: 'panic', score: 30 }]);
    }
    setActiveEvent(null);
    bounce.setValue(0);
  };

  const finishDay = () => {
    navigation.replace('Score', { careerId, trialType: 'DayTrial', actions, energy, stress });
  };

  if (step === -1) {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
              <Ionicons name="close" size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <ScrollView contentContainerStyle={{ padding: spacing.xxl }}>
          <LinearGradient colors={grad} style={styles.introHero}>
            <Text style={styles.introEmoji}>{career.emoji}</Text>
            <Text style={styles.introHead}>Day in the Life</Text>
            <Text style={styles.introSub}>{career.title}</Text>
          </LinearGradient>
          <Text style={styles.introBody}>
            You'll live through a full workday. Each task has choices. Watch your energy and stress — they matter.
          </Text>
          <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg }}>
            <MeterPreview label="Energy" value={100} color={colors.accentGreen} icon="battery-charging" />
            <MeterPreview label="Stress" value={20} color={colors.accentOrange} icon="pulse" />
          </View>
          <TouchableOpacity onPress={startDay} activeOpacity={0.9} style={{ marginTop: spacing.xl }}>
            <LinearGradient colors={grad} style={styles.bigBtn}>
              <Text style={styles.bigBtnText}>Start My Day</Text>
              <Ionicons name="sunny" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  const item = schedule[step];
  const iconName = TYPE_ICONS[item.type] || 'briefcase';

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="close" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={{ flex: 1, gap: 6 }}>
            <View style={styles.meterRow}>
              <Ionicons name="battery-charging" size={14} color={colors.accentGreen} />
              <View style={styles.meterBar}><View style={[styles.meterFill, { width: `${energy}%`, backgroundColor: colors.accentGreen }]} /></View>
              <Ionicons name="pulse" size={14} color={stress > 70 ? colors.error : colors.accentOrange} />
              <View style={styles.meterBar}><View style={[styles.meterFill, { width: `${stress}%`, backgroundColor: stress > 70 ? colors.error : colors.accentOrange }]} /></View>
            </View>
            <Text style={styles.progressLabel}>Task {step + 1} of {schedule.length}</Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.timelineWrap}>
          {schedule.map((s, i) => (
            <View key={i} style={styles.tlItem}>
              <View style={[styles.tlDot, i < step && { backgroundColor: colors.accentGreen },
                i === step && { backgroundColor: grad[0], transform: [{ scale: 1.3 }] }]} />
              <Text style={[styles.tlTime, i === step && { color: colors.textPrimary, fontWeight: typography.bold }]}>{s.time}</Text>
            </View>
          ))}
        </View>

        <LinearGradient colors={grad} style={styles.taskCard}>
          <View style={styles.taskTopRow}>
            <View style={styles.taskIconWrap}>
              <Ionicons name={iconName} size={26} color="#fff" />
            </View>
            <Text style={styles.taskTime}>{item.time}</Text>
          </View>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDesc}>{item.description}</Text>
          <View style={styles.taskTypeChip}><Text style={styles.taskTypeText}>{item.type}</Text></View>
        </LinearGradient>

        <Text style={styles.chooseLabel}>How do you approach this?</Text>

        <ActionChoice
          icon="flash" label="Handle it quickly" desc="Fast but less thorough" color={colors.accentOrange}
          onPress={() => handleTask(step, 'quick')}
        />
        <ActionChoice
          icon="hand-left" label="Take it slow" desc="High quality, higher energy cost" color={colors.accentGreen}
          onPress={() => handleTask(step, 'careful')}
        />
        <ActionChoice
          icon="chatbubbles" label="Ask a colleague" desc="Reduces stress, may take extra time" color={colors.accent}
          onPress={() => handleTask(step, 'ask')}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Chat', { careerId, colleagueId: career.colleagues[0].id, context: { task: item.title } })}
          style={styles.chatLink}
        >
          <Ionicons name="chatbubbles-outline" size={18} color={colors.primary} />
          <Text style={styles.chatLinkText}>Message {career.colleagues[0].name.split(' ')[0]} about this</Text>
        </TouchableOpacity>
      </ScrollView>

      {activeEvent && (
        <View style={styles.eventOverlay}>
          <Animated.View style={[styles.eventCard, { transform: [{ scale: bounce.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }] }]}>
            <LinearGradient colors={['#FF4D6A', '#FF8C42']} style={styles.eventInner}>
              <Ionicons name="warning" size={40} color="#fff" />
              <Text style={styles.eventLabel}>URGENT</Text>
              <Text style={styles.eventTitle}>{activeEvent.title}</Text>
              <Text style={styles.eventDesc}>{activeEvent.description}</Text>
              <View style={{ gap: spacing.sm, marginTop: spacing.lg, alignSelf: 'stretch' }}>
                <TouchableOpacity style={styles.eventBtn} onPress={() => resolveStressEvent(true)}>
                  <Text style={styles.eventBtnText}>Stay calm, follow protocol</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.eventBtn, { backgroundColor: 'rgba(0,0,0,0.25)' }]} onPress={() => resolveStressEvent(false)}>
                  <Text style={styles.eventBtnText}>Panic — try everything at once</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

function MeterPreview({ label, value, color, icon }) {
  return (
    <View style={styles.meterCard}>
      <View style={styles.meterHeaderRow}>
        <Ionicons name={icon} size={16} color={color} />
        <Text style={styles.meterLabel}>{label}</Text>
      </View>
      <View style={styles.meterBar}><View style={[styles.meterFill, { width: `${value}%`, backgroundColor: color }]} /></View>
      <Text style={[styles.meterValue, { color }]}>{value}%</Text>
    </View>
  );
}

function ActionChoice({ icon, label, desc, color, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.actionCard}>
      <View style={[styles.actionIconWrap, { backgroundColor: `${color}22` }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.actionLabel}>{label}</Text>
        <Text style={styles.actionDesc}>{desc}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: 10, gap: spacing.md },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  meterRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  meterBar: { flex: 1, height: 6, backgroundColor: colors.card, borderRadius: 3, overflow: 'hidden' },
  meterFill: { height: '100%' },
  progressLabel: { color: colors.textMuted, fontSize: typography.tiny, textAlign: 'center' },
  body: { padding: spacing.xxl, paddingBottom: 60 },
  introHero: { paddingVertical: spacing.xxxl, borderRadius: borderRadius.xl, alignItems: 'center' },
  introEmoji: { fontSize: 72 },
  introHead: { color: '#fff', fontSize: typography.h1, fontWeight: typography.bold, marginTop: spacing.md },
  introSub: { color: 'rgba(255,255,255,0.9)', fontSize: typography.body, marginTop: 4 },
  introBody: { color: colors.textSecondary, fontSize: typography.body, marginTop: spacing.xl, lineHeight: 22 },
  meterCard: { flex: 1, backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  meterHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  meterLabel: { color: colors.textPrimary, fontSize: typography.bodySmall, fontWeight: typography.semibold },
  meterValue: { fontSize: typography.caption, fontWeight: typography.bold, marginTop: 4 },
  bigBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.md, borderRadius: borderRadius.md, ...shadows.medium },
  bigBtnText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.body },
  timelineWrap: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg, paddingVertical: spacing.md, paddingHorizontal: spacing.sm, backgroundColor: colors.card, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  tlItem: { alignItems: 'center', gap: 4 },
  tlDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  tlTime: { color: colors.textMuted, fontSize: typography.tiny },
  taskCard: { padding: spacing.lg, borderRadius: borderRadius.lg, ...shadows.medium },
  taskTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskIconWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' },
  taskTime: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold },
  taskTitle: { color: '#fff', fontSize: typography.h2, fontWeight: typography.bold, marginTop: spacing.md },
  taskDesc: { color: 'rgba(255,255,255,0.9)', fontSize: typography.body, marginTop: 4 },
  taskTypeChip: { alignSelf: 'flex-start', backgroundColor: 'rgba(0,0,0,0.25)', paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: 10, marginTop: spacing.md },
  taskTypeText: { color: '#fff', fontSize: typography.tiny, fontWeight: typography.bold, textTransform: 'uppercase', letterSpacing: 1 },
  chooseLabel: { color: colors.textPrimary, fontSize: typography.h3, fontWeight: typography.bold, marginTop: spacing.xl, marginBottom: spacing.md },
  actionCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm },
  actionIconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.semibold },
  actionDesc: { color: colors.textSecondary, fontSize: typography.caption, marginTop: 2 },
  chatLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, padding: spacing.md, marginTop: spacing.md },
  chatLinkText: { color: colors.primary, fontWeight: typography.semibold, fontSize: typography.bodySmall },
  eventOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center', padding: spacing.xxl },
  eventCard: { width: '100%', borderRadius: borderRadius.xl, overflow: 'hidden' },
  eventInner: { padding: spacing.xl, alignItems: 'center' },
  eventLabel: { color: '#fff', letterSpacing: 2, fontSize: typography.caption, fontWeight: typography.bold, marginTop: spacing.sm },
  eventTitle: { color: '#fff', fontSize: typography.h2, fontWeight: typography.bold, marginTop: 6, textAlign: 'center' },
  eventDesc: { color: 'rgba(255,255,255,0.9)', fontSize: typography.body, marginTop: 4, textAlign: 'center' },
  eventBtn: { backgroundColor: 'rgba(255,255,255,0.22)', padding: spacing.md, borderRadius: borderRadius.md, alignItems: 'center' },
  eventBtnText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.bodySmall },
});
