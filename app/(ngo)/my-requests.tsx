// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDonations } from '@/hooks/useDonations';
import { useAuth } from '@/hooks/useAuth';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import { StatusBadge } from '@/components';
import { getStatusColor } from '@/services/mockData';

export default function NGOMyRequestsScreen() {
  const insets = useSafeAreaInsets();
  const { ngoRequests, donations } = useDonations();
  const { user } = useAuth();

  const myRequests = ngoRequests;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Requests</Text>
        <Text style={styles.headerSub}>{myRequests.filter(r => r.status === 'pending').length} pending approval</Text>
      </View>

      <FlatList
        data={myRequests}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: Spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="list-alt" size={56} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No requests yet</Text>
            <Text style={styles.emptySubtitle}>Browse donations to make your first request</Text>
          </View>
        }
        renderItem={({ item }) => {
          const donation = donations.find(d => d.id === item.donationId);
          const statusColors = getStatusColor(item.status);

          return (
            <View style={styles.requestCard}>
              <View style={styles.cardHeader}>
                <View style={[styles.statusIndicator, { backgroundColor: statusColors.text }]} />
                <View style={styles.headerText}>
                  <Text style={styles.donorName}>{donation?.donorName || 'Unknown Donor'}</Text>
                  <Text style={styles.timestamp}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                </View>
                <StatusBadge label={item.status} />
              </View>

              <View style={styles.itemsRow}>
                {item.foodItems.map((f, i) => (
                  <View key={i} style={styles.chip}>
                    <Text style={styles.chipText}>{f}</Text>
                  </View>
                ))}
              </View>

              {donation && (
                <View style={styles.donationInfo}>
                  <View style={styles.infoItem}>
                    <MaterialIcons name="scale" size={13} color={Colors.textMuted} />
                    <Text style={styles.infoText}>{donation.quantity}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <MaterialIcons name="location-on" size={13} color={Colors.textMuted} />
                    <Text style={styles.infoText} numberOfLines={1}>{donation.donorAddress}</Text>
                  </View>
                </View>
              )}

              <View style={styles.messageRow}>
                <MaterialIcons name="message" size={14} color={Colors.textMuted} />
                <Text style={styles.messageText} numberOfLines={2}>{item.message}</Text>
              </View>

              {item.status === 'accepted' && (
                <View style={styles.acceptedBanner}>
                  <MaterialIcons name="check-circle" size={16} color={Colors.success} />
                  <Text style={styles.acceptedText}>Donor approved! Coordinate pickup now.</Text>
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.ngo,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  headerTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: '#FFFFFF' },
  headerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  empty: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyTitle: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.textSecondary },
  emptySubtitle: { fontSize: FontSize.sm, color: Colors.textMuted },
  requestCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  statusIndicator: { width: 10, height: 10, borderRadius: 5 },
  headerText: { flex: 1 },
  donorName: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  timestamp: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  itemsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: 10 },
  chip: {
    backgroundColor: Colors.ngoLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.sm,
  },
  chipText: { fontSize: FontSize.xs, color: Colors.ngo, fontWeight: FontWeight.medium },
  donationInfo: { flexDirection: 'row', gap: 16, marginBottom: 8 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1 },
  infoText: { fontSize: FontSize.xs, color: Colors.textMuted, flex: 1 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 4, marginBottom: 4 },
  messageText: { fontSize: FontSize.sm, color: Colors.textSecondary, flex: 1, lineHeight: 18 },
  acceptedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.successLight,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    marginTop: Spacing.sm,
  },
  acceptedText: { fontSize: FontSize.sm, color: Colors.success, fontWeight: FontWeight.medium },
});
