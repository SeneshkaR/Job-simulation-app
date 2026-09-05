import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { careerColors } from '../../theme/colors';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, typography, borderRadius, shadows } from '../../theme';
import { useApp } from '../../context/AppContext';
import { getCareerById } from '../../data/careers';

export default function QuickTrialScreen({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { careerId } = route.params;
  const career = getCareerById(careerId);
  const { state, startTrial, updateTrial } = useApp();
  const savedTrial = state.trials.active?.careerId === careerId && state.trials.active?.trialType === 'QuickTrial'
    ? state.trials.active
    : null;
  const savedProgress = savedTrial?.progress || {};

  // Phase: 'intro' -> lecture section index -> exercise index -> 'summary'
  const [phase, setPhase] = useState(savedProgress.phase || 'intro');
  const [lectureIdx, setLectureIdx] = useState(savedProgress.lectureIdx || 0);
  const [exerciseIdx, setExerciseIdx] = useState(savedProgress.exerciseIdx || 0);
  const [actions, setActions] = useState(savedProgress.actions || []);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!savedTrial) {
      startTrial({
        id: `${careerId}-quick-${Date.now()}`,
        careerId, careerTitle: career.title,
        trialType: 'QuickTrial', startedAt: new Date().toISOString(),
        progress: { phase: 'intro', lectureIdx: 0, exerciseIdx: 0, actions: [] },
      });
    }
  }, []);

  useEffect(() => {
    updateTrial({ progress: { phase, lectureIdx, exerciseIdx, actions } });
  }, [phase, lectureIdx, exerciseIdx, actions]);

  if (!career) return null;
  const grad = careerColors[career.id]?.gradient || colors.gradientPrimary;
  const lecture = career.quickTrial.lecture;
  const exercises = career.quickTrial.exercises;
  const totalSteps = 1 + lecture.sections.length + exercises.length + 1;
  const currentStep =
    phase === 'intro' ? 0 :
    phase === 'lecture' ? 1 + lectureIdx :
    phase === 'exercise' ? 1 + lecture.sections.length + exerciseIdx :
    totalSteps;

  useEffect(() => {
    Animated.timing(progress, { toValue: currentStep / totalSteps, duration: 300, useNativeDriver: false }).start();
  }, [currentStep]);

  const advance = () => {
    if (phase === 'intro') { setPhase('lecture'); setLectureIdx(0); return; }
    if (phase === 'lecture') {
      if (lectureIdx < lecture.sections.length - 1) setLectureIdx(lectureIdx + 1);
      else { setPhase('exercise'); setExerciseIdx(0); }
      return;
    }
    if (phase === 'exercise') {
      if (exerciseIdx < exercises.length - 1) setExerciseIdx(exerciseIdx + 1);
      else setPhase('summary');
      return;
    }
    // summary -> go to score
    navigation.replace('Score', { careerId, trialType: 'QuickTrial', actions });
  };

  const recordAction = (a) => setActions(prev => [...prev, a]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="close" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.progressBg}>
            <Animated.View style={[styles.progressFill,
              { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
                backgroundColor: grad[0] }]} />
          </View>
          <Text style={styles.stepText}>{currentStep + 1}/{totalSteps}</Text>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {phase === 'intro' && (
          <IntroScreen career={career} grad={grad} onStart={advance} />
        )}
        {phase === 'lecture' && (
          <LectureSection section={lecture.sections[lectureIdx]} title={lecture.title} grad={grad} onNext={advance}
            step={lectureIdx + 1} total={lecture.sections.length} />
        )}
        {phase === 'exercise' && (
          <ExerciseView key={exerciseIdx} exercise={exercises[exerciseIdx]} onFinish={(result) => { recordAction(result); advance(); }} grad={grad} />
        )}
        {phase === 'summary' && (
          <SummaryScreen actions={actions} grad={grad} onFinish={advance} />
        )}
      </ScrollView>
    </View>
  );
}

/* ---------- Intro ---------- */
function IntroScreen({ career, grad, onStart }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={{ paddingHorizontal: spacing.xxl }}>
      <LinearGradient colors={grad} style={styles.introHero}>
        <Text style={styles.introEmoji}>{career.emoji}</Text>
        <Text style={styles.introTitle}>15-Minute Trial</Text>
        <Text style={styles.introCareer}>{career.title}</Text>
      </LinearGradient>
      <Text style={styles.introBody}>
        In the next 15 minutes you'll learn what {career.title.toLowerCase()}s actually do, then face real scenarios they encounter.
      </Text>
      <View style={styles.introList}>
        <IntroRow icon="book" text={`Short lecture (${career.quickTrial.lecture.durationMinutes} min)`} />
        <IntroRow icon="game-controller" text={`${career.quickTrial.exercises.length} interactive challenges`} />
        <IntroRow icon="trophy" text="Get scored on 5 dimensions" />
      </View>
      <TouchableOpacity onPress={onStart} activeOpacity={0.9} style={{ marginTop: spacing.xl }}>
        <LinearGradient colors={grad} style={styles.bigBtn}>
          <Text style={styles.bigBtnText}>Let's Go</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
function IntroRow({ icon, text }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.introRow}>
      <View style={styles.introIconBox}><Ionicons name={icon} size={18} color={colors.primary} /></View>
      <Text style={styles.introRowText}>{text}</Text>
    </View>
  );
}

/* ---------- Lecture ---------- */
function LectureSection({ section, title, grad, onNext, step, total }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={{ paddingHorizontal: spacing.xxl }}>
      <Text style={styles.lecTitle}>{title}</Text>
      <Text style={styles.lecStep}>Section {step}/{total}</Text>

      {section.type === 'text' && (
        <View style={styles.lecCard}>
          <Text style={styles.lecText}>{section.content}</Text>
        </View>
      )}

      {section.type === 'highlight' && (
        <LinearGradient colors={grad} style={styles.highlightCard}>
          <Ionicons name="bulb" size={28} color="#fff" />
          <Text style={styles.highlightText}>{section.content}</Text>
        </LinearGradient>
      )}

      {section.type === 'myth-vs-reality' && (
        <View style={{ gap: spacing.md }}>
          <View style={[styles.mythCard, { borderLeftColor: colors.error }]}>
            <Text style={styles.mythLabel}>MYTH</Text>
            <Text style={styles.mythText}>{section.myth}</Text>
          </View>
          <View style={[styles.mythCard, { borderLeftColor: colors.accentGreen }]}>
            <Text style={[styles.mythLabel, { color: colors.accentGreen }]}>REALITY</Text>
            <Text style={styles.mythText}>{section.reality}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity onPress={onNext} activeOpacity={0.9} style={{ marginTop: spacing.xl }}>
        <LinearGradient colors={grad} style={styles.bigBtn}>
          <Text style={styles.bigBtnText}>Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- Exercises ---------- */
function ExerciseView({ exercise, onFinish, grad }) {
  if (exercise.type === 'prioritize') return <PrioritizeExercise exercise={exercise} onFinish={onFinish} grad={grad} />;
  if (exercise.type === 'decision') return <DecisionExercise exercise={exercise} onFinish={onFinish} grad={grad} />;
  if (exercise.type === 'code-fix') return <DecisionExercise exercise={exercise} onFinish={onFinish} grad={grad} />;
  return <DecisionExercise exercise={exercise} onFinish={onFinish} grad={grad} />;
}

function PrioritizeExercise({ exercise, onFinish, grad }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [order, setOrder] = useState(exercise.items.map(i => i.id));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercise.timeLimit || 90);

  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => setTimeLeft(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [submitted]);

  const move = (idx, dir) => {
    if (submitted) return;
    const newOrder = [...order];
    const swap = idx + dir;
    if (swap < 0 || swap >= newOrder.length) return;
    [newOrder[idx], newOrder[swap]] = [newOrder[swap], newOrder[idx]];
    setOrder(newOrder);
  };

  const submit = () => {
    let s = 0;
    order.forEach((id, idx) => {
      const item = exercise.items.find(i => i.id === id);
      if (item.correctRank === idx + 1) s += 25;
      else if (Math.abs(item.correctRank - (idx + 1)) === 1) s += 12;
    });
    setScore(s);
    setSubmitted(true);
    onFinish({ exerciseId: exercise.id, score: s, order, weight: exercise.scoreWeight });
  };

  return (
    <View style={{ paddingHorizontal: spacing.xxl }}>
      <View style={styles.exHeaderRow}>
        <Text style={styles.exType}>PRIORITIZE</Text>
        <View style={styles.timerChip}>
          <Ionicons name="time" size={14} color={timeLeft < 15 ? colors.error : colors.warning} />
          <Text style={[styles.timerText, timeLeft < 15 && { color: colors.error }]}>{timeLeft}s</Text>
        </View>
      </View>
      <Text style={styles.exTitle}>{exercise.title}</Text>
      <Text style={styles.exDesc}>{exercise.description}</Text>

      <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
        {order.map((id, idx) => {
          const item = exercise.items.find(i => i.id === id);
          const correct = submitted && item.correctRank === idx + 1;
          const wrong = submitted && item.correctRank !== idx + 1;
          return (
            <View key={id} style={[styles.prioItem, correct && { borderColor: colors.accentGreen }, wrong && { borderColor: colors.error }]}>
              <View style={[styles.rankBadge, { backgroundColor: grad[0] }]}>
                <Text style={styles.rankText}>{idx + 1}</Text>
              </View>
              <Text style={styles.prioText}>{item.text}</Text>
              {!submitted && (
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  <TouchableOpacity onPress={() => move(idx, -1)} style={styles.miniBtn}><Ionicons name="chevron-up" size={16} color={colors.textPrimary} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => move(idx, 1)} style={styles.miniBtn}><Ionicons name="chevron-down" size={16} color={colors.textPrimary} /></TouchableOpacity>
                </View>
              )}
              {submitted && (
                <Ionicons name={correct ? 'checkmark-circle' : 'close-circle'} size={22} color={correct ? colors.accentGreen : colors.error} />
              )}
            </View>
          );
        })}
      </View>

      {!submitted ? (
        <TouchableOpacity onPress={submit} activeOpacity={0.9} style={{ marginTop: spacing.lg }}>
          <LinearGradient colors={grad} style={styles.bigBtn}>
            <Text style={styles.bigBtnText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <View style={{ marginTop: spacing.lg }}>
          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackTitle}>Score: {score}/100</Text>
            <Text style={styles.feedbackText}>{exercise.explanation}</Text>
          </View>
          <TouchableOpacity onPress={() => onFinish({ exerciseId: exercise.id, score, weight: exercise.scoreWeight })} activeOpacity={0.9} style={{ marginTop: spacing.md }}>
            <LinearGradient colors={grad} style={styles.bigBtn}>
              <Text style={styles.bigBtnText}>Next</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function DecisionExercise({ exercise, onFinish, grad }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [picked, setPicked] = useState(null);

  const submit = () => {
    if (picked == null) return;
    const opt = exercise.options[picked];
    onFinish({ exerciseId: exercise.id, choice: opt.id, score: opt.score, weight: exercise.scoreWeight });
  };

  return (
    <View style={{ paddingHorizontal: spacing.xxl }}>
      <Text style={styles.exType}>{(exercise.type || 'DECISION').toUpperCase()}</Text>
      <Text style={styles.exTitle}>{exercise.title}</Text>
      <Text style={styles.exDesc}>{exercise.description}</Text>

      <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
        {exercise.options.map((opt, idx) => {
          const active = picked === idx;
          const revealed = picked != null;
          return (
            <TouchableOpacity
              key={opt.id}
              onPress={() => !revealed && setPicked(idx)}
              activeOpacity={0.9}
              style={[
                styles.optCard,
                active && { borderColor: grad[0] },
                revealed && active && opt.score >= 80 && { borderColor: colors.accentGreen, backgroundColor: 'rgba(0,229,160,0.12)' },
                revealed && active && opt.score < 80 && { borderColor: colors.warning, backgroundColor: 'rgba(255,217,61,0.12)' },
              ]}
            >
              <View style={styles.optLetter}><Text style={styles.optLetterText}>{String.fromCharCode(65 + idx)}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.optText}>{opt.text}</Text>
                {revealed && active && (
                  <Text style={styles.optFeedback}>{opt.feedback}</Text>
                )}
              </View>
              {revealed && active && (
                <Text style={styles.optScore}>{opt.score}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity onPress={submit} disabled={picked == null} activeOpacity={0.9} style={{ marginTop: spacing.xl, opacity: picked == null ? 0.4 : 1 }}>
        <LinearGradient colors={grad} style={styles.bigBtn}>
          <Text style={styles.bigBtnText}>{picked != null ? 'Next' : 'Pick an option'}</Text>
          {picked != null && <Ionicons name="arrow-forward" size={20} color="#fff" />}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- Summary ---------- */
function SummaryScreen({ actions, grad, onFinish }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const total = actions.reduce((s, a) => s + (a.score || 0), 0);
  const avg = actions.length ? Math.round(total / actions.length) : 0;
  return (
    <View style={{ paddingHorizontal: spacing.xxl, alignItems: 'center' }}>
      <LinearGradient colors={grad} style={styles.summaryCircle}>
        <Text style={styles.summaryScore}>{avg}</Text>
        <Text style={styles.summarySubscore}>/ 100</Text>
      </LinearGradient>
      <Text style={styles.summaryTitle}>Trial Complete! 🎉</Text>
      <Text style={styles.summaryDesc}>Great effort. Let's see how you did in detail.</Text>

      <TouchableOpacity onPress={onFinish} activeOpacity={0.9} style={{ marginTop: spacing.xl, alignSelf: 'stretch' }}>
        <LinearGradient colors={grad} style={styles.bigBtn}>
          <Text style={styles.bigBtnText}>See Full Score</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: 10, gap: spacing.md },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  progressBg: { flex: 1, height: 6, backgroundColor: colors.card, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  stepText: { color: colors.textSecondary, fontSize: typography.caption, fontWeight: typography.semibold, width: 40, textAlign: 'right' },
  body: { paddingVertical: spacing.xl, paddingBottom: Platform.OS === 'web' ? 30 : 60 },
  introHero: { paddingVertical: spacing.xxxl, borderRadius: borderRadius.xl, alignItems: 'center', ...shadows.medium },
  introEmoji: { fontSize: 72 },
  introTitle: { color: '#fff', fontSize: typography.h2, fontWeight: typography.bold, marginTop: spacing.md },
  introCareer: { color: 'rgba(255,255,255,0.9)', fontSize: typography.body, marginTop: 4 },
  introBody: { color: colors.textSecondary, fontSize: typography.body, marginTop: spacing.xl, lineHeight: 22 },
  introList: { marginTop: spacing.lg, gap: spacing.sm },
  introRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  introIconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: `${colors.primary}22`, alignItems: 'center', justifyContent: 'center' },
  introRowText: { color: colors.textPrimary, fontSize: typography.bodySmall, flex: 1 },
  bigBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.md, borderRadius: borderRadius.md, ...shadows.medium },
  bigBtnText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.body },
  lecTitle: { color: colors.textPrimary, fontSize: typography.h2, fontWeight: typography.bold },
  lecStep: { color: colors.textMuted, fontSize: typography.caption, marginTop: 4, marginBottom: spacing.lg },
  lecCard: { backgroundColor: colors.card, padding: spacing.lg, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border },
  lecText: { color: colors.textPrimary, fontSize: typography.body, lineHeight: 24 },
  highlightCard: { padding: spacing.lg, borderRadius: borderRadius.lg, flexDirection: 'row', alignItems: 'center', gap: spacing.md, ...shadows.medium },
  highlightText: { color: '#fff', fontSize: typography.body, fontWeight: typography.semibold, flex: 1, lineHeight: 22 },
  mythCard: { backgroundColor: colors.card, padding: spacing.lg, borderRadius: borderRadius.md, borderLeftWidth: 4 },
  mythLabel: { color: colors.error, fontSize: typography.caption, fontWeight: typography.bold, letterSpacing: 1.2 },
  mythText: { color: colors.textPrimary, fontSize: typography.bodySmall, marginTop: 4, lineHeight: 20 },
  exHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  exType: { color: colors.primary, fontSize: typography.caption, fontWeight: typography.bold, letterSpacing: 1.5 },
  timerChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.card, paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: colors.border },
  timerText: { color: colors.warning, fontSize: typography.caption, fontWeight: typography.bold },
  exTitle: { color: colors.textPrimary, fontSize: typography.h2, fontWeight: typography.bold, marginTop: spacing.sm },
  exDesc: { color: colors.textSecondary, fontSize: typography.body, marginTop: spacing.sm, lineHeight: 22 },
  prioItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, padding: spacing.md, borderRadius: borderRadius.md, gap: spacing.md },
  rankBadge: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  rankText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.bodySmall },
  prioText: { color: colors.textPrimary, fontSize: typography.bodySmall, flex: 1 },
  miniBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.surfaceLight, alignItems: 'center', justifyContent: 'center' },
  feedbackCard: { backgroundColor: colors.card, padding: spacing.lg, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  feedbackTitle: { color: colors.accentGreen, fontSize: typography.body, fontWeight: typography.bold },
  feedbackText: { color: colors.textSecondary, fontSize: typography.bodySmall, marginTop: 6, lineHeight: 20 },
  optCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 2, borderColor: colors.border },
  optLetter: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.surfaceLight, alignItems: 'center', justifyContent: 'center' },
  optLetterText: { color: colors.textPrimary, fontWeight: typography.bold },
  optText: { color: colors.textPrimary, fontSize: typography.bodySmall, lineHeight: 20 },
  optFeedback: { color: colors.textSecondary, fontSize: typography.caption, marginTop: 4, fontStyle: 'italic' },
  optScore: { color: colors.accentGreen, fontWeight: typography.bold, fontSize: typography.body },
  summaryCircle: { width: Platform.OS === 'web' ? 130 : 160, height: Platform.OS === 'web' ? 130 : 160, borderRadius: Platform.OS === 'web' ? 65 : 80, alignItems: 'center', justifyContent: 'center', ...shadows.large, marginTop: spacing.xl },
  summaryScore: { color: '#fff', fontSize: Platform.OS === 'web' ? 44 : 56, fontWeight: typography.heavy },
  summarySubscore: { color: 'rgba(255,255,255,0.85)', fontSize: typography.body },
  summaryTitle: { color: colors.textPrimary, fontSize: typography.h2, fontWeight: typography.bold, marginTop: spacing.xl },
  summaryDesc: { color: colors.textSecondary, fontSize: typography.body, textAlign: 'center', marginTop: spacing.sm },
});
