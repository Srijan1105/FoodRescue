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

export default function NGOProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const router = useRouter();
  const { showAlert } = useAlert();

  const handleLogout = () => {
    showAlert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => { logout(); router.replace('/onboarding'); } },
    ]);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.profileCard}>
          <AvatarCircle initials={user?.avatar || 'N'} size={72} bgColor="rgba(255,255,255,0.25)" textColor="#FFFFFF" />
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.org}>{user?.organization}</Text>
          <View style={styles.badge}>
            <MaterialIcons name="volunteer-activism" size={12} color={Colors.ngo} />
            <Text style={styles.badgeText}>NGO / Food Bank</Text>
          </View>
        </View>

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

        <View style={styles.impactCard}>
          <Text style={styles.impactTitle}>Community Impact</Text>
          {[
            { label: 'People Fed', value: '1,240+', icon: 'people' as const },
            { label: 'Food Rescued', value: '340 kg', icon: 'eco' as const },
            { label: 'Successful Pickups', value: '28', icon: 'check-circle' as const },
          ].map((stat, i) => (
            <View key={i} style={styles.impactRow}>
              <MaterialIcons name={stat.icon} size={18} color={Colors.ngo} />
              <Text style={styles.impactLabel}>{stat.label}</Text>
              <Text style={styles.impactValue}>{stat.value}</Text>
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
  header: { backgroundColor: Colors.ngo, paddingHorizontal: Spacing.md, paddingBottom: Spacing.sm, paddingTop: Spacing.sm },
  headerTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: '#FFFFFF' },
  profileCard: { backgroundColor: Colors.ngo, alignItems: 'center', paddingBottom: Spacing.xl, paddingTop: Spacing.md, gap: 6 },
  name: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: '#FFFFFF', marginTop: 6 },
  org: { fontSize: FontSize.base, color: 'rgba(255,255,255,0.8)' },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.ngoLight, paddingHorizontal: 12, paddingVertical: 5, borderRadius: Radius.full, marginTop: 4 },
  badgeText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.ngo },
  card: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.md, margin: Spacing.md, marginBottom: 0, ...Shadow.sm },
  cardTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textSecondary, marginBottom: Spacing.sm, textTransform: 'uppercase', letterSpacing: 0.5 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  infoText: { flex: 1, fontSize: FontSize.base, color: Colors.textPrimary },
  impactCard: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.md, margin: Spacing.md, marginBottom: 0, ...Shadow.sm },
  impactTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textSecondary, marginBottom: Spacing.sm, textTransform: 'uppercase', letterSpacing: 0.5 },
  impactRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  impactLabel: { flex: 1, fontSize: FontSize.base, color: Colors.textPrimary },
  impactValue: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.ngo },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, margin: Spacing.md, marginTop: Spacing.md, paddingVertical: 14, borderRadius: Radius.md, backgroundColor: '#FFEBEE', borderWidth: 1, borderColor: '#FFCDD2' },
  logoutText: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.urgent },
});
