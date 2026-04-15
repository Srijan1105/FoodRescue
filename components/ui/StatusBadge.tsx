// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getStatusColor, getUrgencyColor, UrgencyLevel } from '@/services/mockData';
import { FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';

interface StatusBadgeProps {
  label: string;
  type?: 'status' | 'urgency';
}

export function StatusBadge({ label, type = 'status' }: StatusBadgeProps) {
  const colors = type === 'urgency'
    ? getUrgencyColor(label as UrgencyLevel)
    : getStatusColor(label);

  const displayLabel = type === 'urgency'
    ? label.charAt(0).toUpperCase() + label.slice(1) + ' Urgency'
    : label.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.text, { color: colors.text }]}>{displayLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  text: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
});
