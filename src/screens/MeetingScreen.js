import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, careerColors } from '../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { useApp } from '../context/AppContext';
import { getCareerById } from '../data/careers';

export default function MeetingScreen({ route, navigation }) {
  const { careerId, meetingTitle = 'Team Meeting', duration = 30 } = route.params || {};
  const career = getCareerById(careerId);
  const { state } = useApp();

  const [phase, setPhase] = useState('lobby'); // lobby | live | done
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [transcript, setTranscript] = useState([]);
  const scriptIdx = useRef(0);
  const pulseAnim = useRef(new Animated.Value(0)).current;

  if (!career) return null;
  const grad = careerColors[career.id]?.gradient || colors.gradientPrimary;
  const attendees = career.colleagues.slice(0, 3);

  // Fake meeting script — colleagues speaking based on career
  const script = [
    { from: attendees[0], text: `Alright team, let's kick off — I know we're all busy.` },
    { from: attendees[1] || attendees[0], text: `I looked at the numbers this morning, we're a bit behind schedule.` },
    { from: attendees[0], text: `Thoughts on how to catch up by Friday?` },
    { from: attendees[2] || attendees[1] || attendees[0], text: `We could split the work — I'll take the tricky part.` },
    { from: attendees[1] || attendees[0], text: `What do you think? Can you commit to the smaller chunk?` },
    { from: attendees[0], text: `Great, sounds like a plan. Let's regroup tomorrow at 10.` },
  ];

  useEffect(() => {
    if (phase !== 'live') return;
    const timer = setInterval(() => setElapsed(s => s + 1), 1000);
    const scriptTimer = setInterval(() => {
      if (scriptIdx.current < script.length) {
        const line = script[scriptIdx.current];
        setTranscript(prev => [...prev, { ...line, id: `l-${scriptIdx.current}-${Date.now()}` }]);
        scriptIdx.current += 1;
      }
    }, 4500);

    Animated.loop(Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
    ])).start();

    return () => { clearInterval(timer); clearInterval(scriptTimer); };
  }, [phase]);

  const start = () => setPhase('live');
  const leave = () => navigation.goBack();

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  if (phase === 'lobby') {
    return (
      <View style={styles.container}>
        <LinearGradient colors={grad} style={styles.lobby}>
          <SafeAreaView style={{ flex: 1, width: '100%' }}>
            <View style={styles.lobbyTop}>
              <TouchableOpacity onPress={leave} style={styles.iconBtn}>
                <Ionicons name="close" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.lobbyCenter}>
              <View style={styles.previewCircle}>
                <Ionicons name="person" size={68} color="rgba(255,255,255,0.6)" />
              </View>
              <Text style={styles.lobbyTitle}>{meetingTitle}</Text>
              <Text style={styles.lobbySub}>{attendees.length + 1} people • {duration} min scheduled</Text>

              <View style={styles.attendeeRow}>
                {attendees.map(a => (
                  <View key={a.id} style={styles.attendeeChip}>
                    <Text style={styles.attendeeAvatar}>{a.avatar}</Text>
                    <Text style={styles.attendeeName}>{a.name.split(' ')[0]}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.lobbyBtnRow}>
                <ToggleBtn on={videoOn} onPress={() => setVideoOn(v => !v)} onIcon="videocam" offIcon="videocam-off" />
                <ToggleBtn on={!muted} onPress={() => setMuted(m => !m)} onIcon="mic" offIcon="mic-off" />
              </View>

              <TouchableOpacity onPress={start} activeOpacity={0.9} style={styles.joinBtn}>
                <Ionicons name="videocam" size={20} color={colors.textDark} />
                <Text style={styles.joinBtnText}>Join Meeting</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }

  const currentSpeaker = transcript.length > 0 ? transcript[transcript.length - 1].from : attendees[0];

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.liveTop}>
          <View style={styles.recDot}>
            <Animated.View style={[styles.recCircle, { opacity: pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }) }]} />
            <Text style={styles.recText}>LIVE • {fmt(elapsed)}</Text>
          </View>
          <Text style={styles.liveTitle} numberOfLines={1}>{meetingTitle}</Text>
          <TouchableOpacity onPress={leave} style={[styles.iconBtn, { backgroundColor: colors.error }]}>
            <Ionicons name="call" size={20} color="#fff" style={{ transform: [{ rotate: '135deg' }] }} />
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {[...attendees, { id: 'me', name: 'You', avatar: '🙂', role: state.user.name || 'You' }].map(a => {
            const isSpeaking = currentSpeaker?.id === a.id;
            return (
              <View key={a.id} style={[styles.tile, isSpeaking && { borderColor: colors.accentGreen, borderWidth: 2 }]}>
                <LinearGradient colors={a.id === 'me' ? ['#252742', '#1E2035'] : grad} style={styles.tileGrad}>
                  <Text style={styles.tileAvatar}>{a.avatar}</Text>
                  {isSpeaking && (
                    <Animated.View style={[styles.speakingRing, {
                      opacity: pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.9] }),
                    }]} />
                  )}
                </LinearGradient>
                <View style={styles.tileNameRow}>
                  <Text style={styles.tileName}>{a.name}</Text>
                  {a.id === 'me' && muted && <Ionicons name="mic-off" size={12} color={colors.error} />}
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.captionsCard}>
          <Text style={styles.captionsLabel}>💬 Live Captions</Text>
          <ScrollView style={{ maxHeight: 180 }}>
            {transcript.length === 0 ? (
              <Text style={styles.emptyCap}>Meeting started, waiting for someone to speak…</Text>
            ) : (
              transcript.slice(-4).map(line => (
                <View key={line.id} style={styles.captionRow}>
                  <Text style={styles.capName}>{line.from.name.split(' ')[0]}:</Text>
                  <Text style={styles.capText}>{line.text}</Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>

        <View style={styles.controls}>
          <ControlBtn icon={muted ? 'mic-off' : 'mic'} active={muted} onPress={() => setMuted(m => !m)} />
          <ControlBtn icon={videoOn ? 'videocam' : 'videocam-off'} active={!videoOn} onPress={() => setVideoOn(v => !v)} />
          <ControlBtn icon="chatbubbles" onPress={() => navigation.replace('Chat', { careerId, colleagueId: currentSpeaker?.id })} />
          <TouchableOpacity onPress={leave} style={styles.leaveBtn}>
            <Ionicons name="call" size={22} color="#fff" style={{ transform: [{ rotate: '135deg' }] }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

function ToggleBtn({ on, onPress, onIcon, offIcon }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.toggleBtn, !on && { backgroundColor: colors.error }]}>
      <Ionicons name={on ? onIcon : offIcon} size={22} color="#fff" />
    </TouchableOpacity>
  );
}
function ControlBtn({ icon, active, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.ctrlBtn, active && { backgroundColor: colors.error }]} activeOpacity={0.85}>
      <Ionicons name={icon} size={22} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0B18' },
  lobby: { flex: 1 },
  lobbyTop: { paddingHorizontal: spacing.lg, paddingTop: 10 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' },
  lobbyCenter: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xxl },
  previewCircle: { width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(0,0,0,0.25)', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)' },
  lobbyTitle: { color: '#fff', fontSize: typography.h2, fontWeight: typography.bold, marginTop: spacing.xl, textAlign: 'center' },
  lobbySub: { color: 'rgba(255,255,255,0.85)', fontSize: typography.body, marginTop: 4 },
  attendeeRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xl, flexWrap: 'wrap', justifyContent: 'center' },
  attendeeChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(0,0,0,0.22)', paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: 16 },
  attendeeAvatar: { fontSize: 18 },
  attendeeName: { color: '#fff', fontSize: typography.caption, fontWeight: typography.semibold },
  lobbyBtnRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xxl },
  toggleBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' },
  joinBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: '#fff', paddingHorizontal: spacing.xxl, paddingVertical: spacing.md, borderRadius: 28, marginTop: spacing.xl, ...shadows.medium },
  joinBtnText: { color: colors.textDark, fontWeight: typography.bold, fontSize: typography.body },
  liveTop: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.md },
  recDot: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,77,106,0.15)', paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: 12 },
  recCircle: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.error },
  recText: { color: colors.error, fontSize: typography.caption, fontWeight: typography.bold, letterSpacing: 0.5 },
  liveTitle: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.semibold, flex: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, padding: spacing.md },
  tile: { width: '48%', aspectRatio: 1.3, borderRadius: borderRadius.md, overflow: 'hidden' },
  tileGrad: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tileAvatar: { fontSize: 56 },
  speakingRing: { position: 'absolute', width: '90%', height: '90%', borderRadius: 100, borderWidth: 3, borderColor: colors.accentGreen },
  tileNameRow: { position: 'absolute', bottom: 6, left: 6, right: 6, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  tileName: { color: '#fff', fontSize: typography.caption, fontWeight: typography.semibold, flex: 1 },
  captionsCard: { backgroundColor: colors.card, marginHorizontal: spacing.md, borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border, marginTop: spacing.sm },
  captionsLabel: { color: colors.textSecondary, fontSize: typography.caption, fontWeight: typography.bold, marginBottom: spacing.sm, letterSpacing: 1 },
  captionRow: { flexDirection: 'row', gap: 6, marginBottom: 6 },
  capName: { color: colors.primary, fontSize: typography.bodySmall, fontWeight: typography.bold },
  capText: { color: colors.textPrimary, fontSize: typography.bodySmall, flex: 1, lineHeight: 20 },
  emptyCap: { color: colors.textMuted, fontSize: typography.caption, fontStyle: 'italic' },
  controls: { flexDirection: 'row', gap: spacing.md, justifyContent: 'center', paddingVertical: spacing.lg, paddingBottom: Platform.OS === 'web' ? 16 : 30, marginTop: 'auto' },
  ctrlBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.surfaceLight, alignItems: 'center', justifyContent: 'center' },
  leaveBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.error, alignItems: 'center', justifyContent: 'center', ...shadows.medium },
});
