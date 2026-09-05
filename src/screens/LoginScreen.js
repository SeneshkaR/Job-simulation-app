import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { spacing, typography, borderRadius } from '../theme';
import { useAuth } from '../context/AuthContext';
import { loadPersistedStateForUser } from '../context/AppContext';

export default function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { loginWithEmail, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateAfterAuth = async (uid) => {
    const savedState = await loadPersistedStateForUser(uid);
    const hasCompletedOnboarding = savedState?.user?.hasCompletedOnboarding;
    navigation.replace(hasCompletedOnboarding ? 'Main' : 'Onboarding');
  };

  const handleEmailLogin = async () => {
    setLoading(true);
    clearError();
    try {
      const sessionUser = await loginWithEmail(email.trim(), password);
      await navigateAfterAuth(sessionUser?.uid);
    } catch {
      // Error is handled by AuthContext.
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = email.trim().length > 0 && password.length > 0;

  return (
    <LinearGradient colors={colors.gradientBackground} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back button */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logoEmoji}>🎯</Text>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>Welcome back to Career Trial</Text>
          </View>

          {/* Error message */}
          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={18} color={colors.error} />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity onPress={clearError}>
                <Ionicons name="close" size={18} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
          )}

          {/* Email / password form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={colors.textMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.signInButton, !canSubmit && styles.signInButtonDisabled]}
              onPress={handleEmailLogin}
              disabled={!canSubmit || loading}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={colors.gradientPrimary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.signInButtonGradient}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.signInButtonText}>Sign In</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <Text style={styles.localNote}>Your account and progress are stored locally on this device.</Text>

          {/* Register link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.xxl,
    paddingTop: Platform.OS === 'web' ? 40 : 60,
    paddingBottom: 40,
    flexGrow: 1,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.surfaceLight, alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  header: { alignItems: 'center', marginBottom: spacing.xxxl },
  logoEmoji: { fontSize: 48, marginBottom: spacing.md },
  title: { fontSize: typography.h1, fontWeight: typography.bold, color: colors.textPrimary },
  subtitle: { fontSize: typography.body, color: colors.textSecondary, marginTop: spacing.xs, textAlign: 'center' },
  form: { gap: spacing.lg, marginBottom: spacing.lg },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface,
    borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.lg, height: 52,
  },
  inputIcon: { marginRight: spacing.md },
  input: { flex: 1, color: colors.textPrimary, fontSize: typography.body, paddingVertical: 0, height: '100%' },
  eyeButton: { padding: spacing.xs },
  signInButton: { borderRadius: borderRadius.round, overflow: 'hidden', marginTop: spacing.sm },
  signInButtonDisabled: { opacity: 0.5 },
  signInButtonGradient: {
    alignItems: 'center', justifyContent: 'center',
    paddingVertical: spacing.lg, height: 52,
  },
  signInButtonText: { color: '#fff', fontSize: typography.h3, fontWeight: typography.bold },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.xl },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { color: colors.textMuted, fontSize: typography.bodySmall, marginHorizontal: spacing.lg },
  googleButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.surface, borderRadius: borderRadius.round,
    borderWidth: 1, borderColor: colors.border, paddingVertical: spacing.lg, height: 52, gap: spacing.md,
  },
  googleIcon: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  googleIconText: { fontSize: 14, fontWeight: typography.bold, color: '#4285F4' },
  googleButtonText: { color: colors.textPrimary, fontSize: typography.body, fontWeight: typography.semibold },
  localNote: { color: colors.textMuted, fontSize: typography.caption, textAlign: 'center', marginTop: spacing.md },
  registerContainer: {
    flexDirection: 'row', justifyContent: 'center',
    marginTop: spacing.xl,
  },
  registerText: { color: colors.textSecondary, fontSize: typography.bodySmall },
  registerLink: { color: colors.primary, fontSize: typography.bodySmall, fontWeight: typography.semibold },
  guestButton: { alignItems: 'center', marginTop: spacing.lg, paddingVertical: spacing.md },
  guestButtonText: { color: colors.textMuted, fontSize: typography.bodySmall },
  errorContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 77, 106, 0.1)',
    borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.lg, gap: spacing.sm,
  },
  errorText: { flex: 1, color: colors.error, fontSize: typography.bodySmall },
});
