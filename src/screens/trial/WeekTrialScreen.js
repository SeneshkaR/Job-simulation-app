import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, careerColors } from '../../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../../theme';
import { useApp } from '../../context/AppContext';
import { getCareerById } from '../../data/careers';

const DAY_LABELS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function WeekTrialScreen({ route, navigation }) {
  const { careerId } = route.params;
  const career = getCareerById(careerId);
  const { startTrial } = useApp();

  const [phase, setPhase] = useState('intro'); // intro | day | done
  const [dayIdx, setDayIdx] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [stress, setStress] = useState(15);
  const [projectProgress, setProjectProgress] = useState(0);
  const [teamMood, setTeamMood] = useState(70);
  const [events, setEvents] = useState([]); // events happening today
  const [handledEvents, setHandledEvents] = useState([]);
  const [popup, setPopup] = useState(null);
  const [actions, setActions] = useState([]);
  const popupAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startTrial({
      id: `${careerId}-week-${Date.now()}`,
      careerId, careerTitle: career.title,
      trialType: 'WeekTrial', startedAt: new Date().toISOString(),
    });
  }, []);

  if (!career) return null;
  const grad = careerColors[career.id]?.gradient || colors.gradientPrimary;
  const pool = career.weekTrial.randomEventPool;
  const project = career.weekTrial.teamProject;

  const generateDayEvents = (dIdx) => {
    // 2-3 random events per day
    const count = 2 + Math.floor(Math.random() * 2);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, count);
    return shuffled.map((ev, i) => ({ ...ev, id: `d${dIdx}-e${i}-${Date.now()}` }));
  };

  const startWeek = () => {
    setPhase('day');
    const ev = generateDayEvents(0);
    setEvents(ev);
    // Show first as popup after mount
    setTimeout(() => showEvent(ev[0]), 400);
  };

  const showEvent = (ev) => {
    if (!ev) return;
    setPopup(ev);
    Animated.spring(popupAnim, { toValue: 1, useNativeDriver: true }).start();
  };
  const hideEvent = () => {
    Animated.timing(popupAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => setPopup(null));
  };

  const handleEvent = (ev, choice) => {
    let score = 60, dStress = 0, dEnergy = -3, dProject = 5, dMood = 0;
    if (choice === 'respond') { score = 85; dStress = 3; dProject = 8; dMood = 5; }
    if (choice === 'delegate') { score = 65; dStress = -2; dProject = 3; dMood = -3; }
    if (choice === 'ignore') { score = 25; dStress = 8; dProject = -5; dMood = -10; }
    if (choice === 'chat') { score = 80; dStress = -4; dMood = 8; dProject = 6; }
    if (ev.type === 'meeting' && choice === 'respond') { dEnergy = -10; }
    if (ev.type === 'deadline' && choice === 'ignore') { dStress = 20; dProject = -15; }

    setStress(s => Math.min(100, Math.max(0, s + dStress)));
    setEnergy(e => Math.min(100, Math.max(0, e + dEnergy)));
    setProjectProgress(p => Math.min(100, Math.max(0, p + dProject)));
    setTeamMood(m => Math.min(100, Math.max(0, m + dMood)));
    setActions(prev => [...prev, { day: dayIdx, event: ev.title || ev.content || ev.topic, choice, score, type: ev.type }]);
    setHandledEvents(prev => [...prev, ev.id]);
    hideEvent();

    if (choice === 'chat') {
      setTimeout(() => navigation.navigate('Chat', {
        careerId,
        colleagueId: ev.from || career.colleagues[0].id,
        context: { situation: ev.content || ev.title || ev.topic },
      }), 220);
      return;
    }
    if (ev.type === 'meeting' && choice === 'respond') {
      setTimeout(() => navigation.navigate('Meeting', {
        careerId, meetingTitle: ev.title, duration: ev.duration || 30,
      }), 220);
      return;
    }
  };

  const endDay = () => {
    // energy restore overnight
    setEnergy(e => Math.min(100, e + 40));
    setStress(s => Math.max(0, s - 10));
    if (dayIdx < DAY_LABELS.length - 1) {
      const next = dayIdx + 1;
      setDayIdx(next);
      const ev = generateDayEvents(next);
      setEvents(ev);
      setHandledEvents([]);
      setTimeout(() => showEvent(ev[0]), 400);
    } else {
      finishWeek();
    }
  };

  const finishWeek = () => {
    navigation.replace('Score', {
      careerId, trialType: 'WeekTrial', actions,
      energy, stress, projectProgress, teamMood,
    });
  };

  if (phase === 'intro') {
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
            <Text style={styles.introHead}>Full Week Simulation</Text>
            <Text style={styles.introSub}>{career.title}</Text>
          </LinearGradient>

          <View style={styles.projectCard}>
            <Text style={styles.projectLabel}>🎯 YOUR PROJECT THIS WEEK</Text>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectDesc}>{project.description}</Text>
          </View>

          <Text style={styles.explainText}>
            Random calls, messages, meetings, and deadlines will hit you. Balance your team, your project, and your sanity.
          </Text>

          <View style={styles.rulesList}>
            <RuleRow icon="battery-charging" color={colors.accentGreen} text="Energy drains fast — sleep restores it" />
            <RuleRow icon="pulse" color={colors.accentOrange} text="Stress builds up — ignore too much and you burn out" />
            <RuleRow icon="people" color={colors.accent} text="Team mood matters — collaborate wisely" />
            <RuleRow icon="rocket" color={colors.primary} text="Ship the project by Friday" />
          </View>

          <TouchableOpacity onPress={startWeek} activeOpacity={0.9} style={{ marginTop: spacing.xl }}>
            <LinearGradient colors={grad} style={styles.bigBtn}>
              <Text style={styles.bigBtnText}>Begin Monday</Text>
              <Ionicons name="calendar" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="close" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.dayLabel}>{DAY_LABELS[dayIdx]}</Text>
            <View style={styles.dayDots}>
              {DAY_LABELS.map((_, i) => (
                <View key={i} style={[styles.dayDot, i < dayIdx && { backgroundColor: colors.accentGreen },
                  i === dayIdx && { backgroundColor: grad[0], width: 24 }]} />
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ padding: spacing.xxl, paddingBottom: 120 }}>
        <View style={styles.metersRow}>
          <MiniMeter icon="battery-charging" color={colors.accentGreen} value={energy} label="Energy" />
          <MiniMeter icon="pulse" color={stress > 70 ? colors.error : colors.accentOrange} value={stress} label="Stress" />
          <MiniMeter icon="people" color={colors.accent} value={teamMood} label="Team" />
        </View>

        <LinearGradient colors={grad} style={styles.projectProgress}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.projectHead}>{project.title}</Text>
            <Text style={styles.projectPct}>{projectProgress}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressBar, { width: `${projectProgress}%` }]} />
          </View>
        </LinearGradient>

        <Text style={styles.inboxLabel}>Today's Inbox</Text>
        {events.map(ev => {
          const handled = handledEvents.includes(ev.id);
          return (
            <TouchableOpacity
              key={ev.id}
              onPress={() => !handled && showEvent(ev)}
              activeOpacity={0.9}
              style={[styles.eventItem, handled && { opacity: 0.5 }]}
            >
              <View style={[styles.evIconWrap, { backgroundColor: `${eventColor(ev.type)}22` }]}>
                <Ionicons name={eventIcon(ev.type)} size={20} color={eventColor(ev.type)} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.evType}>{ev.type.toUpperCase()}</Text>
                <Text style={styles.evTitle}>{ev.title || ev.topic || ev.content}</Text>
                {ev.from && <Text style={styles.evFrom}>from {colleagueName(career, ev.from)}</Text>}
              </View>
              {handled ? <Ionicons name="checkmark-done" size={22} color={colors.accentGreen} /> : <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />}
            </TouchableOpacity>
          );
        })}

        {handledEvents.length === events.length && (
          <TouchableOpacity onPress={endDay} activeOpacity={0.9} style={{ marginTop: spacing.xl }}>
            <LinearGradient colors={grad} style={styles.bigBtn}>
              <Ionicons name="moon" size={20} color="#fff" />
              <Text style={styles.bigBtnText}>{dayIdx === DAY_LABELS.length - 1 ? 'Finish Week' : 'End of Day — Sleep'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>

      {popup && (
        <View style={styles.overlay}>
          <Animated.View style={[styles.popup, {
            transform: [{ scale: popupAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }],
            opacity: popupAnim,
          }]}>
            <LinearGradient colors={popupColors(popup.type)} style={styles.popupInner}>
              <View style={styles.popupHeader}>
                <Ionicons name={eventIcon(popup.type)} size={24} color="#fff" />
                <Text style={styles.popupType}>{popup.type.toUpperCase()}</Text>
                {popup.urgency && <View style={styles.urgentBadge}><Text style={styles.urgentText}>{popup.urgency}</Text></View>}
              </View>
              {popup.from && <Text style={styles.popupFrom}>From {colleagueName(career, popup.from)}</Text>}
              <Text style={styles.popupTitle}>{popup.title || popup.topic || popup.content}</Text>
              {popup.hoursRemaining && <Text style={styles.popupSubText}>⏰ {popup.hoursRemaining}h remaining</Text>}
              {popup.duration && <Text style={styles.popupSubText}>⏱ {popup.duration} min meeting</Text>}

              <View style={{ gap: spacing.sm, marginTop: spacing.lg, alignSelf: 'stretch' }}>
                <PopupBtn icon="checkmark" label={
                  popup.type === 'meeting' ? 'Join meeting now' :
                  popup.type === 'call' ? 'Take the call' :
                  popup.type === 'deadline' ? 'Push through and ship' :
                  'Respond right away'
                } onPress={() => handleEvent(popup, 'respond')} />
                {(popup.type === 'message' || popup.type === 'call') && (
                  <PopupBtn icon="chatbubbles" label="Open chat" onPress={() => handleEvent(popup, 'chat')} />
                )}
                <PopupBtn icon="git-branch" label="Delegate / defer" secondary onPress={() => handleEvent(popup, 'delegate')} />
                <PopupBtn icon="close-circle-outline" label="Ignore for now" secondary onPress={() => handleEvent(popup, 'ignore')} />
              </View>
            </LinearGradient>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

function eventIcon(t) {
  if (t === 'message') return 'chatbubble';
  if (t === 'call') return 'call';
  if (t === 'meeting') return 'videocam';
  if (t === 'deadline') return 'alarm';
  return 'notifications';
}
function eventColor(t) {
  if (t === 'message') return colors.accent;
  if (t === 'call') return colors.accentGreen;
  if (t === 'meeting') return colors.primary;
  if (t === 'deadline') return colors.error;
  return colors.accentOrange;
}
function popupColors(t) {
  if (t === 'deadline') return ['#FF4D6A', '#FF8C42'];
  if (t === 'call') return ['#00E5A0', '#00D9FF'];
  if (t === 'meeting') return ['#6C63FF', '#8B83FF'];
  if (t === 'message') return ['#00D9FF', '#6C63FF'];
  return ['#6C63FF', '#00D9FF'];
}
function colleagueName(career, id) {
  const c = career.colleagues.find(x => x.id === id);
  return c ? c.name : 'Colleague';
}

function MiniMeter({ icon, color, value, label }) {
  return (
    <View style={styles.miniMeter}>
      <View style={styles.miniMeterHead}>
        <Ionicons name={icon} size={14} color={color} />
        <Text style={styles.miniMeterLabel}>{label}</Text>
      </View>
      <View style={styles.miniBar}><View style={[styles.miniBarFill, { width: `${value}%`, backgroundColor: color }]} /></View>
    </View>
  );
}
function RuleRow({ icon, color, text }) {
  return (
    <View style={styles.ruleRow}>
      <View style={[styles.ruleIconBox, { backgroundColor: `${color}22` }]}><Ionicons name={icon} size={16} color={color} /></View>
      <Text style={styles.ruleText}>{text}</Text>
    </View>
  );
}
function PopupBtn({ icon, label, onPress, secondary }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.popupBtn, secondary && { backgroundColor: 'rgba(0,0,0,0.25)' }]} activeOpacity={0.85}>
      <Ionicons name={icon} size={18} color="#fff" />
      <Text style={styles.popupBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: 10, gap: spacing.md },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  dayLabel: { color: colors.textPrimary, fontSize: typography.h3, fontWeight: typography.bold, textAlign: 'center' },
  dayDots: { flexDirection: 'row', gap: 4, justifyContent: 'center', marginTop: 6 },
  dayDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  introHero: { paddingVertical: spacing.xxxl, borderRadius: borderRadius.xl, alignItems: 'center' },
  introEmoji: { fontSize: 72 },
  introHead: { color: '#fff', fontSize: typography.h1, fontWeight: typography.bold, marginTop: spacing.md },
  introSub: { color: 'rgba(255,255,255,0.9)', fontSize: typography.body, marginTop: 4 },
  projectCard: { backgroundColor: colors.card, padding: spacing.lg, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, marginTop: spacing.xl },
  projectLabel: { color: colors.accentYellow, fontSize: typography.caption, fontWeight: typography.bold, letterSpacing: 1 },
  projectTitle: { color: colors.textPrimary, fontSize: typography.h3, fontWeight: typography.bold, marginTop: 6 },
  projectDesc: { color: colors.textSecondary, fontSize: typography.bodySmall, marginTop: 4, lineHeight: 20 },
  explainText: { color: colors.textSecondary, fontSize: typography.body, marginTop: spacing.lg, lineHeight: 22 },
  rulesList: { gap: spacing.sm, marginTop: spacing.lg },
  ruleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  ruleIconBox: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  ruleText: { color: colors.textPrimary, fontSize: typography.bodySmall, flex: 1 },
  bigBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.md, borderRadius: borderRadius.md, ...shadows.medium },
  bigBtnText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.body },
  metersRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  miniMeter: { flex: 1, backgroundColor: colors.card, padding: spacing.sm, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  miniMeterHead: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  miniMeterLabel: { color: colors.textSecondary, fontSize: typography.tiny, fontWeight: typography.semibold },
  miniBar: { height: 5, backgroundColor: colors.surfaceLight, borderRadius: 3, marginTop: 6, overflow: 'hidden' },
  miniBarFill: { height: '100%' },
  projectProgress: { padding: spacing.lg, borderRadius: borderRadius.lg, ...shadows.small },
  projectHead: { color: '#fff', fontSize: typography.body, fontWeight: typography.bold, flex: 1 },
  projectPct: { color: '#fff', fontSize: typography.h3, fontWeight: typography.heavy },
  progressTrack: { height: 8, backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 4, marginTop: spacing.sm, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#fff', borderRadius: 4 },
  inboxLabel: { color: colors.textPrimary, fontSize: typography.h3, fontWeight: typography.bold, marginTop: spacing.xl, marginBottom: spacing.md },
  eventItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm },
  evIconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  evType: { color: colors.textMuted, fontSize: typography.tiny, fontWeight: typography.bold, letterSpacing: 1 },
  evTitle: { color: colors.textPrimary, fontSize: typography.bodySmall, fontWeight: typography.semibold, marginTop: 2 },
  evFrom: { color: colors.textSecondary, fontSize: typography.tiny, marginTop: 2 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.75)', alignItems: 'center', justifyContent: 'center', padding: spacing.xxl },
  popup: { width: '100%', borderRadius: borderRadius.xl, overflow: 'hidden' },
  popupInner: { padding: spacing.xl },
  popupHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  popupType: { color: '#fff', fontSize: typography.caption, fontWeight: typography.bold, letterSpacing: 1.5, flex: 1 },
  urgentBadge: { backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: 8 },
  urgentText: { color: '#fff', fontSize: typography.tiny, fontWeight: typography.bold, textTransform: 'uppercase' },
  popupFrom: { color: 'rgba(255,255,255,0.85)', fontSize: typography.bodySmall, fontWeight: typography.semibold, marginTop: spacing.md },
  popupTitle: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold, marginTop: 6, lineHeight: 24 },
  popupSubText: { color: 'rgba(255,255,255,0.9)', fontSize: typography.bodySmall, marginTop: spacing.sm },
  popupBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: 'rgba(255,255,255,0.22)', padding: spacing.md, borderRadius: borderRadius.md },
  popupBtnText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.bodySmall, flex: 1 },
});
