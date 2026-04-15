// Powered by OnSpace.AI
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDonations } from '@/hooks/useDonations';
import { useAuth } from '@/hooks/useAuth';
import { useAlert } from '@/template';
import { DonationCard } from '@/components';
import { FOOD_CATEGORIES, Donation } from '@/services/mockData';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';

export default function NGOBrowseScreen() {
  const insets = useSafeAreaInsets();
  const { donations, submitNGORequest, ngoRequests } = useDonations();
  const { user } = useAuth();
  const { showAlert } = useAlert();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const available = donations.filter(d => d.status === 'available');

  const filtered = available.filter(d => {
    const matchesSearch = search.trim() === '' ||
      d.donorName.toLowerCase().includes(search.toLowerCase()) ||
      d.foodItems.some(f => f.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRequest = (donation: Donation) => {
    const alreadyRequested = ngoRequests.some(
      r => r.donationId === donation.id && r.ngoId === user?.id
    );
    if (alreadyRequested) {
      showAlert('Already Requested', 'You have already submitted a request for this donation.');
      return;
    }

    showAlert('Request Donation', `Request "${donation.foodItems.join(', ')}" from ${donation.donorName}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Send Request', onPress: () => {
          submitNGORequest({
            ngoId: user?.id || 'ngo_001',
            ngoName: user?.organization || user?.name || '',
            donationId: donation.id,
            foodItems: donation.foodItems,
            status: 'pending',
            message: `${user?.organization} would like to collect this donation for community distribution.`,
            beneficiaries: 150,
          });
          showAlert('Request Sent!', 'Your request has been sent to the donor. You will be notified when accepted.');
        },
      },
    ]);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Browse Donations</Text>
        <Text style={styles.headerSub}>{available.length} items available</Text>

        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={18} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Search food, donor..."
            placeholderTextColor={Colors.textMuted}
            accessibilityLabel="Search donations"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <MaterialIcons name="close" size={16} color={Colors.textMuted} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {FOOD_CATEGORIES.map(cat => (
            <Pressable
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[styles.filterChip, selectedCategory === cat && styles.filterChipActive]}
            >
              <Text style={[styles.filterChipText, selectedCategory === cat && styles.filterChipTextActive]}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: Spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="search-off" size={56} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No donations found</Text>
            <Text style={styles.emptySubtitle}>Try changing the filters</Text>
          </View>
        }
        renderItem={({ item }) => (
          <DonationCard
            donation={item}
            actionLabel="Request"
            onAction={() => handleRequest(item)}
            showStatus={false}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.ngo,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    paddingTop: Spacing.sm,
  },
  headerTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: '#FFFFFF' },
  headerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2, marginBottom: Spacing.sm },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
  },
  searchInput: { flex: 1, fontSize: FontSize.base, color: Colors.textPrimary },
  filterContainer: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  filterRow: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Radius.full,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.ngo,
    borderColor: Colors.ngo,
  },
  filterChipText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  empty: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyTitle: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.textSecondary },
  emptySubtitle: { fontSize: FontSize.sm, color: Colors.textMuted },
});
