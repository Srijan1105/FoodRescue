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

export default function VolunteerProfileScreen() {
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

  const stats = [
    { label: 'Deliveries', value: '34', icon: 'local-shipping' as const, color: Colors.volunteer },
    { label: 'Rating', value: '4.8', icon: 'star' as const, color: '#F57C00' },
    { label: 'Kg Rescued', value: '285', icon: 'eco' as const, color: Colors.primary },
    { label: 'People Fed', value: '640+', icon: 'people' as const, color: Colors.ngo },
  ];

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <AvatarCircle initials={user?.avatar || 'V'} size={72} bgColor="rgba(255,255,255,0.25)" textColor="#FFFFFF" />
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileSub}>Volunteer Partner</Text>
          <View style={styles.roleBadge}>
            <MaterialIcons name="directions-bike" size={12} color={Colors.volunteer} />
            <Text style={styles.badgeText}>Active Volunteer</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((s, i) => (
            <View key={i} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: s.color + '20' }]}>
                <MaterialIcons name={s.icon} size={18} color={s.color} />
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Contact */}
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

        {/* Achievements */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Achievements</Text>
          {[
            { icon: 'emoji-events' as const, label: 'First Delivery', desc: 'Completed first pickup', earned: true },
            { icon: 'local-fire-department' as const, label: '10-Delivery Streak', desc: '10 consecutive deliveries', earned: true },
            { icon: 'eco' as const, label: 'Green Hero', desc: 'Saved 100kg of food', earned: false },
          ].map((ach, i) => (
            <View key={i} style={[styles.achRow, !ach.earned && { opacity: 0.4 }]}>
              <View style={[styles.achIcon, { backgroundColor: ach.earned ? '#FFF8E1' : Colors.surfaceAlt }]}>
                <MaterialIcons name={ach.icon} size={18} color={ach.earned ? '#F57C00' : Colors.textMuted} />
              </View>
              <View style={styles.achInfo}>
                <Text style={styles.achLabel}>{ach.label}</Text>
                <Text style={styles.achDesc}>{ach.desc}</Text>
              </View>
              {ach.earned && <MaterialIcons name="check-circle" size={18} color={Colors.success} />}
            </View>
          ))}
        </View>

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
    backgroundColor: Colors.volunteer,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    paddingTop: Spacing.sm,
  },
  headerTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: '#FFFFFF' },
  profileCard: {
    backgroundColor: Colors.volunteer,
    alignItems: 'center',
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.md,
    gap: 6,
  },
  profileName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: '#FFFFFF', marginTop: 6 },
  profileSub: { fontSize: FontSize.base, color: 'rgba(255,255,255,0.8)' },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.volunteerLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
    marginTop: 4,
  },
  badgeText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.volunteer },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    margin: Spacing.md,
    marginBottom: 0,
  },
  statCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 4,
    ...Shadow.sm,
  },
  statIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  statValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  statLabel: { fontSize: FontSize.xs, color: Colors.textMuted },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    margin: Spacing.md,
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
  achRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  achIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  achInfo: { flex: 1 },
  achLabel: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  achDesc: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 1 },
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
