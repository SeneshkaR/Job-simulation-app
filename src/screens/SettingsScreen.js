import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, SafeAreaView, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { useApp } from '../context/AppContext';

export default function SettingsScreen({ navigation }) {
  const { state, updateSettings, setUser } = useApp();
  const [apiKey, setApiKey] = useState(state.settings.openaiKey || '');
  const [showKey, setShowKey] = useState(false);

  const saveKey = () => {
    updateSettings({ openaiKey: apiKey.trim() });
    Alert.alert('Saved', apiKey.trim() ? 'API key updated. Your AI colleagues are now powered by OpenAI.' : 'API key removed. Using demo mode.');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSub}>Customize your Career Trial experience</Text>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.body}>
        {/* User profile */}
        <View style={styles.profileCard}>
          <LinearGradient colors={colors.gradientPrimary} style={styles.avatar}>
            <Text style={styles.avatarText}>{(state.user.name || 'U').charAt(0).toUpperCase()}</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>{state.user.name || 'Explorer'}</Text>
            <Text style={styles.profileMeta}>
              {state.user.age ? `Age ${state.user.age} · ` : ''}{state.user.ageGroup === 'teen' ? 'Teen (13-17)' : state.user.ageGroup === 'young-adult' ? 'Young Adult (18-24)' : state.user.ageGroup === 'adult' ? 'Adult (25+)' : 'Age group not set'}
            </Text>
            {state.user.email ? <Text style={styles.profileMeta}>{state.user.email}</Text> : null}
            <Text style={styles.profileMeta}>{state.user.completedTrials.length} trials completed</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
            <Ionicons name="create-outline" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <SectionTitle>AI Powered Chats</SectionTitle>
        <View style={styles.card}>
          <Text style={styles.label}>OpenAI API Key</Text>
          <Text style={styles.hint}>
            Paste your key to unlock real AI colleague conversations. Without a key, the app uses mock replies.
          </Text>
          <View style={styles.keyRow}>
            <TextInput
              style={styles.keyInput}
              value={apiKey}
              onChangeText={setApiKey}
              placeholder="sk-..."
              placeholderTextColor={colors.textMuted}
              secureTextEntry={!showKey}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity onPress={() => setShowKey(v => !v)} style={styles.eyeBtn}>
              <Ionicons name={showKey ? 'eye-off' : 'eye'} size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={saveKey} activeOpacity={0.9}>
            <LinearGradient colors={colors.gradientPrimary} style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>Save Key</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: state.settings.openaiKey ? colors.accentGreen : colors.textMuted }]} />
            <Text style={styles.statusText}>{state.settings.openaiKey ? 'Live AI mode active' : 'Demo mode (mock replies)'}</Text>
          </View>
        </View>

        <SectionTitle>Preferences</SectionTitle>
        <ToggleRow
          icon="notifications" label="Notifications"
          desc="Get pinged during Week Trials with realistic events"
          value={state.settings.notificationsEnabled}
          onChange={(v) => updateSettings({ notificationsEnabled: v })}
        />
        <ToggleRow
          icon="phone-portrait" label="Haptic Feedback"
          desc="Vibration on key actions"
          value={state.settings.hapticEnabled}
          onChange={(v) => updateSettings({ hapticEnabled: v })}
        />

        <SectionTitle>Your Journey</SectionTitle>
        <StatsRow
          rows={[
            { icon: 'trophy', color: colors.accentYellow, label: 'Trials completed', value: state.user.completedTrials.length },
            { icon: 'star', color: colors.accentGreen, label: 'Scores earned', value: state.scores.length },
            { icon: 'git-compare', color: colors.accent, label: 'Careers compared', value: state.comparisons.length },
          ]}
        />

        <SectionTitle>About</SectionTitle>
        <InfoRow icon="rocket" label="Career Trial" value="v1.0.0" />
        <InfoRow icon="mail" label="Support" value="support@careertrial.app" />
        <InfoRow icon="shield-checkmark" label="Privacy" value="Your data stays on your device" />

        <TouchableOpacity
          onPress={() => Alert.alert('Reset app?', 'This will delete your progress. Cannot be undone.', [
            { text: 'Cancel' },
            { text: 'Reset', style: 'destructive', onPress: () => {
              setUser({ name: '', ageGroup: null, interests: [], completedTrials: [], currentTrial: null });
              navigation.replace('Welcome');
            } },
          ])}
          style={styles.resetBtn}
        >
          <Ionicons name="refresh" size={18} color={colors.error} />
          <Text style={styles.resetText}>Reset Progress</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

function SectionTitle({ children }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}
function ToggleRow({ icon, label, desc, value, onChange }) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleIcon}><Ionicons name={icon} size={18} color={colors.primary} /></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.toggleLabel}>{label}</Text>
        <Text style={styles.toggleDesc}>{desc}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ true: colors.primary, false: colors.surfaceLight }}
        thumbColor="#fff"
      />
    </View>
  );
}
function StatsRow({ rows }) {
  return (
    <View style={styles.statsGroup}>
      {rows.map((r, i) => (
        <View key={i} style={[styles.statRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.border }]}>
          <View style={[styles.statIconBox, { backgroundColor: `${r.color}22` }]}>
            <Ionicons name={r.icon} size={16} color={r.color} />
          </View>
          <Text style={styles.statLabel}>{r.label}</Text>
          <Text style={styles.statValue}>{r.value}</Text>
        </View>
      ))}
    </View>
  );
}
function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={18} color={colors.textSecondary} />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.xxl, paddingTop: Platform.OS === 'web' ? 16 : spacing.lg, paddingBottom: spacing.sm },
  headerTitle: { color: colors.textPrimary, fontSize: typography.hero, fontWeight: typography.heavy },
  headerSub: { color: colors.textSecondary, fontSize: typography.body, marginTop: 2 },
  body: { paddingHorizontal: spacing.xxl, paddingBottom: 40 },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, marginTop: spacing.md },
  avatar: { width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: typography.h2, fontWeight: typography.bold },
  profileName: { color: colors.textPrimary, fontSize: typography.h3, fontWeight: typography.bold },
  profileMeta: { color: colors.textSecondary, fontSize: typography.caption, marginTop: 2 },
  sectionTitle: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.bold, letterSpacing: 1.2, marginTop: spacing.xl, marginBottom: spacing.sm },
  card: { backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  label: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.semibold },
  hint: { color: colors.textSecondary, fontSize: typography.caption, marginTop: 4, lineHeight: 18 },
  keyRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: borderRadius.md, marginTop: spacing.md, borderWidth: 1, borderColor: colors.border },
  keyInput: { flex: 1, color: colors.textPrimary, paddingHorizontal: spacing.md, paddingVertical: 10, fontSize: typography.bodySmall },
  eyeBtn: { padding: spacing.md },
  saveBtn: { paddingVertical: spacing.md, borderRadius: borderRadius.md, alignItems: 'center', marginTop: spacing.md, ...shadows.small },
  saveBtnText: { color: '#fff', fontWeight: typography.bold, fontSize: typography.body },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.md },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { color: colors.textSecondary, fontSize: typography.caption },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm },
  toggleIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: `${colors.primary}22`, alignItems: 'center', justifyContent: 'center' },
  toggleLabel: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.semibold },
  toggleDesc: { color: colors.textSecondary, fontSize: typography.caption, marginTop: 2 },
  statsGroup: { backgroundColor: colors.card, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  statRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.md },
  statIconBox: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  statLabel: { color: colors.textSecondary, fontSize: typography.bodySmall, flex: 1 },
  statValue: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.bold },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm },
  infoLabel: { color: colors.textPrimary, fontSize: typography.bodySmall, flex: 1 },
  infoValue: { color: colors.textSecondary, fontSize: typography.caption },
  resetBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: spacing.xl, padding: spacing.md },
  resetText: { color: colors.error, fontWeight: typography.semibold },
});
