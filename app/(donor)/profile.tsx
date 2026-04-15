// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useAlert } from '@/template';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import { AvatarCircle } from '@/components';

export default function DonorProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const router = useRouter();
  const { showAlert } = useAlert();

  const handleLogout = () => {
    showAlert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out', style: 'destructive', onPress: () => {
          logout();
          router.replace('/onboarding');
        },
      },
    ]);
  };

  const menuItems = [
    { icon: 'edit' as const, label: 'Edit Profile', onPress: () => {} },
    { icon: 'notifications' as const, label: 'Notifications', onPress: () => {} },
    { icon: 'security' as const, label: 'Privacy & Security', onPress: () => {} },
    { icon: 'help-outline' as const, label: 'Help & Support', onPress: () => {} },
    { icon: 'info-outline' as const, label: 'About FoodRescue', onPress: () => {} },
  ];

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <AvatarCircle initials={user?.avatar || 'U'} size={72} bgColor="rgba(255,255,255,0.25)" textColor="#FFFFFF" />
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileOrg}>{user?.organization}</Text>
          <View style={styles.roleBadge}>
            <MaterialIcons name="storefront" size={12} color={Colors.donor} />
            <Text style={styles.roleText}>Food Donor</Text>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact Information</Text>
          {[
            { icon: 'email' as const, value: user?.email || '' },
            { icon: 'phone' as const, value: user?.phone || '' },
            { icon: 'location-on' as const, value: user?.address || '' },
          ].map((item, i) => (
            <View key={i} style={styles.infoRow}>
              <MaterialIcons name={item.icon} size={16} color={Colors.textMuted} />
              <Text style={styles.infoText}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Menu */}
        <View style={styles.card}>
          {menuItems.map((item, i) => (
            <Pressable
              key={i}
              onPress={item.onPress}
              style={({ pressed }) => [
                styles.menuItem,
                i < menuItems.length - 1 && styles.menuItemBorder,
                pressed && { backgroundColor: Colors.surfaceAlt },
              ]}
            >
              <MaterialIcons name={item.icon} size={20} color={Colors.textSecondary} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <MaterialIcons name="arrow-forward-ios" size={14} color={Colors.textMuted} />
            </Pressable>
          ))}
        </View>

        {/* Logout */}
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.85 }]}
        >
          <MaterialIcons name="logout" size={18} color={Colors.urgent} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.donor,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    paddingTop: Spacing.sm,
  },
  headerTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: '#FFFFFF' },
  profileCard: {
    backgroundColor: Colors.donor,
    alignItems: 'center',
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.md,
    gap: 6,
  },
  profileName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: '#FFFFFF', marginTop: 6 },
  profileOrg: { fontSize: FontSize.base, color: 'rgba(255,255,255,0.8)' },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.donorLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
    marginTop: 4,
  },
  roleText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.donor },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    margin: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: 0,
    ...Shadow.sm,
  },
  cardTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  infoText: { flex: 1, fontSize: FontSize.base, color: Colors.textPrimary },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderRadius: Radius.sm,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  menuLabel: { flex: 1, fontSize: FontSize.base, color: Colors.textPrimary },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    margin: Spacing.md,
    marginTop: Spacing.md,
    paddingVertical: 14,
    borderRadius: Radius.md,
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  logoutText: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.urgent },
});
