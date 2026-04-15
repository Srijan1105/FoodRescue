// Powered by OnSpace.AI
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import { useDonations } from '@/hooks/useDonations';
import { DonationCard, StatCard } from '@/components';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';

export default function DonorDashboard() {
  const { user } = useAuth();
  const { donations } = useDonations();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const myDonations = donations.filter(d => d.donorId === user?.id || d.donorName === user?.organization);
  const activeCount = myDonations.filter(d => ['available', 'requested', 'accepted', 'in_transit'].includes(d.status)).length;
  const deliveredCount = myDonations.filter(d => d.status === 'delivered').length;
  const pendingRequests = myDonations.filter(d => d.status === 'requested').length;

  const recentDonations = donations.filter(d => d.status === 'available').slice(0, 3);

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <View>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.orgName}>{user?.organization}</Text>
        </View>
        <Pressable
          onPress={() => router.push('/(donor)/profile')}
          style={styles.avatarBtn}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.avatar}</Text>
          </View>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard icon="local-dining" value={String(activeCount)} label="Active" bgColor={Colors.donorLight} iconColor={Colors.donor} />
          <StatCard icon="check-circle-outline" value={String(deliveredCount)} label="Delivered" bgColor="#E8F5E9" iconColor="#2E7D32" />
          <StatCard icon="pending-actions" value={String(pendingRequests)} label="Pending" bgColor="#FFF8E1" iconColor="#E65100" />
        </View>

        {/* Impact Banner */}
        <View style={styles.impactBanner}>
          <MaterialIcons name="eco" size={24} color="#FFFFFF" />
          <View style={styles.impactText}>
            <Text style={styles.impactTitle}>Your Impact</Text>
            <Text style={styles.impactSubtitle}>You have helped feed 420+ people this month!</Text>
          </View>
        </View>

        {/* Quick Add */}
        <Pressable
          onPress={() => router.push('/(donor)/add-donation')}
          style={({ pressed }) => [styles.quickAddBtn, pressed && { opacity: 0.9 }]}
        >
          <MaterialIcons name="add" size={20} color={Colors.donor} />
          <Text style={styles.quickAddText}>Add New Food Donation</Text>
          <MaterialIcons name="arrow-forward" size={16} color={Colors.donor} />
        </Pressable>

        {/* Available Donations Near */}
        <Text style={styles.sectionTitle}>Active Donations</Text>
        {myDonations.filter(d => d.status !== 'delivered').length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="volunteer-activism" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No active donations</Text>
            <Text style={styles.emptySubtitle}>Start by adding food you want to donate</Text>
          </View>
        ) : (
          myDonations.filter(d => d.status !== 'delivered').map(donation => (
            <DonationCard
              key={donation.id}
              donation={donation}
              showStatus={true}
            />
          ))
        )}

        {/* Other available donations */}
        <Text style={styles.sectionTitle}>Food Available in Your Area</Text>
        {recentDonations.map(donation => (
          <DonationCard
            key={donation.id}
            donation={donation}
            showStatus={true}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.donor,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.75)',
  },
  userName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },
  orgName: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  avatarBtn: {
    marginTop: 4,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    margin: Spacing.md,
  },
  impactBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  impactText: {
    flex: 1,
  },
  impactTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },
  impactSubtitle: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  quickAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.donorLight,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.donor,
    borderStyle: 'dashed',
  },
  quickAddText: {
    flex: 1,
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.donor,
  },
  sectionTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: 8,
  },
  emptyTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  emptySubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
});
