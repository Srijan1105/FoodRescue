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

export default function DonorHistoryScreen() {
  const insets = useSafeAreaInsets();
  const { donations } = useDonations();
  const { user } = useAuth();

  const history = donations.filter(d =>
    (d.donorId === user?.id || d.donorName === user?.organization) &&
    ['delivered', 'in_transit'].includes(d.status)
  );

  const allHistory = donations.filter(d => ['delivered', 'in_transit', 'accepted'].includes(d.status));

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Delivery History</Text>
        <Text style={styles.headerSub}>{allHistory.length} total deliveries tracked</Text>
      </View>

      {/* Summary */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{allHistory.filter(d => d.status === 'delivered').length}</Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{allHistory.filter(d => d.status === 'in_transit').length}</Text>
          <Text style={styles.summaryLabel}>In Transit</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>420+</Text>
          <Text style={styles.summaryLabel}>Fed</Text>
        </View>
      </View>

      <FlatList
        data={allHistory}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: Spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="history" size={56} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No delivery history</Text>
          </View>
        }
        renderItem={({ item }) => {
          const statusColors = getStatusColor(item.status);
          return (
            <View style={styles.historyCard}>
              <View style={styles.cardHeader}>
                <View style={[styles.statusDot, { backgroundColor: statusColors.text }]} />
                <View style={styles.cardHeaderText}>
                  <Text style={styles.donorName}>{item.donorName}</Text>
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

              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <MaterialIcons name="scale" size={13} color={Colors.textMuted} />
                  <Text style={styles.detailText}>{item.quantity}</Text>
                </View>
                {item.volunteerName && (
                  <View style={styles.detailItem}>
                    <MaterialIcons name="directions-bike" size={13} color={Colors.textMuted} />
                    <Text style={styles.detailText}>{item.volunteerName}</Text>
                  </View>
                )}
                {item.ngoName && (
                  <View style={styles.detailItem}>
                    <MaterialIcons name="volunteer-activism" size={13} color={Colors.textMuted} />
                    <Text style={styles.detailText}>{item.ngoName}</Text>
                  </View>
                )}
              </View>
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
    backgroundColor: Colors.donor,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  headerTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: '#FFFFFF' },
  headerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    margin: Spacing.md,
    marginBottom: Spacing.sm,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    ...Shadow.sm,
  },
  summaryValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  summaryLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 2 },
  empty: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyTitle: { fontSize: FontSize.base, color: Colors.textSecondary },
  historyCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  cardHeaderText: { flex: 1 },
  donorName: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  timestamp: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  itemsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: 10 },
  chip: {
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipText: { fontSize: FontSize.xs, color: Colors.textSecondary },
  detailsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  detailText: { fontSize: FontSize.xs, color: Colors.textMuted },
});
