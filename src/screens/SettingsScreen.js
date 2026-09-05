import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, SafeAreaView, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { spacing, typography, borderRadius } from '../theme';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen({ navigation }) {
  const { state, updateSettings, setUser } = useApp();
  const { user: authUser, isAuthenticated, isGuest, logout } = useAuth();
  const { colors, theme, toggleTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  // FIX (Bug #9): The OpenAI key in Settings was NEVER sent to the server.
  // It only set local app state. The server uses its own MULERUN_API_KEY or OPENAI_API_KEY
  // from server/.env. This section is now informational only.
  const displayName = authUser?.displayName || authUser?.name || state.user.name || 'Explorer';
  const displayEmail = authUser?.email || state.user.email || '';
  const initials = (displayName || 'U').charAt(0).toUpperCase();

  const themeLabel = theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System';
  const themeIcon = theme === 'light' ? 'sunny-outline' : theme === 'dark' ? 'moon-outline' : 'contrast-outline';

  const handleLogout = () => {
    Alert.alert('Leave this session?', isGuest ? 'Return to the welcome screen?' : 'Your progress is saved locally and will be restored next time you sign in.', [
      { text: 'Cancel' },
      {
        text: isGuest ? 'Leave Explore' : 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          // Navigate to the root Stack navigator to access Welcome screen
          const rootNavigation = navigation.getParent();
          if (rootNavigation) {
            rootNavigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
          } else {
            // Fallback if getParent() doesn't work
            navigation.navigate('Welcome');
          }
        },
      },
    ]);
  };

  const accountLabel = isGuest ? 'Guest' : isAuthenticated ? 'Signed In' : 'Not Signed In';
  const accountColor = isGuest ? colors.accentYellow : isAuthenticated ? colors.accentGreen : colors.textMuted;

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSub}>Manage your account and preferences</Text>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.body}>
        {/* User profile */}
        <View style={styles.profileCard}>
          <LinearGradient colors={colors.gradientPrimary} style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>{displayName}</Text>
            {displayEmail ? <Text style={styles.profileMeta}>{displayEmail}</Text> : null}
            <View style={styles.accountBadge}>
              <View style={[styles.accountDot, { backgroundColor: accountColor }]} />
              <Text style={[styles.accountBadgeText, { color: accountColor }]}>{accountLabel}</Text>
            </View>
            <Text style={styles.profileMeta}>
              {state.user.age ? `Age ${state.user.age} · ` : ''}{state.user.ageGroup === 'teen' ? 'Teen (13-17)' : state.user.ageGroup === 'young-adult' ? 'Young Adult (18-24)' : state.user.ageGroup === 'adult' ? 'Adult (25+)' : 'Age group not set'}
            </Text>
            <Text style={styles.profileMeta}>{state.user.completedTrials.length} trials completed</Text>
          </View>
          {isAuthenticated && (
            <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
              <Ionicons name="create-outline" size={22} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Theme toggle */}
        <SectionTitle colors={colors}>Appearance</SectionTitle>
        <View style={styles.card}>
          <View style={styles.themeRow}>
            <View style={[styles.themeIconBox, { backgroundColor: `${colors.primary}22` }]}>
              <Ionicons name={themeIcon} size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Theme</Text>
              <Text style={styles.hint}>Choose light, dark, or follow your device.</Text>
            </View>
            <TouchableOpacity onPress={toggleTheme} activeOpacity={0.85} style={styles.themeBtn}>
              <Text style={styles.themeBtnText}>{themeLabel}</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Local account controls */}
        <SectionTitle colors={colors}>Account</SectionTitle>
        {isAuthenticated ? (
          <TouchableOpacity onPress={handleLogout} style={styles.authButton}>
            <Ionicons name="log-out-outline" size={20} color={colors.error} />
            <Text style={styles.authButtonText}>Sign Out</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.authButtons}>
            <Text style={styles.guestLimitText}>Explore mode: 15-minute trials only</Text>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Ionicons name="log-in-outline" size={20} color="#fff" />
              <Text style={styles.signInButtonText}>Login / Register</Text>
            </TouchableOpacity>
            {isGuest && (
              <TouchableOpacity style={styles.guestButton} onPress={handleLogout}>
                <Text style={styles.guestButtonText}>Leave Explore</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* FIX (Bug #9): This section no longer has a fake API key input.
            The server handles AI keys via server/.env — not from the app. */}
        <SectionTitle colors={colors}>AI Powered Chats</SectionTitle>
        <View style={styles.card}>
          <Text style={styles.label}>AI Conversations</Text>
          <Text style={styles.hint}>
            AI colleagues are powered by the server backend. The server uses its own API key
            (MuleRun or OpenAI) configured in server/.env. If chats show errors, ask the
            developer to check the server configuration.
          </Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: colors.accentGreen }]} />
            <Text style={styles.statusText}>Server-managed AI</Text>
          </View>
        </View>

        <SectionTitle colors={colors}>Preferences</SectionTitle>
        <ToggleRow
          icon="notifications" label="Notifications"
          desc="Get pinged during Week Trials with realistic events"
          value={state.settings.notificationsEnabled}
          onChange={(v) => updateSettings({ notificationsEnabled: v })}
          colors={colors}
        />
        <ToggleRow
          icon="phone-portrait" label="Haptic Feedback"
          desc="Vibration on key actions"
          value={state.settings.hapticEnabled}
          onChange={(v) => updateSettings({ hapticEnabled: v })}
          colors={colors}
        />

        <SectionTitle colors={colors}>Your Journey</SectionTitle>
        <StatsRow
          rows={[
            { icon: 'trophy', color: colors.accentYellow, label: 'Trials completed', value: state.user.completedTrials.length },
            { icon: 'star', color: colors.accentGreen, label: 'Scores earned', value: state.scores.length },
            { icon: 'git-compare', color: colors.accent, label: 'Careers compared', value: state.comparisons.length },
          ]}
          colors={colors}
        />

        <SectionTitle colors={colors}>About</SectionTitle>
        <InfoRow icon="rocket" label="Career Trial" value="v1.0.0" colors={colors} />
        <InfoRow icon="mail" label="Support" value="support@careertrial.app" colors={colors} />
        <InfoRow icon="shield-checkmark" label="Privacy" value="Your data stays on your device" colors={colors} />
        <InfoRow icon="server-outline" label="Account database" value="On-device local storage" colors={colors} />

        <TouchableOpacity
          onPress={() => Alert.alert('Reset app?', 'This will delete your progress. Cannot be undone.', [
            { text: 'Cancel' },
            { text: 'Reset', style: 'destructive', onPress: () => {
              setUser({ name: '', firstName: '', lastName: '', gender: null, ageGroup: null, interests: [], completedTrials: [], currentTrial: null });
              // Navigate to the root Stack navigator to access Welcome screen
              const rootNavigation = navigation.getParent();
              if (rootNavigation) {
                rootNavigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
              } else {
                navigation.navigate('Welcome');
              }
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

function SectionTitle({ children, colors }) {
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return <Text style={styles.sectionTitle}>{children}</Text>;
}
function ToggleRow({ icon, label, desc, value, onChange, colors }) {
  const styles = useMemo(() => makeStyles(colors), [colors]);
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
function StatsRow({ rows, colors }) {
  const styles = useMemo(() => makeStyles(colors), [colors]);
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
function InfoRow({ icon, label, value, colors }) {
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={18} color={colors.textSecondary} />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const makeStyles = (colors) => StyleSheet.create({
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
  accountBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, alignSelf: 'flex-start' },
  accountDot: { width: 6, height: 6, borderRadius: 3 },
  accountBadgeText: { fontSize: typography.tiny, fontWeight: typography.bold },
  sectionTitle: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.bold, letterSpacing: 1.2, marginTop: spacing.xl, marginBottom: spacing.sm },
  card: { backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  label: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.semibold },
  hint: { color: colors.textSecondary, fontSize: typography.caption, marginTop: 4, lineHeight: 18 },
  themeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  themeIconBox: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  themeBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.surfaceLight, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.round },
  themeBtnText: { color: colors.primary, fontWeight: typography.bold, fontSize: typography.bodySmall },
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
  authButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  authButtonText: { color: colors.error, fontSize: typography.body, fontWeight: typography.semibold },
  authButtons: { gap: spacing.sm },
  guestLimitText: { color: colors.textSecondary, fontSize: typography.bodySmall, textAlign: 'center', marginBottom: spacing.xs },
  signInButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.primary, padding: spacing.md, borderRadius: borderRadius.md },
  signInButtonText: { color: '#fff', fontSize: typography.body, fontWeight: typography.bold },
  registerButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceLight, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  registerButtonText: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.semibold },
  guestButton: { alignItems: 'center', paddingVertical: spacing.sm },
  guestButtonText: { color: colors.textMuted, fontSize: typography.bodySmall },
});
