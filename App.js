import React, { useEffect } from 'react';
import { Platform, View, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

// On web, the app is designed for mobile viewports. On desktop we center the
// content inside a phone-shaped frame so the UI still feels intentional.
const isWeb = Platform.OS === 'web';

export default function App() {
  useEffect(() => {
    if (!isWeb || typeof document === 'undefined') return;
    document.title = 'Career Trial — Try Before You Choose';
    document.body.style.margin = '0';
    document.body.style.background = 'linear-gradient(135deg, #0A0B18 0%, #1A1B2E 100%)';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.fontFamily =
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  }, []);

  const inner = (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppProvider>
          <StatusBar style="light" />
          <AppNavigator />
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );

  if (!isWeb) return inner;
  return <WebFrame>{inner}</WebFrame>;
}

/**
 * On desktop widths, wrap the mobile app in a centered phone frame so it looks
 * intentional. On narrow screens (< 640px) it fills the viewport.
 */
function WebFrame({ children }) {
  const [dims, setDims] = React.useState(() => Dimensions.get('window'));

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => setDims(window));
    return () => sub?.remove?.();
  }, []);

  const compact = dims.width < 640;

  if (compact) {
    return <View style={styles.fullBleed}>{children}</View>;
  }

  return (
    <View style={styles.desktopWrap}>
      <View style={styles.brandBlock}>
        <div style={brandStyle.title}>Career Trial</div>
        <div style={brandStyle.tagline}>
          Try before you choose. Live a real workday as 10 different professionals.
        </div>
        <div style={brandStyle.small}>Tip: resize your browser or open on mobile for the full experience.</div>
      </View>
      <View style={styles.frame}>
        <View style={styles.notch} />
        <View style={styles.screen}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullBleed: { flex: 1, height: '100vh', width: '100vw' },
  desktopWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 60,
    height: '100vh',
    width: '100vw',
    padding: 20,
  },
  brandBlock: { maxWidth: 380 },
  frame: {
    width: 400,
    height: 820,
    maxHeight: '95vh',
    borderRadius: 44,
    backgroundColor: '#0F1023',
    borderWidth: 8,
    borderColor: '#0A0B18',
    overflow: 'hidden',
    boxShadow: '0 30px 60px -20px rgba(108, 99, 255, 0.4), 0 0 0 1px rgba(255,255,255,0.05)',
    position: 'relative',
  },
  notch: {
    position: 'absolute',
    top: 6,
    left: '50%',
    marginLeft: -60,
    width: 120,
    height: 22,
    backgroundColor: '#0A0B18',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    zIndex: 10,
  },
  screen: { flex: 1, borderRadius: 36, overflow: 'hidden' },
});

const brandStyle = {
  title: {
    fontSize: 48,
    fontWeight: 800,
    color: '#fff',
    background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: 1.1,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 18,
    color: '#A8A8C8',
    lineHeight: 1.5,
    marginBottom: 24,
  },
  small: { fontSize: 13, color: '#6B6B8A' },
};
