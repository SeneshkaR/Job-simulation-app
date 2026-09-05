import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { careerColors } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import { spacing, typography, borderRadius } from '../theme';
import { useApp } from '../context/AppContext';
import { getCareerById } from '../data/careers';
// FIX (Bug #7): chatWithColleague no longer takes openaiKey as first param
import { chatWithColleague, getCareerInsights } from '../services/aiService';
import ColleagueChat from '../components/ColleagueChat';

export default function ChatScreen({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { careerId, colleagueId, context } = route.params;
  const career = getCareerById(careerId);
  const colleague = career?.colleagues.find(c => c.id === colleagueId) || career?.colleagues[0];
  const { state } = useApp();

  const [messages, setMessages] = useState([
    {
      id: 'seed',
      role: 'assistant',
      content: greetingFor(colleague, context),
      timestamp: new Date().toISOString(),
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState(null);
  const [careerInsights, setCareerInsights] = useState(null);

  const grad = careerColors[careerId]?.gradient || colors.gradientPrimary;

  // Fetch career insights on mount
  useEffect(() => {
    if (career) {
      getCareerInsights(career.title)
        .then((insights) => {
          if (insights && insights.jobCount > 0) {
            setCareerInsights(insights);
          }
        })
        .catch((err) => {
          console.warn('[ChatScreen] Career insights failed:', err.message);
        });
    }
  }, [careerId]);

  const suggestedQuestions = getSuggestedQuestions(career, careerInsights);

  const handleSend = useCallback(async (text) => {
    setError(null);
    const userMsg = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    try {
      const history = [...messages, userMsg]
        .filter(m => m.id !== 'seed')
        .map(m => ({ role: m.role, content: m.content }));

      // FIX (Bug #7): Removed state.settings.openaiKey — it was never sent to server
      const reply = await chatWithColleague(
        colleague,
        history,
        text,
        {
          careerTitle: career.title,
          currentTask: context?.task || context?.situation,
          trialType: state.trials.active?.trialType,
        }
      );

      setMessages(prev => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: reply?.content || reply || 'I had a thought but lost it — can you ask again?',
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (e) {
      const msg = e?.message || '';
      // Show the actual error message so user can debug
      if (msg.includes('Rate limit')) {
        setError('Rate limit reached — give me a moment to think!');
      } else if (msg.includes('log in')) {
        setError('Please log in to chat with your colleague.');
      } else if (msg.includes('not configured') || msg.includes('not set up')) {
        setError('AI is not configured on the server. Check server/.env for API keys.');
      } else if (msg.includes('Server needs setup')) {
        setError('Server needs Firebase or dev bypass configured. Check server/.env.');
      } else if (msg.includes('Network request failed') || msg.includes('fetch')) {
        setError('Cannot reach the server. Make sure the backend is running on localhost:3000.');
      } else {
        // Show the real error so it's debuggable
        setError(msg || 'Connection issue. Try again?');
      }
    } finally {
      setTyping(false);
    }
  }, [messages, colleague, career, context, state]);

  const handleSuggestedPress = useCallback((question) => {
    handleSend(question);
  }, [handleSend]);

  const handleRetry = useCallback(() => {
    setError(null);
  }, []);

  if (!career || !colleague) return null;

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
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => {
                if (career) {
                  getCareerInsights(career.title)
                    .then((insights) => {
                      if (insights && insights.jobCount > 0) {
                        setCareerInsights(insights);
                      }
                    })
                    .catch(() => {});
                }
              }}
            >
              <Ionicons name="refresh" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ColleagueChat
        colleague={colleague}
        career={career}
        careerInsights={careerInsights}
        messages={messages}
        onSend={handleSend}
        typing={typing}
        gradient={grad}
        suggestedQuestions={suggestedQuestions}
        onSuggestedPress={handleSuggestedPress}
        error={error}
        onRetry={handleRetry}
      />
    </KeyboardAvoidingView>
  );
}

function greetingFor(colleague, context) {
  if (context?.situation) return `Hey! I heard about the ${context.situation}. Let's talk through it — what's your first instinct?`;
  if (context?.task) return `Hey! Working on ${context.task}? I've done this a hundred times. Let me know where you're at and I'll guide you.`;
  return `Hey, I'm ${colleague.name.split(' ')[0]}. I've been doing this for over 15 years, so ask me anything about the real day-to-day work. What do you want to know?`;
}

function getSuggestedQuestions(career, insights) {
  const base = [
    `What does a typical day look like as a ${career?.title || 'professional'}?`,
    'What skills matter most in this career right now?',
    'What I wish I knew when I started?',
    'How do salaries compare for different experience levels?',
  ];

  if (insights?.topSkills?.length > 0) {
    const topSkill = insights.topSkills[0];
    base.splice(1, 0, `How important is ${topSkill} in the current market?`);
  }

  return base.slice(0, 4);
}

const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingBottom: spacing.md, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: 10 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' },
  headerNameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headerAvatar: { fontSize: 32 },
  headerName: { color: '#fff', fontSize: typography.body, fontWeight: typography.bold },
  headerRole: { color: 'rgba(255,255,255,0.85)', fontSize: typography.caption, marginTop: 2 },
});
