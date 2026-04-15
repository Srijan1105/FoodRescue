// Powered by OnSpace.AI
import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Donation, getDaysUntilExpiry, getUrgencyColor, getStatusColor } from '@/services/mockData';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import { StatusBadge } from './StatusBadge';

interface DonationCardProps {
  donation: Donation;
  onPress?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  showStatus?: boolean;
}

export const DonationCard = memo(function DonationCard({
  donation, onPress, actionLabel, onAction, showStatus = true,
}: DonationCardProps) {
  const daysLeft = getDaysUntilExpiry(donation.expiryDate);
  const urgencyColors = getUrgencyColor(donation.urgency);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.95, transform: [{ scale: 0.99 }] }]}
    >
      <View style={styles.header}>
        <View style={styles.categoryTag}>
          <MaterialIcons name="restaurant" size={12} color={Colors.primary} />
          <Text style={styles.categoryText}>{donation.category}</Text>
        </View>
        {showStatus && <StatusBadge label={donation.status} />}
      </View>

      <Text style={styles.donorName}>{donation.donorName}</Text>

      <View style={styles.itemsRow}>
        {donation.foodItems.slice(0, 3).map((item, i) => (
          <View key={i} style={styles.itemChip}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
        {donation.foodItems.length > 3 && (
          <View style={styles.itemChip}>
            <Text style={styles.itemText}>+{donation.foodItems.length - 3}</Text>
          </View>
        )}
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <MaterialIcons name="scale" size={14} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{donation.quantity}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="location-on" size={14} color={Colors.textSecondary} />
          <Text style={styles.detailText} numberOfLines={1}>{donation.donorAddress}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={[styles.expiryBadge, { backgroundColor: urgencyColors.bg, borderColor: urgencyColors.bg }]}>
          <MaterialIcons name="schedule" size={12} color={urgencyColors.text} />
          <Text style={[styles.expiryText, { color: urgencyColors.text }]}>
            {daysLeft <= 0 ? 'Expired' : daysLeft === 1 ? 'Expires today' : `${daysLeft}d left`}
          </Text>
        </View>
        {actionLabel && onAction && (
          <Pressable
            onPress={onAction}
            style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.8 }]}
          >
            <Text style={styles.actionBtnText}>{actionLabel}</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  categoryText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
  },
  donorName: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  itemsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  itemChip: {
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  itemText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  details: {
    gap: 4,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  expiryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  expiryText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
  actionBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    borderRadius: Radius.md,
  },
  actionBtnText: {
    color: Colors.textInverse,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
});
