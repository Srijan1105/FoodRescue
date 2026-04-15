// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import { useDonations } from '@/hooks/useDonations';
import { StatCard } from '@/components';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import { AI_ROUTE_TIPS } from '@/services/mockData';

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const { volunteerRequests, donations } = useDonations();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const pendingRequests = volunteerRequests.filter(r => r.status === 'pending').length;
  const activeDeliveries = volunteerRequests.filter(r => r.status === 'accepted').length;
  const completedDeliveries = donations.filter(d => d.status === 'delivered').length;

  const todayTip = AI_ROUTE_TIPS[new Date().getDay() % AI_ROUTE_TIPS.length];

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <View>
          <Text style={styles.greeting}>Ready to rescue food?</Text>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.roleTag}>Volunteer</Text>
        </View>
        <Pressable onPress={() => router.push('/(volunteer)/profile')} style={styles.avatarBtn}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.avatar}</Text>
          </View>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard icon="assignment" value={String(pendingRequests)} label="New Requests" bgColor={Colors.volunteerLight} iconColor={Colors.volunteer} />
          <StatCard icon="local-shipping" value={String(activeDeliveries)} label="Active" bgColor="#E8EAF6" iconColor="#283593" />
          <StatCard icon="check-circle-outline" value={String(completedDeliveries)} label="Completed" bgColor="#E8F5E9" iconColor="#2E7D32" />
        </View>

        {/* AI Route Tip */}
        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <MaterialIcons name="auto-awesome" size={18} color={Colors.primary} />
            <Text style={styles.aiTitle}>AI Route Intelligence</Text>
          </View>
          <Text style={styles.aiTip}>{todayTip}</Text>
          <Pressable
            onPress={() => router.push('/(volunteer)/map')}
            style={({ pressed }) => [styles.aiBtn, pressed && { opacity: 0.85 }]}
          >
            <MaterialIcons name="map" size={14} color="#FFFFFF" />
            <Text style={styles.aiBtnText}>View Optimized Route</Text>
          </Pressable>
        </View>

        {/* Active delivery tracker */}
        {volunteerRequests.filter(r => r.status === 'accepted').map(req => (
          <View key={req.id} style={styles.activeDelivery}>
            <View style={styles.activeHeader}>
              <View style={styles.activeDot} />
              <Text style={styles.activeTitle}>Active Delivery</Text>
              <Text style={styles.activeTime}>Est. {req.estimatedTime}</Text>
            </View>
            <View style={styles.routeContainer}>
              <View style={styles.routeStop}>
                <View style={[styles.stopDot, { backgroundColor: Colors.donor }]} />
                <View style={styles.stopInfo}>
                  <Text style={styles.stopLabel}>PICKUP</Text>
                  <Text style={styles.stopAddress}>{req.pickupAddress}</Text>
                </View>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routeStop}>
                <View style={[styles.stopDot, { backgroundColor: Colors.ngo }]} />
                <View style={styles.stopInfo}>
                  <Text style={styles.stopLabel}>DROP-OFF</Text>
                  <Text style={styles.stopAddress}>{req.dropAddress}</Text>
                </View>
              </View>
            </View>
            <View style={styles.distanceRow}>
              <MaterialIcons name="near-me" size={13} color={Colors.textMuted} />
              <Text style={styles.distanceText}>{req.estimatedDistance}</Text>
              <Text style={styles.dividerDot}>•</Text>
              <MaterialIcons name="schedule" size={13} color={Colors.textMuted} />
              <Text style={styles.distanceText}>{req.estimatedTime}</Text>
            </View>
          </View>
        ))}

        {/* Pending Requests */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pending Requests</Text>
          <Pressable onPress={() => router.push('/(volunteer)/available')}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>

        {volunteerRequests.filter(r => r.status === 'pending').slice(0, 2).map(req => (
          <View key={req.id} style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <MaterialIcons name="volunteer-activism" size={18} color={Colors.ngo} />
              <Text style={styles.ngoName}>{req.ngoName}</Text>
              <View style={styles.distanceChip}>
                <Text style={styles.distanceChipText}>{req.estimatedDistance}</Text>
              </View>
            </View>
            <View style={styles.requestAddresses}>
              <Text style={styles.addressText} numberOfLines={1}>From: {req.pickupAddress}</Text>
              <Text style={styles.addressText} numberOfLines={1}>To: {req.dropAddress}</Text>
            </View>
            <Pressable
              onPress={() => router.push('/(volunteer)/available')}
              style={({ pressed }) => [styles.viewBtn, pressed && { opacity: 0.85 }]}
            >
              <Text style={styles.viewBtnText}>View Details</Text>
            </Pressable>
          </View>
        ))}

        {pendingRequests === 0 && (
          <View style={styles.empty}>
            <MaterialIcons name="check-circle-outline" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyText}>No pending requests right now</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.volunteer,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.75)' },
  userName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: '#FFFFFF' },
  roleTag: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  avatarBtn: { marginTop: 4 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)' },
  avatarText: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: '#FFFFFF' },
  statsRow: { flexDirection: 'row', gap: Spacing.sm, margin: Spacing.md },
  aiCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  aiHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  aiTitle: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  aiTip: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 18, marginBottom: 12 },
  aiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.md,
    alignSelf: 'flex-start',
  },
  aiBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: '#FFFFFF' },
  activeDelivery: {
    backgroundColor: Colors.volunteerLight,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1.5,
    borderColor: Colors.volunteer,
  },
  activeHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.volunteer },
  activeTitle: { flex: 1, fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.volunteer },
  activeTime: { fontSize: FontSize.sm, color: Colors.volunteer, fontWeight: FontWeight.medium },
  routeContainer: { gap: 0 },
  routeStop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  stopDot: { width: 12, height: 12, borderRadius: 6, marginTop: 3 },
  stopInfo: { flex: 1 },
  stopLabel: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.textMuted, letterSpacing: 0.5 },
  stopAddress: { fontSize: FontSize.sm, color: Colors.textPrimary, marginTop: 1 },
  routeLine: { width: 2, height: 16, backgroundColor: Colors.border, marginLeft: 5, marginVertical: 3 },
  distanceRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  distanceText: { fontSize: FontSize.xs, color: Colors.textMuted },
  dividerDot: { color: Colors.textMuted, fontSize: FontSize.xs },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: Spacing.md, marginBottom: Spacing.sm, marginTop: Spacing.md },
  sectionTitle: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  seeAll: { fontSize: FontSize.sm, color: Colors.volunteer, fontWeight: FontWeight.semibold },
  requestCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  requestHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  ngoName: { flex: 1, fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  distanceChip: { backgroundColor: Colors.volunteerLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.full },
  distanceChipText: { fontSize: FontSize.xs, color: Colors.volunteer, fontWeight: FontWeight.medium },
  requestAddresses: { gap: 3, marginBottom: 10 },
  addressText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  viewBtn: { backgroundColor: Colors.volunteer, paddingVertical: 9, borderRadius: Radius.md, alignItems: 'center' },
  viewBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: '#FFFFFF' },
  empty: { alignItems: 'center', paddingVertical: 40, gap: 8 },
  emptyText: { fontSize: FontSize.base, color: Colors.textSecondary },
});
