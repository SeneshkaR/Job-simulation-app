import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Animated,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { spacing, typography, borderRadius, shadows } from '../theme';

export default function ColleagueChat({
  colleague,
  career,
  careerInsights,
  messages,
  onSend,
  typing,
  gradient,
  suggestedQuestions,
  onSuggestedPress,
  error,
  onRetry,
}) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const listRef = useRef(null);
  const [input, setInput] = useState('');

  const send = () => {
    const text = input.trim();
    if (!text || typing) return;
    onSend(text);
    setInput('');
  };

  useEffect(() => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages, typing]);

  const showInsights = careerInsights && messages.length <= 2;

  const renderItem = useCallback(({ item, index }) => {
    const isFirst = index === 0;
    return (
      <View>
        <Bubble msg={item} colleague={colleague} gradient={gradient} isFirst={isFirst} />
        {isFirst && showInsights && careerInsights && (
          <CareerInsightsCard insights={careerInsights} career={career} />
        )}
      </View>
    );
  }, [colleague, gradient, showInsights, careerInsights, career]);

  return (
    <View style={styles.container}>
      {/* Mentor badge in header area */}
      <View style={styles.badgeRow}>
        <LinearGradient colors={['#1a365d', '#2d4a7a']} style={styles.badge}>
          <Ionicons name="shield-checkmark" size={14} color="#FFD93D" />
          <Text style={styles.badgeText}>Senior Mentor</Text>
        </LinearGradient>
      </View>

      {/* Error banner */}
      {error && (
        <View style={styles.errorBanner}>
          <Ionicons name="alert-circle" size={16} color={colors.error} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={onRetry} style={styles.retryBtn}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={m => m.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        ListFooterComponent={
          typing ? (
            <TypingIndicator colleague={colleague} />
          ) : showSuggestedQuestions(suggestedQuestions, messages, typing) ? (
            <SuggestedQuestions questions={suggestedQuestions} onPress={onSuggestedPress} />
          ) : null
        }
      />

      {/* Input bar */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder={`Ask ${colleague.name.split(' ')[0]} anything...`}
          placeholderTextColor={colors.textMuted}
          multiline
          maxLength={3500}
          onSubmitEditing={send}
          blurOnSubmit={false}
        />
        <TouchableOpacity
          onPress={send}
          disabled={!input.trim() || typing}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={gradient}
            style={[styles.sendBtn, (!input.trim() || typing) && { opacity: 0.4 }]}
          >
            <Ionicons name="send" size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function showSuggestedQuestions(questions, messages, typing) {
  if (!questions || questions.length === 0) return false;
  if (typing) return false;
  const realMessages = messages.filter(m => m.id !== 'seed');
  return realMessages.length <= 1;
}

function Bubble({ msg, colleague, gradient, isFirst }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const isUser = msg.role === 'user';

  if (isUser) {
    return (
      <View style={[styles.bubbleRow, { justifyContent: 'flex-end' }]}>
        <LinearGradient colors={gradient} style={[styles.bubble, styles.userBubble]}>
          <Text style={styles.userText}>{msg.content}</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.bubbleRow}>
      <Text style={styles.avatar}>{colleague.avatar}</Text>
      <View style={[styles.bubble, styles.mentorBubble]}>
        <View style={styles.mentorHeader}>
          <Text style={styles.mentorName}>{colleague.name}</Text>
          <LinearGradient colors={['#1a365d', '#2d4a7a']} style={styles.miniBadge}>
            <Text style={styles.miniBadgeText}>Senior</Text>
          </LinearGradient>
        </View>
        <Text style={styles.mentorText}>{msg.content}</Text>
      </View>
    </View>
  );
}

function TypingIndicator({ colleague }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.typingRow}>
      <Text style={styles.avatar}>{colleague.avatar}</Text>
      <View style={styles.typingBubble}>
        <View style={styles.dots}>
          <Dot delay={0} />
          <Dot delay={200} />
          <Dot delay={400} />
        </View>
        <Text style={styles.typingText}>{colleague.name.split(' ')[0]} is thinking...</Text>
      </View>
    </View>
  );
}

function Dot({ delay }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 300, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  return <Animated.View style={[styles.dot, { opacity }]} />;
}

function CareerInsightsCard({ insights, career }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [expanded, setExpanded] = useState(false);

  if (!insights) return null;

  return (
    <Pressable onPress={() => setExpanded(!expanded)} style={styles.insightsCard}>
      <View style={styles.insightsHeader}>
        <Ionicons name="trending-up" size={16} color={colors.accent} />
        <Text style={styles.insightsTitle}>Market Insights: {career?.title}</Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={colors.textSecondary}
        />
      </View>

      <View style={styles.insightsStats}>
        <StatItem icon="briefcase" value={insights.jobCount} label="Open Jobs" />
        <StatItem icon="location" value={insights.topLocations?.length || 0} label="Locations" />
        <StatItem icon="code-slash" value={insights.topSkills?.length || 0} label="Skills" />
      </View>

      {expanded && (
        <View style={styles.insightsDetails}>
          {insights.topSkills?.length > 0 && (
            <View style={styles.insightsSection}>
              <Text style={styles.insightsLabel}>Top Skills in Demand</Text>
              <View style={styles.tagRow}>
                {insights.topSkills.slice(0, 8).map((skill, i) => (
                  <View key={i} style={styles.tag}>
                    <Text style={styles.tagText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {insights.topLocations?.length > 0 && (
            <View style={styles.insightsSection}>
              <Text style={styles.insightsLabel}>Top Locations</Text>
              <View style={styles.tagRow}>
                {insights.topLocations.slice(0, 5).map((loc, i) => (
                  <View key={i} style={[styles.tag, styles.tagSecondary]}>
                    <Text style={styles.tagTextSecondary}>{loc}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {insights.recentJobs?.length > 0 && (
            <View style={styles.insightsSection}>
              <Text style={styles.insightsLabel}>Recent Openings</Text>
              {insights.recentJobs.slice(0, 3).map((job, i) => (
                <View key={i} style={styles.jobRow}>
                  <Ionicons name="briefcase-outline" size={12} color={colors.textSecondary} />
                  <Text style={styles.jobText}>{job.title}</Text>
                  <Text style={styles.jobCompany}>{job.company}</Text>
                </View>
              ))}
            </View>
          )}

          <Text style={styles.insightsTimestamp}>
            Updated {new Date(insights.fetched_at).toLocaleDateString()}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

function StatItem({ icon, value, label }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.statItem}>
      <Ionicons name={icon} size={14} color={colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function SuggestedQuestions({ questions, onPress }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  if (!questions || questions.length === 0) return null;

  return (
    <View style={styles.suggestedContainer}>
      <Text style={styles.suggestedLabel}>Suggested questions</Text>
      {questions.map((q, i) => (
        <TouchableOpacity
          key={i}
          style={styles.suggestedBtn}
          onPress={() => onPress(q)}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={14} color={colors.primary} />
          <Text style={styles.suggestedText}>{q}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1 },

  badgeRow: { alignItems: 'center', paddingVertical: spacing.sm, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#FFD93D', fontSize: typography.caption, fontWeight: typography.semibold },

  errorBanner: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,77,106,0.1)', paddingHorizontal: spacing.md, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,77,106,0.2)' },
  errorText: { color: colors.error, fontSize: typography.caption, flex: 1 },
  retryBtn: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: 'rgba(255,77,106,0.2)' },
  retryText: { color: colors.error, fontSize: typography.caption, fontWeight: typography.semibold },

  list: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },

  bubbleRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginBottom: spacing.sm },
  bubble: { padding: spacing.md, borderRadius: borderRadius.lg, maxWidth: '80%' },
  avatar: { fontSize: 24, marginBottom: 2 },

  userBubble: { borderBottomRightRadius: 4, ...shadows.small },
  userText: { color: '#fff', fontSize: typography.bodySmall, lineHeight: 20 },

  mentorBubble: { backgroundColor: colors.card, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: colors.border },
  mentorHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  mentorName: { color: colors.textSecondary, fontSize: typography.caption, fontWeight: typography.semibold },
  miniBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  miniBadgeText: { color: '#FFD93D', fontSize: typography.tiny, fontWeight: typography.bold },
  mentorText: { color: colors.textPrimary, fontSize: typography.bodySmall, lineHeight: 21 },

  typingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  typingBubble: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: 10, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  dots: { flexDirection: 'row', gap: 3 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.textSecondary },
  typingText: { color: colors.textSecondary, fontSize: typography.caption },

  insightsCard: { backgroundColor: colors.card, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginHorizontal: 40, marginTop: spacing.sm, padding: spacing.md },
  insightsHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  insightsTitle: { flex: 1, color: colors.textPrimary, fontSize: typography.bodySmall, fontWeight: typography.semibold },
  insightsStats: { flexDirection: 'row', justifyContent: 'space-around', marginTop: spacing.sm, paddingVertical: spacing.sm, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
  statItem: { alignItems: 'center', gap: 2 },
  statValue: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.bold },
  statLabel: { color: colors.textSecondary, fontSize: typography.tiny },

  insightsDetails: { marginTop: spacing.sm },
  insightsSection: { marginBottom: spacing.sm },
  insightsLabel: { color: colors.textSecondary, fontSize: typography.caption, fontWeight: typography.semibold, marginBottom: 4 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  tag: { backgroundColor: 'rgba(108,99,255,0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  tagText: { color: colors.primary, fontSize: typography.caption },
  tagSecondary: { backgroundColor: 'rgba(0,217,255,0.12)' },
  tagTextSecondary: { color: colors.accent },

  jobRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 3 },
  jobText: { color: colors.textPrimary, fontSize: typography.caption, flex: 1 },
  jobCompany: { color: colors.textSecondary, fontSize: typography.caption },
  insightsTimestamp: { color: colors.textMuted, fontSize: typography.tiny, marginTop: spacing.sm, textAlign: 'center' },

  suggestedContainer: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  suggestedLabel: { color: colors.textMuted, fontSize: typography.caption, marginBottom: spacing.sm, fontWeight: typography.medium },
  suggestedBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, paddingHorizontal: spacing.md, paddingVertical: 10, marginBottom: spacing.sm },
  suggestedText: { color: colors.textPrimary, fontSize: typography.bodySmall, flex: 1 },

  inputBar: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, paddingBottom: Platform.OS === 'web' ? 12 : 30, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  input: { flex: 1, backgroundColor: colors.card, borderRadius: borderRadius.lg, paddingHorizontal: spacing.md, paddingVertical: Platform.OS === 'ios' ? 12 : 8, color: colors.textPrimary, fontSize: typography.bodySmall, maxHeight: 100, borderWidth: 1, borderColor: colors.border },
  sendBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', ...shadows.medium },
});
