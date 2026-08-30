import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, careerColors } from '../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { useApp } from '../context/AppContext';
import { getCareerById } from '../data/careers';
import { chatWithColleague } from '../services/aiService';

export default function ChatScreen({ route, navigation }) {
  const { careerId, colleagueId, context } = route.params;
  const career = getCareerById(careerId);
  const colleague = career?.colleagues.find(c => c.id === colleagueId) || career?.colleagues[0];
  const { state } = useApp();
  const listRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 'seed',
      role: 'assistant',
      content: greetingFor(colleague, context),
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  if (!career || !colleague) return null;
  const grad = careerColors[career.id]?.gradient || colors.gradientPrimary;

  const send = async () => {
    const text = input.trim();
    if (!text || typing) return;

    const userMsg = { id: `u-${Date.now()}`, role: 'user', content: text, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    try {
      const history = [...messages, userMsg]
        .filter(m => m.id !== 'seed')
        .map(m => ({ role: m.role, content: m.content }));
      const reply = await chatWithColleague(state.settings.openaiKey, colleague, history, text, {
        careerTitle: career.title,
        currentTask: context?.task || context?.situation,
        trialType: state.trials.active?.trialType,
      });
      setMessages(prev => [...prev, { id: `a-${Date.now()}`, role: 'assistant', content: reply, timestamp: new Date().toISOString() }]);
    } catch (e) {
      setMessages(prev => [...prev, { id: `a-${Date.now()}`, role: 'assistant', content: 'Sorry, connection got weird. Try again?', timestamp: new Date().toISOString() }]);
    } finally {
      setTyping(false);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <LinearGradient colors={grad} style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={styles.headerNameRow}>
                <Text style={styles.headerAvatar}>{colleague.avatar}</Text>
                <View>
                  <Text style={styles.headerName}>{colleague.name}</Text>
                  <Text style={styles.headerRole}>{colleague.role} • Online</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {!state.settings.openaiKey && (
        <View style={styles.mockBanner}>
          <Ionicons name="information-circle" size={16} color={colors.warning} />
          <Text style={styles.mockText}>Demo mode — add your OpenAI key in Settings for real AI chats</Text>
        </View>
      )}

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={m => m.id}
        renderItem={({ item }) => <Bubble msg={item} colleague={colleague} grad={grad} />}
        contentContainerStyle={styles.list}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
      />

      {typing && (
        <View style={styles.typingRow}>
          <Text style={styles.typingAvatar}>{colleague.avatar}</Text>
          <View style={styles.typingBubble}>
            <ActivityIndicator size="small" color={colors.textSecondary} />
            <Text style={styles.typingText}>{colleague.name.split(' ')[0]} is typing…</Text>
          </View>
        </View>
      )}

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder={`Message ${colleague.name.split(' ')[0]}...`}
          placeholderTextColor={colors.textMuted}
          multiline
          maxLength={500}
        />
        <TouchableOpacity onPress={send} disabled={!input.trim() || typing} activeOpacity={0.85}>
          <LinearGradient colors={grad} style={[styles.sendBtn, (!input.trim() || typing) && { opacity: 0.5 }]}>
            <Ionicons name="send" size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function greetingFor(colleague, context) {
  if (context?.situation) return `Hey! Saw you got that ${context.situation}. What are you thinking?`;
  if (context?.task) return `Hey! You working on ${context.task}? Ping me if you get stuck.`;
  return `Hey, I'm ${colleague.name.split(' ')[0]}. Ask me anything about what we do here!`;
}

function Bubble({ msg, colleague, grad }) {
  const isUser = msg.role === 'user';
  if (isUser) {
    return (
      <View style={[styles.bubbleRow, { justifyContent: 'flex-end' }]}>
        <LinearGradient colors={grad} style={[styles.bubble, styles.userBubble]}>
          <Text style={styles.userBubbleText}>{msg.content}</Text>
        </LinearGradient>
      </View>
    );
  }
  return (
    <View style={styles.bubbleRow}>
      <Text style={styles.bubbleAvatar}>{colleague.avatar}</Text>
      <View style={[styles.bubble, styles.assistantBubble]}>
        <Text style={styles.assistantText}>{msg.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingBottom: spacing.md, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: 10 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' },
  headerNameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headerAvatar: { fontSize: 32 },
  headerName: { color: '#fff', fontSize: typography.body, fontWeight: typography.bold },
  headerRole: { color: 'rgba(255,255,255,0.85)', fontSize: typography.caption, marginTop: 2 },
  mockBanner: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,217,61,0.12)', paddingHorizontal: spacing.md, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,217,61,0.2)' },
  mockText: { color: colors.warning, fontSize: typography.caption, flex: 1 },
  list: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  bubbleRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginBottom: spacing.sm },
  bubble: { padding: spacing.md, borderRadius: borderRadius.lg, maxWidth: '78%' },
  userBubble: { borderBottomRightRadius: 4, ...shadows.small },
  assistantBubble: { backgroundColor: colors.card, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: colors.border },
  userBubbleText: { color: '#fff', fontSize: typography.bodySmall, lineHeight: 20 },
  assistantText: { color: colors.textPrimary, fontSize: typography.bodySmall, lineHeight: 20 },
  bubbleAvatar: { fontSize: 24, marginBottom: 2 },
  typingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  typingAvatar: { fontSize: 20 },
  typingBubble: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  typingText: { color: colors.textSecondary, fontSize: typography.caption },
  inputBar: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, paddingBottom: 30, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  input: { flex: 1, backgroundColor: colors.card, borderRadius: borderRadius.lg, paddingHorizontal: spacing.md, paddingVertical: Platform.OS === 'ios' ? 12 : 8, color: colors.textPrimary, fontSize: typography.bodySmall, maxHeight: 100, borderWidth: 1, borderColor: colors.border },
  sendBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', ...shadows.medium },
});
