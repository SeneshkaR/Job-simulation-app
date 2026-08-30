import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, careerColors } from '../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { careers, categories } from '../data/careers';

export default function CareerListScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = careers.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                          c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <LinearGradient colors={['#0F1023', '#1A1B2E']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Careers</Text>
        <Text style={styles.subtitle}>Find one that fits you</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search careers..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        <CategoryChip label="All" active={selectedCategory === 'All'} onPress={() => setSelectedCategory('All')} />
        {categories.map(cat => (
          <CategoryChip key={cat} label={cat} active={selectedCategory === cat} onPress={() => setSelectedCategory(cat)} />
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CareerDetail', { careerId: item.id })} activeOpacity={0.9}>
            <View style={styles.careerCard}>
              <LinearGradient
                colors={careerColors[item.id]?.gradient || colors.gradientPrimary}
                style={styles.iconBox}
              >
                <Text style={styles.emoji}>{item.emoji}</Text>
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardCategory}>{item.category}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>{item.shortDescription}</Text>
                <View style={styles.tagRow}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>${Math.round(item.salaryRange.min/1000)}k-${Math.round(item.salaryRange.max/1000)}k</Text>
                  </View>
                  <View style={[styles.tag, { backgroundColor: item.demandLevel === 'high' ? '#00E5A022' : '#FFD93D22' }]}>
                    <Text style={[styles.tagText, { color: item.demandLevel === 'high' ? colors.accentGreen : colors.accentYellow }]}>
                      {item.demandLevel} demand
                    </Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={22} color={colors.textMuted} />
            </View>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
}

function CategoryChip({ label, active, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.categoryChip, active && styles.categoryChipActive]}>
        <Text style={[styles.categoryText, active && { color: '#fff' }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 60, paddingHorizontal: spacing.xxl, marginBottom: spacing.lg },
  title: { fontSize: typography.h1, fontWeight: typography.bold, color: colors.textPrimary },
  subtitle: { color: colors.textSecondary, fontSize: typography.body, marginTop: 4 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, marginHorizontal: spacing.xxl, borderRadius: borderRadius.lg, paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: colors.border, gap: spacing.md },
  searchInput: { flex: 1, paddingVertical: spacing.md, color: colors.textPrimary, fontSize: typography.body },
  categoryScroll: { paddingHorizontal: spacing.xxl, paddingVertical: spacing.lg, gap: spacing.sm },
  categoryChip: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.round, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, marginRight: spacing.sm },
  categoryChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryText: { color: colors.textSecondary, fontWeight: typography.semibold, fontSize: typography.bodySmall },
  list: { paddingHorizontal: spacing.xxl, paddingBottom: 30 },
  careerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.lg, marginBottom: spacing.md, gap: spacing.md, borderWidth: 1, borderColor: colors.border },
  iconBox: { width: 60, height: 60, borderRadius: borderRadius.md, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 32 },
  cardTitle: { color: colors.textPrimary, fontSize: typography.h3, fontWeight: typography.bold },
  cardCategory: { color: colors.primary, fontSize: typography.caption, fontWeight: typography.semibold, marginTop: 2 },
  cardDesc: { color: colors.textSecondary, fontSize: typography.bodySmall, marginTop: 4 },
  tagRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  tag: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: 8, backgroundColor: `${colors.primary}22` },
  tagText: { fontSize: typography.tiny, fontWeight: typography.semibold, color: colors.primary, textTransform: 'capitalize' },
});
