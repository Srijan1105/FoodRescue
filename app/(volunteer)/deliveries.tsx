// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDonations } from '@/hooks/useDonations';
import { useAlert } from '@/template';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';

const DELIVERY_STEPS = ['Assigned', 'Picked Up', 'In Transit', 'Delivered'];

export default function VolunteerDeliveriesScreen() {
  const insets = useSafeAreaInsets();
  const { volunteerRequests, updateVolunteerRequestStatus, donations } = useDonations();
  const { showAlert } = useAlert();

  const active = volunteerRequests.filter(r => r.status === 'accepted');
  const past = donations.filter(d => d.status === 'delivered');

  const handleMarkDelivered = (id: string) => {
    showAlert('Mark as Delivered', 'Confirm that food has been successfully delivered?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Confirm', onPress: () => {
          updateVolunteerRequestStatus(id, 'completed');
          showAlert('Delivery Complete!', 'Amazing work! You helped feed people in need.');
        },
      },
    ]);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Deliveries</Text>
        <Text style={styles.headerSub}>{active.length} active, {past.length} completed</Text>
      </View>

      <FlatList
        data={[...active.map(r => ({ type: 'active', data: r })), ...past.map(d => ({ type: 'past', data: d }))]}
        keyExtractor={(item, i) => `${item.type}_${i}`}
        contentContainerStyle={{ padding: Spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          active.length === 0 ? null : (
            <Text style={styles.sectionLabel}>Active Deliveries</Text>
          )
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="local-shipping" size={56} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No deliveries yet</Text>
            <Text style={styles.emptySubtitle}>Accept a request to get started</Text>
          </View>
        }
        renderItem={({ item, index }) => {
          if (item.type === 'active') {
            const req = item.data as typeof volunteerRequests[0];
            return (
              <View style={styles.activeCard}>
                <View style={styles.activeHeader}>
                  <View style={styles.activePulse} />
                  <Text style={styles.activeLabel}>IN PROGRESS</Text>
                </View>

                {/* Progress Steps */}
                <View style={styles.stepsRow}>
                  {DELIVERY_STEPS.map((step, i) => (
                    <React.Fragment key={step}>
                      <View style={styles.step}>
                        <View style={[styles.stepDot, i <= 1 && { backgroundColor: Colors.volunteer }]}>
                          {i <= 1 ? <MaterialIcons name="check" size={10} color="#FFFFFF" /> : null}
                        </View>
                        <Text style={[styles.stepLabel, i <= 1 && { color: Colors.volunteer, fontWeight: FontWeight.semibold }]}>
                          {step}
                        </Text>
                      </View>
                      {i < DELIVERY_STEPS.length - 1 ? (
                        <View style={[styles.stepLine, i < 1 && { backgroundColor: Colors.volunteer }]} />
                      ) : null}
                    </React.Fragment>
                  ))}
                </View>

                <View style={styles.routeRow}>
                  <View style={styles.addressBlock}>
                    <Text style={styles.addrLabel}>FROM</Text>
                    <Text style={styles.addrText}>{req.pickupAddress}</Text>
                  </View>
                  <MaterialIcons name="arrow-forward" size={18} color={Colors.volunteer} />
                  <View style={styles.addressBlock}>
                    <Text style={styles.addrLabel}>TO</Text>
                    <Text style={styles.addrText}>{req.dropAddress}</Text>
                  </View>
                </View>

                <Pressable
                  onPress={() => handleMarkDelivered(req.id)}
                  style={({ pressed }) => [styles.deliveredBtn, pressed && { opacity: 0.88 }]}
                >
                  <MaterialIcons name="check-circle" size={18} color="#FFFFFF" />
                  <Text style={styles.deliveredBtnText}>Mark as Delivered</Text>
                </Pressable>
              </View>
            );
          }

          const don = item.data as typeof donations[0];
          return (
            <>
              {index === active.length ? <Text style={[styles.sectionLabel, { marginTop: Spacing.md }]}>Completed Deliveries</Text> : null}
              <View style={styles.pastCard}>
                <MaterialIcons name="check-circle" size={22} color={Colors.success} style={{ marginRight: 6 }} />
                <View style={styles.pastInfo}>
                  <Text style={styles.pastDonor}>{don.donorName}</Text>
                  <Text style={styles.pastDetail}>{don.foodItems.join(', ')} · {don.quantity}</Text>
                  <Text style={styles.pastDate}>{new Date(don.createdAt).toLocaleDateString()}</Text>
                </View>
                <View style={styles.ecoTag}>
                  <MaterialIcons name="eco" size={12} color={Colors.primary} />
                  <Text style={styles.ecoText}>CO2 saved</Text>
                </View>
              </View>
            </>
          );
        }}
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
  sectionLabel: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.textPrimary, marginBottom: Spacing.sm },
  empty: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyTitle: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.textSecondary },
  emptySubtitle: { fontSize: FontSize.sm, color: Colors.textMuted },
  activeCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.md,
    borderWidth: 1.5,
    borderColor: Colors.volunteer,
  },
  activeHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  activePulse: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.volunteer },
  activeLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.volunteer, letterSpacing: 0.5 },
  stepsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  step: { alignItems: 'center', gap: 4 },
  stepDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  stepLabel: { fontSize: 9, color: Colors.textMuted, textAlign: 'center', maxWidth: 52 },
  stepLine: { flex: 1, height: 2, backgroundColor: Colors.border, marginBottom: 14 },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.background, borderRadius: Radius.md, padding: Spacing.sm, marginBottom: 12 },
  addressBlock: { flex: 1 },
  addrLabel: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.textMuted, letterSpacing: 0.5, marginBottom: 2 },
  addrText: { fontSize: FontSize.sm, color: Colors.textPrimary },
  deliveredBtn: {
    backgroundColor: Colors.volunteer,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: Radius.md,
  },
  deliveredBtnText: { color: '#FFFFFF', fontSize: FontSize.base, fontWeight: FontWeight.bold },
  pastCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  pastInfo: { flex: 1 },
  pastDonor: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  pastDetail: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  pastDate: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  ecoTag: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: Colors.primaryLight, paddingHorizontal: 7, paddingVertical: 4, borderRadius: Radius.full },
  ecoText: { fontSize: FontSize.xs, color: Colors.primary, fontWeight: FontWeight.medium },
});
