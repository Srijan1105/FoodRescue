// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDonations } from '@/hooks/useDonations';
import { useAuth } from '@/hooks/useAuth';
import { useAlert } from '@/template';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import { StatusBadge, AvatarCircle } from '@/components';

const MOCK_VOLUNTEERS = [
  { id: 'vol_001', name: 'Arun Mehta', area: 'Koramangala, Indiranagar', rating: 4.8, deliveries: 34, available: true, avatar: 'AM', distance: '1.2 km' },
  { id: 'vol_002', name: 'Kavitha Nair', area: 'MG Road, Shivajinagar', rating: 4.9, deliveries: 58, available: true, avatar: 'KN', distance: '2.5 km' },
  { id: 'vol_003', name: 'Rajesh Pillai', area: 'Jayanagar, BTM Layout', rating: 4.6, deliveries: 21, available: false, avatar: 'RP', distance: '4.1 km' },
  { id: 'vol_004', name: 'Sunita Rao', area: 'Whitefield, Marathahalli', rating: 4.7, deliveries: 45, available: true, avatar: 'SR', distance: '3.8 km' },
];

export default function NGOVolunteersScreen() {
  const insets = useSafeAreaInsets();
  const { volunteerRequests, submitVolunteerRequest, donations } = useDonations();
  const { user } = useAuth();
  const { showAlert } = useAlert();

  const handleRequest = (volunteer: typeof MOCK_VOLUNTEERS[0]) => {
    if (!volunteer.available) {
      showAlert('Volunteer Unavailable', `${volunteer.name} is currently on another delivery.`);
      return;
    }

    showAlert('Request Volunteer', `Send a pickup request to ${volunteer.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Send Request', onPress: () => {
          submitVolunteerRequest({
            ngoId: user?.id || 'ngo_001',
            ngoName: user?.organization || user?.name || '',
            donationId: 'don_001',
            pickupAddress: '18, Indiranagar, Bengaluru',
            dropAddress: '15, Gandhi Nagar, Bengaluru',
            pickupCoords: { lat: 12.9784, lng: 77.6408 },
            dropCoords: { lat: 12.9698, lng: 77.5738 },
            status: 'pending',
            estimatedDistance: volunteer.distance,
            estimatedTime: '20 min',
          });
          showAlert('Request Sent!', `${volunteer.name} has been notified and will confirm shortly.`);
        },
      },
    ]);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Volunteers</Text>
        <Text style={styles.headerSub}>{MOCK_VOLUNTEERS.filter(v => v.available).length} available nearby</Text>
      </View>

      {/* AI Route tip */}
      <View style={styles.aiCard}>
        <MaterialIcons name="auto-awesome" size={18} color={Colors.primary} />
        <Text style={styles.aiText}>
          AI suggests Arun Mehta — nearest volunteer, 34 successful deliveries. Est. route: 22 min.
        </Text>
      </View>

      <FlatList
        data={MOCK_VOLUNTEERS}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: Spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.volunteerCard, !item.available && styles.unavailableCard]}>
            <AvatarCircle
              initials={item.avatar}
              size={50}
              bgColor={item.available ? Colors.volunteerLight : Colors.surfaceAlt}
              textColor={item.available ? Colors.volunteer : Colors.textMuted}
            />
            <View style={styles.volunteerInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.volunteerName}>{item.name}</Text>
                <View style={[styles.availabilityDot, { backgroundColor: item.available ? Colors.success : Colors.textMuted }]} />
              </View>
              <Text style={styles.areaText}>{item.area}</Text>
              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <MaterialIcons name="star" size={12} color="#F57C00" />
                  <Text style={styles.statText}>{item.rating}</Text>
                </View>
                <View style={styles.stat}>
                  <MaterialIcons name="local-shipping" size={12} color={Colors.textMuted} />
                  <Text style={styles.statText}>{item.deliveries} deliveries</Text>
                </View>
                <View style={styles.stat}>
                  <MaterialIcons name="near-me" size={12} color={Colors.textMuted} />
                  <Text style={styles.statText}>{item.distance}</Text>
                </View>
              </View>
            </View>
            <Pressable
              onPress={() => handleRequest(item)}
              style={({ pressed }) => [
                styles.requestBtn,
                { backgroundColor: item.available ? Colors.volunteer : Colors.border },
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={[styles.requestBtnText, !item.available && { color: Colors.textMuted }]}>
                {item.available ? 'Request' : 'Busy'}
              </Text>
            </Pressable>
          </View>
        )}
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
  aiCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.primaryLight,
    margin: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  aiText: { flex: 1, fontSize: FontSize.sm, color: Colors.primaryDark, lineHeight: 18 },
  volunteerCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  unavailableCard: { opacity: 0.65 },
  volunteerInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  volunteerName: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  availabilityDot: { width: 8, height: 8, borderRadius: 4 },
  areaText: { fontSize: FontSize.sm, color: Colors.textMuted, marginBottom: 6 },
  statsRow: { flexDirection: 'row', gap: 12 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  statText: { fontSize: FontSize.xs, color: Colors.textSecondary },
  requestBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.md,
  },
  requestBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: '#FFFFFF' },
});
