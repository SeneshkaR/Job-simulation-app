import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import CareerListScreen from '../screens/CareerListScreen';
import CareerDetailScreen from '../screens/CareerDetailScreen';
import TrialSelectionScreen from '../screens/TrialSelectionScreen';
import QuickTrialScreen from '../screens/trial/QuickTrialScreen';
import DayTrialScreen from '../screens/trial/DayTrialScreen';
import WeekTrialScreen from '../screens/trial/WeekTrialScreen';
import ChatScreen from '../screens/ChatScreen';
import MeetingScreen from '../screens/MeetingScreen';
import ScoreScreen from '../screens/ScoreScreen';
import CompareScreen from '../screens/CompareScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Explore') iconName = focused ? 'compass' : 'compass-outline';
          else if (route.name === 'Compare') iconName = focused ? 'git-compare' : 'git-compare-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'web' ? 60 : 85,
          paddingBottom: Platform.OS === 'web' ? 6 : 20,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={CareerListScreen} />
      <Tab.Screen name="Compare" component={CompareScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="CareerDetail" component={CareerDetailScreen} />
        <Stack.Screen name="TrialSelection" component={TrialSelectionScreen} />
        <Stack.Screen name="QuickTrial" component={QuickTrialScreen} />
        <Stack.Screen name="DayTrial" component={DayTrialScreen} />
        <Stack.Screen name="WeekTrial" component={WeekTrialScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="Meeting" component={MeetingScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="Score" component={ScoreScreen} options={{ animation: 'fade_from_bottom' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
