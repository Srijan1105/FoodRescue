// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDonations } from '@/hooks/useDonations';
import { useAlert } from '@/template';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import { StatusBadge, AvatarCircle } from '@/components';

export default function DonorRequestsScreen() {
  const insets = useSafeAreaInsets();
  const { ngoRequests, updateNGORequestStatus } = useDonations();
  const { showAlert } = useAlert();

  const handleAccept = (id: string, ngoName: string) => {
    showAlert('Accept Request', `Allow ${ngoName} to collect this donation?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Accept', onPress: () => {
          updateNGORequestStatus(id, 'accepted');
        },
      },
    ]);
  };

  const handleReject = (id: string, ngoName: string) => {
    showAlert('Reject Request', `Reject the request from ${ngoName}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reject', style: 'destructive', onPress: () => {
          updateNGORequestStatus(id, 'rejected');
        },
      },
    ]);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NGO Requests</Text>
        <Text style={styles.headerSub}>{ngoRequests.filter(r => r.status === 'pending').length} pending</Text>
      </View>

      <FlatList
        data={ngoRequests}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: Spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="inbox" size={56} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No requests yet</Text>
            <Text style={styles.emptySubtitle}>NGOs will request your donations here</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.requestCard}>
            <View style={styles.cardHeader}>
              <AvatarCircle initials={item.ngoName.slice(0, 2).toUpperCase()} bgColor={Colors.ngoLight} textColor={Colors.ngo} />
              <View style={styles.cardHeaderText}>
                <Text style={styles.ngoName}>{item.ngoName}</Text>
                <Text style={styles.timestamp}>{new Date(item.createdAt).toLocaleDateString()}</Text>
              </View>
              <StatusBadge label={item.status} />
            </View>

            <View style={styles.beneficiaryRow}>
              <MaterialIcons name="people" size={15} color={Colors.primary} />
              <Text style={styles.beneficiaryText}>{item.beneficiaries} beneficiaries</Text>
            </View>

            <Text style={styles.message}>{item.message}</Text>

            <View style={styles.itemsRow}>
              {item.foodItems.map((f, i) => (
                <View key={i} style={styles.foodChip}>
                  <Text style={styles.foodChipText}>{f}</Text>
                </View>
              ))}
            </View>

            {item.status === 'pending' && (
              <View style={styles.actionRow}>
                <Pressable
                  onPress={() => handleReject(item.id, item.ngoName)}
                  style={({ pressed }) => [styles.rejectBtn, pressed && { opacity: 0.8 }]}
                >
                  <Text style={styles.rejectBtnText}>Decline</Text>
                </Pressable>
                <Pressable
                  onPress={() => handleAccept(item.id, item.ngoName)}
                  style={({ pressed }) => [styles.acceptBtn, pressed && { opacity: 0.88 }]}
                >
                  <MaterialIcons name="check" size={16} color="#FFFFFF" />
                  <Text style={styles.acceptBtnText}>Accept</Text>
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
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.donor,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },
  headerSub: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 10,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  emptySubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  requestCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  cardHeaderText: {
    flex: 1,
  },
  ngoName: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  timestamp: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  beneficiaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  beneficiaryText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
  },
  message: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  itemsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  foodChip: {
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  foodChipText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  rejectBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  rejectBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  acceptBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: Radius.md,
    backgroundColor: Colors.donor,
  },
  acceptBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },
});
