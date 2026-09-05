import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../theme/ThemeContext';
import { borderRadius, spacing, typography } from '../theme';

export default function RegisteredTrialGuard({ component: TrialComponent, ...screenProps }) {
  const { isAuthenticated } = useAuth();
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { navigation } = screenProps;

  if (isAuthenticated) {
    return <TrialComponent {...screenProps} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.lockCircle}>
          <Ionicons name="lock-closed" size={42} color={colors.primary} />
        </View>
        <Text style={styles.title}>Unlock longer trials</Text>
        <Text style={styles.description}>
          Explore mode is limited to 15-minute trials. Register or sign in to use Day and Week trials and save all progress to your account.
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.85} style={styles.fullWidth}>
          <LinearGradient colors={colors.gradientPrimary} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Login / Register</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Back to 15-minute trial</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.xl },
  backButton: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  lockCircle: { width: 92, height: 92, borderRadius: 46, alignItems: 'center', justifyContent: 'center', backgroundColor: `${colors.primary}18`, marginBottom: spacing.xl },
  title: { color: colors.textPrimary, fontSize: typography.h1, fontWeight: typography.bold, textAlign: 'center' },
  description: { color: colors.textSecondary, fontSize: typography.body, lineHeight: 23, textAlign: 'center', marginTop: spacing.md, marginBottom: spacing.xxl },
  fullWidth: { width: '100%' },
  primaryButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.lg, borderRadius: borderRadius.round },
  primaryButtonText: { color: '#fff', fontSize: typography.body, fontWeight: typography.bold },
  secondaryButton: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg, marginTop: spacing.md },
  secondaryButtonText: { color: colors.primary, fontSize: typography.bodySmall, fontWeight: typography.semibold },
});
