import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, careerColors } from '../theme/colors';
import { spacing, typography, borderRadius, shadows } from '../theme';
import { careers, categories } from '../data/careers';

const demandLevels = ['All', 'high', 'medium', 'low'];
const workStyles = ['All', 'collaborative', 'independent', 'mixed'];
const sortOptions = [
  { id: 'default', label: 'Default', icon: 'grid' },
  { id: 'salary-high', label: 'Salary: High', icon: 'trending-up' },
  { id: 'salary-low', label: 'Salary: Low', icon: 'trending-down' },
  { id: 'alpha', label: 'A - Z', icon: 'arrow-down' },
];

export default function CareerListScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDemand, setSelectedDemand] = useState('All');
  const [selectedWorkStyle, setSelectedWorkStyle] = useState('All');
  const [selectedSort, setSelectedSort] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = selectedCategory !== 'All' || selectedDemand !== 'All' || selectedWorkStyle !== 'All' || selectedSort !== 'default';

  const filtered = careers.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                          c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesDemand = selectedDemand === 'All' || c.demandLevel === selectedDemand;
    const matchesWorkStyle = selectedWorkStyle === 'All' || c.workStyle === selectedWorkStyle;
    return matchesSearch && matchesCategory && matchesDemand && matchesWorkStyle;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (selectedSort === 'salary-high') return b.salaryRange.max - a.salaryRange.max;
    if (selectedSort === 'salary-low') return a.salaryRange.min - b.salaryRange.min;
    if (selectedSort === 'alpha') return a.title.localeCompare(b.title);
    return 0;
  });

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedDemand('All');
    setSelectedWorkStyle('All');
    setSelectedSort('default');
    setSearch('');
  };

  return (
    <LinearGradient colors={['#0F1023', '#1A1B2E']} style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Explore Careers</Text>
          <Text style={styles.subtitle}>{sorted.length} of {careers.length} careers</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowFilters(!showFilters)}
          style={[styles.filterToggleBtn, showFilters && styles.filterToggleBtnActive]}
        >
          <Ionicons name="options" size={22} color={showFilters ? '#fff' : colors.textSecondary} />
          {hasActiveFilters && <View style={styles.filterDot} />}
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search careers..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category chips (always visible) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        <CategoryChip label="All" active={selectedCategory === 'All'} onPress={() => setSelectedCategory('All')} />
        {categories.map(cat => (
          <CategoryChip key={cat} label={cat} active={selectedCategory === cat} onPress={() => setSelectedCategory(cat)} />
        ))}
      </ScrollView>

      {/* Expandable advanced filters */}
      {showFilters && (
        <View style={styles.advancedFilters}>
          {/* Sort options */}
          <Text style={styles.filterSectionLabel}>Sort by</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChipRow}>
            {sortOptions.map(opt => (
              <FilterPill
                key={opt.id}
                icon={opt.icon}
                label={opt.label}
                active={selectedSort === opt.id}
                onPress={() => setSelectedSort(opt.id)}
              />
            ))}
          </ScrollView>

          {/* Demand level */}
          <Text style={styles.filterSectionLabel}>Demand Level</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChipRow}>
            {demandLevels.map(d => (
              <FilterPill
                key={d}
                label={d === 'All' ? 'All' : d}
                active={selectedDemand === d}
                onPress={() => setSelectedDemand(d)}
              />
            ))}
          </ScrollView>

          {/* Work style */}
          <Text style={styles.filterSectionLabel}>Work Style</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChipRow}>
            {workStyles.map(w => (
              <FilterPill
                key={w}
                label={w === 'All' ? 'All' : w}
                active={selectedWorkStyle === w}
                onPress={() => setSelectedWorkStyle(w)}
              />
            ))}
          </ScrollView>

          {hasActiveFilters && (
            <TouchableOpacity onPress={clearFilters} style={styles.clearBtn}>
              <Ionicons name="refresh" size={16} color={colors.primary} />
              <Text style={styles.clearText}>Clear all filters</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Career list */}
      <FlatList
        data={sorted}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>No careers match your filters</Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.emptyLink}>Clear filters</Text>
            </TouchableOpacity>
          </View>
        }
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
                  <View style={[styles.tag, { backgroundColor: item.demandLevel === 'high' ? '#00E5A022' : item.demandLevel === 'medium' ? '#FFD93D22' : '#FF6B9D22' }]}>
                    <Text style={[styles.tagText, { color: item.demandLevel === 'high' ? colors.accentGreen : item.demandLevel === 'medium' ? colors.accentYellow : colors.accentPink }]}>
                      {item.demandLevel} demand
                    </Text>
                  </View>
                  <View style={styles.tag}>
                    <Ionicons name="people-outline" size={10} color={colors.textMuted} />
                    <Text style={[styles.tagText, { color: colors.textMuted }]}>{item.workStyle}</Text>
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

function FilterPill({ icon, label, active, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.filterPill, active && styles.filterPillActive]}>
        {icon && <Ionicons name={icon} size={14} color={active ? '#fff' : colors.textMuted} />}
        <Text style={[styles.filterPillText, active && { color: '#fff' }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: Platform.OS === 'web' ? 24 : 60, paddingHorizontal: spacing.xxl, marginBottom: spacing.lg },
  title: { fontSize: typography.h1, fontWeight: typography.bold, color: colors.textPrimary },
  subtitle: { color: colors.textSecondary, fontSize: typography.body, marginTop: 4 },
  filterToggleBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, position: 'relative' },
  filterToggleBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterDot: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accentPink },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, marginHorizontal: spacing.xxl, borderRadius: borderRadius.lg, paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: colors.border, gap: spacing.md },
  searchInput: { flex: 1, paddingVertical: spacing.md, color: colors.textPrimary, fontSize: typography.body },
  categoryScroll: { paddingHorizontal: spacing.xxl, paddingVertical: spacing.lg, gap: spacing.sm },
  categoryChip: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.round, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, marginRight: spacing.sm },
  categoryChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryText: { color: colors.textSecondary, fontWeight: typography.semibold, fontSize: typography.bodySmall },

  // Advanced filters
  advancedFilters: { paddingHorizontal: spacing.xxl, paddingBottom: spacing.md, gap: spacing.sm },
  filterSectionLabel: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.semibold, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: spacing.sm },
  filterChipRow: { gap: spacing.sm, paddingVertical: spacing.xs },
  filterPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.round, backgroundColor: colors.surfaceLight, borderWidth: 1, borderColor: colors.border, gap: spacing.xs },
  filterPillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterPillText: { color: colors.textSecondary, fontSize: typography.caption, fontWeight: typography.semibold, textTransform: 'capitalize' },
  clearBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.sm, alignSelf: 'flex-start' },
  clearText: { color: colors.primary, fontSize: typography.caption, fontWeight: typography.semibold },

  // List
  list: { paddingHorizontal: spacing.xxl, paddingBottom: 30 },
  careerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: spacing.md, borderRadius: borderRadius.lg, marginBottom: spacing.md, gap: spacing.md, borderWidth: 1, borderColor: colors.border },
  iconBox: { width: 60, height: 60, borderRadius: borderRadius.md, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 32 },
  cardTitle: { color: colors.textPrimary, fontSize: typography.h3, fontWeight: typography.bold },
  cardCategory: { color: colors.primary, fontSize: typography.caption, fontWeight: typography.semibold, marginTop: 2 },
  cardDesc: { color: colors.textSecondary, fontSize: typography.bodySmall, marginTop: 4 },
  tagRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' },
  tag: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: 8, backgroundColor: `${colors.primary}22`, gap: 3 },
  tagText: { fontSize: typography.tiny, fontWeight: typography.semibold, color: colors.primary, textTransform: 'capitalize' },

  // Empty
  emptyState: { alignItems: 'center', paddingVertical: spacing.xxxl, gap: spacing.md },
  emptyText: { color: colors.textMuted, fontSize: typography.body },
  emptyLink: { color: colors.primary, fontWeight: typography.semibold, fontSize: typography.bodySmall },
});
