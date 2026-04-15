// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDonations } from '@/hooks/useDonations';
import { useAlert } from '@/template';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import { StatusBadge } from '@/components';

export default function VolunteerAvailableScreen() {
  const insets = useSafeAreaInsets();
  const { volunteerRequests, updateVolunteerRequestStatus, donations } = useDonations();
  const { showAlert } = useAlert();

  const pending = volunteerRequests.filter(r => r.status === 'pending');

  const handleAccept = (id: string, ngoName: string) => {
    showAlert('Accept Request', `Accept pickup request from ${ngoName}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Accept', onPress: () => {
          updateVolunteerRequestStatus(id, 'accepted');
          showAlert('Request Accepted!', 'Great! Check your Route tab for navigation details.');
        },
      },
    ]);
  };

  const handleDecline = (id: string) => {
    showAlert('Decline Request', 'Are you sure you want to decline this request?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Decline', style: 'destructive', onPress: () => updateVolunteerRequestStatus(id, 'rejected') },
    ]);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Available Requests</Text>
        <Text style={styles.headerSub}>{pending.length} requests near you</Text>
      </View>

      <FlatList
        data={volunteerRequests}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: Spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="assignment-turned-in" size={56} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No requests available</Text>
            <Text style={styles.emptySubtitle}>Check back soon — NGOs are matching donors</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.ngoTag}>
                <MaterialIcons name="volunteer-activism" size={14} color={Colors.ngo} />
                <Text style={styles.ngoTagText}>{item.ngoName}</Text>
              </View>
              <StatusBadge label={item.status} />
            </View>

            {/* Route Visual */}
            <View style={styles.routeVisual}>
              <View style={styles.routePoint}>
                <View style={[styles.pointDot, { backgroundColor: Colors.donor }]}>
                  <MaterialIcons name="storefront" size={10} color="#FFFFFF" />
                </View>
                <View style={styles.pointInfo}>
                  <Text style={styles.pointLabel}>PICKUP</Text>
                  <Text style={styles.pointAddress}>{item.pickupAddress}</Text>
                </View>
              </View>
              <View style={styles.routeDivider}>
                <View style={styles.dottedLine} />
                <MaterialIcons name="directions-bike" size={16} color={Colors.volunteer} />
                <View style={styles.dottedLine} />
              </View>
              <View style={styles.routePoint}>
                <View style={[styles.pointDot, { backgroundColor: Colors.ngo }]}>
                  <MaterialIcons name="home" size={10} color="#FFFFFF" />
                </View>
                <View style={styles.pointInfo}>
                  <Text style={styles.pointLabel}>DROP-OFF</Text>
                  <Text style={styles.pointAddress}>{item.dropAddress}</Text>
                </View>
              </View>
            </View>

            {/* Distance & Time */}
            <View style={styles.metricsRow}>
              <View style={styles.metric}>
                <MaterialIcons name="near-me" size={16} color={Colors.volunteer} />
                <Text style={styles.metricValue}>{item.estimatedDistance}</Text>
                <Text style={styles.metricLabel}>Distance</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metric}>
                <MaterialIcons name="schedule" size={16} color={Colors.volunteer} />
                <Text style={styles.metricValue}>{item.estimatedTime}</Text>
                <Text style={styles.metricLabel}>Est. Time</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metric}>
                <MaterialIcons name="eco" size={16} color={Colors.primary} />
                <Text style={styles.metricValue}>1.2 kg</Text>
                <Text style={styles.metricLabel}>CO2 Saved</Text>
              </View>
            </View>

            {/* AI Tip */}
            <View style={styles.aiTipRow}>
              <MaterialIcons name="auto-awesome" size={13} color={Colors.primary} />
              <Text style={styles.aiTipText}>AI: Best pickup window is 10 AM – 12 PM for this route</Text>
            </View>

            {item.status === 'pending' && (
              <View style={styles.actionRow}>
                <Pressable
                  onPress={() => handleDecline(item.id)}
                  style={({ pressed }) => [styles.declineBtn, pressed && { opacity: 0.8 }]}
                >
                  <Text style={styles.declineBtnText}>Decline</Text>
                </Pressable>
                <Pressable
                  onPress={() => handleAccept(item.id, item.ngoName)}
                  style={({ pressed }) => [styles.acceptBtn, pressed && { opacity: 0.88 }]}
                >
                  <MaterialIcons name="check" size={16} color="#FFFFFF" />
                  <Text style={styles.acceptBtnText}>Accept Pickup</Text>
                </Pressable>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.volunteer,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  headerTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: '#FFFFFF' },
  headerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  empty: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyTitle: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.textSecondary },
  emptySubtitle: { fontSize: FontSize.sm, color: Colors.textMuted, textAlign: 'center' },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  ngoTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.ngoLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  ngoTagText: { fontSize: FontSize.xs, color: Colors.ngo, fontWeight: FontWeight.medium },
  routeVisual: { gap: 2, marginBottom: 12 },
  routePoint: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  pointDot: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  pointInfo: { flex: 1 },
  pointLabel: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.textMuted, letterSpacing: 0.5 },
  pointAddress: { fontSize: FontSize.sm, color: Colors.textPrimary, marginTop: 1 },
  routeDivider: { flexDirection: 'row', alignItems: 'center', paddingLeft: 3, gap: 4 },
  dottedLine: { flex: 1, height: 1.5, backgroundColor: Colors.border },
  metricsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    marginBottom: 10,
  },
  metric: { flex: 1, alignItems: 'center', gap: 2 },
  metricValue: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  metricLabel: { fontSize: FontSize.xs, color: Colors.textMuted },
  metricDivider: { width: 1, backgroundColor: Colors.border, marginVertical: 4 },
  aiTipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.sm,
    padding: 8,
    marginBottom: 12,
  },
  aiTipText: { flex: 1, fontSize: FontSize.xs, color: Colors.primaryDark },
  actionRow: { flexDirection: 'row', gap: 10 },
  declineBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  declineBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textSecondary },
  acceptBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: Radius.md,
    backgroundColor: Colors.volunteer,
  },
  acceptBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: '#FFFFFF' },
});
