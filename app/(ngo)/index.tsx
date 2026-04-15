// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import { useDonations } from '@/hooks/useDonations';
import { StatCard, DonationCard } from '@/components';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';

export default function NGODashboard() {
  const { user } = useAuth();
  const { donations, ngoRequests, volunteerRequests } = useDonations();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const availableDonations = donations.filter(d => d.status === 'available');
  const myRequests = ngoRequests.filter(r => r.ngoId === user?.id);
  const pendingRequests = myRequests.filter(r => r.status === 'pending').length;
  const inTransit = donations.filter(d => d.status === 'in_transit').length;

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <View>
          <Text style={styles.greeting}>Welcome,</Text>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.orgName}>{user?.organization}</Text>
        </View>
        <Pressable onPress={() => router.push('/(ngo)/profile')} style={styles.avatarBtn}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.avatar}</Text>
          </View>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard icon="local-dining" value={String(availableDonations.length)} label="Available" bgColor={Colors.ngoLight} iconColor={Colors.ngo} />
          <StatCard icon="pending-actions" value={String(pendingRequests)} label="My Requests" bgColor="#FFF8E1" iconColor="#E65100" />
          <StatCard icon="local-shipping" value={String(inTransit)} label="In Transit" bgColor="#E8EAF6" iconColor="#283593" />
        </View>

        {/* Alert Banner */}
        {availableDonations.some(d => d.urgency === 'high') && (
          <View style={styles.alertBanner}>
            <MaterialIcons name="warning-amber" size={18} color="#C62828" />
            <Text style={styles.alertText}>
              {availableDonations.filter(d => d.urgency === 'high').length} urgent donations expiring today!
            </Text>
            <Pressable onPress={() => router.push('/(ngo)/browse')} style={styles.alertAction}>
              <Text style={styles.alertActionText}>View</Text>
            </Pressable>
          </View>
        )}

        {/* Quick actions */}
        <View style={styles.quickActionsRow}>
          <Pressable onPress={() => router.push('/(ngo)/browse')} style={[styles.quickAction, { backgroundColor: Colors.ngoLight }]}>
            <MaterialIcons name="search" size={22} color={Colors.ngo} />
            <Text style={[styles.quickActionLabel, { color: Colors.ngo }]}>Browse Food</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/(ngo)/volunteers')} style={[styles.quickAction, { backgroundColor: Colors.volunteerLight }]}>
            <MaterialIcons name="directions-bike" size={22} color={Colors.volunteer} />
            <Text style={[styles.quickActionLabel, { color: Colors.volunteer }]}>Get Volunteer</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/(ngo)/my-requests')} style={[styles.quickAction, { backgroundColor: Colors.primaryLight }]}>
            <MaterialIcons name="list-alt" size={22} color={Colors.primary} />
            <Text style={[styles.quickActionLabel, { color: Colors.primary }]}>My Requests</Text>
          </Pressable>
        </View>

        {/* Urgent Donations */}
        <Text style={styles.sectionTitle}>
          <MaterialIcons name="local-fire-department" size={16} color={Colors.urgent} /> Urgent — Expiring Soon
        </Text>
        {availableDonations.filter(d => d.urgency === 'high').map(donation => (
          <DonationCard
            key={donation.id}
            donation={donation}
            actionLabel="Request"
            onAction={() => router.push('/(ngo)/browse')}
            showStatus={false}
          />
        ))}

        {/* Available Donations */}
        <Text style={styles.sectionTitle}>All Available Donations</Text>
        {availableDonations.slice(0, 4).map(donation => (
          <DonationCard
            key={donation.id}
            donation={donation}
            actionLabel="Request"
            onAction={() => router.push('/(ngo)/browse')}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.ngo,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.75)' },
  userName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: '#FFFFFF' },
  orgName: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  avatarBtn: { marginTop: 4 },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarText: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: '#FFFFFF' },
  statsRow: { flexDirection: 'row', gap: Spacing.sm, margin: Spacing.md },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFEBEE',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  alertText: { flex: 1, fontSize: FontSize.sm, color: '#C62828', fontWeight: FontWeight.medium },
  alertAction: {
    backgroundColor: '#C62828',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  alertActionText: { fontSize: FontSize.xs, color: '#FFFFFF', fontWeight: FontWeight.bold },
  quickActionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.sm,
    borderRadius: Radius.lg,
    gap: 6,
  },
  quickActionLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
});
