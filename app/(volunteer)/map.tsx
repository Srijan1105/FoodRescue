// Powered by OnSpace.AI
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDonations } from '@/hooks/useDonations';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import { AI_ROUTE_TIPS } from '@/services/mockData';

export default function VolunteerMapScreen() {
  const insets = useSafeAreaInsets();
  const { volunteerRequests } = useDonations();
  const [selectedTip, setSelectedTip] = useState(0);

  const activeReq = volunteerRequests.find(r => r.status === 'accepted');

  const waypoints = [
    { label: 'Your Location', type: 'current', address: '8, Koramangala 4th Block', color: Colors.volunteer, icon: 'person-pin-circle' as const },
    { label: 'Pickup Point', type: 'pickup', address: activeReq?.pickupAddress || '18, Indiranagar, Bengaluru', color: Colors.donor, icon: 'storefront' as const },
    { label: 'Drop-off Point', type: 'drop', address: activeReq?.dropAddress || '15, Gandhi Nagar, Bengaluru', color: Colors.ngo, icon: 'home' as const },
  ];

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Route Map</Text>
        <Text style={styles.headerSub}>AI-optimized delivery route</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapBg}>
            {/* Simulated map grid */}
            {[0, 1, 2, 3, 4].map(row => (
              <View key={row} style={styles.mapRow}>
                {[0, 1, 2, 3, 4, 5].map(col => (
                  <View key={col} style={styles.mapCell} />
                ))}
              </View>
            ))}

            {/* Route line simulation */}
            <View style={styles.routeOverlay}>
              <View style={styles.routeLineH} />
              <View style={styles.routeLineV} />
            </View>

            {/* Waypoint markers */}
            <View style={[styles.mapMarker, { top: '15%', left: '45%', backgroundColor: Colors.volunteer }]}>
              <MaterialIcons name="person-pin-circle" size={16} color="#FFFFFF" />
            </View>
            <View style={[styles.mapMarker, { top: '50%', left: '60%', backgroundColor: Colors.donor }]}>
              <MaterialIcons name="storefront" size={16} color="#FFFFFF" />
            </View>
            <View style={[styles.mapMarker, { top: '75%', left: '25%', backgroundColor: Colors.ngo }]}>
              <MaterialIcons name="home" size={16} color="#FFFFFF" />
            </View>

            <View style={styles.mapLabel}>
              <MaterialIcons name="map" size={14} color={Colors.textMuted} />
              <Text style={styles.mapLabelText}>Map view (connect to real backend for live tracking)</Text>
            </View>
          </View>
        </View>

        {/* Route Summary */}
        <View style={styles.routeSummary}>
          <View style={styles.summaryItem}>
            <MaterialIcons name="near-me" size={18} color={Colors.volunteer} />
            <Text style={styles.summaryValue}>{activeReq?.estimatedDistance || '7.2 km'}</Text>
            <Text style={styles.summaryLabel}>Total</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <MaterialIcons name="schedule" size={18} color={Colors.volunteer} />
            <Text style={styles.summaryValue}>{activeReq?.estimatedTime || '25 min'}</Text>
            <Text style={styles.summaryLabel}>Est. Time</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <MaterialIcons name="eco" size={18} color={Colors.primary} />
            <Text style={styles.summaryValue}>1.2 kg</Text>
            <Text style={styles.summaryLabel}>CO2 Saved</Text>
          </View>
        </View>

        {/* Waypoints */}
        <Text style={styles.sectionTitle}>Route Waypoints</Text>
        <View style={styles.waypointsCard}>
          {waypoints.map((wp, i) => (
            <View key={i}>
              <View style={styles.waypointRow}>
                <View style={[styles.waypointIcon, { backgroundColor: wp.color + '20' }]}>
                  <MaterialIcons name={wp.icon} size={18} color={wp.color} />
                </View>
                <View style={styles.waypointInfo}>
                  <Text style={styles.waypointLabel}>{wp.label}</Text>
                  <Text style={styles.waypointAddress}>{wp.address}</Text>
                </View>
                <Pressable style={styles.navBtn}>
                  <MaterialIcons name="navigation" size={14} color={Colors.primary} />
                </Pressable>
              </View>
              {i < waypoints.length - 1 && (
                <View style={styles.waypointConnector}>
                  <View style={styles.connectorLine} />
                  <Text style={styles.connectorDist}>
                    {i === 0 ? '1.8 km' : activeReq?.estimatedDistance || '5.4 km'}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* AI Route Tips */}
        <Text style={styles.sectionTitle}>AI Route Intelligence</Text>
        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <MaterialIcons name="auto-awesome" size={18} color={Colors.primary} />
            <Text style={styles.aiTitle}>Smart Routing Tips</Text>
          </View>
          {AI_ROUTE_TIPS.map((tip, i) => (
            <Pressable
              key={i}
              onPress={() => setSelectedTip(i)}
              style={[styles.tipRow, selectedTip === i && styles.tipRowActive]}
            >
              <View style={[styles.tipNumber, selectedTip === i && { backgroundColor: Colors.primary }]}>
                <Text style={[styles.tipNumberText, selectedTip === i && { color: '#FFFFFF' }]}>{i + 1}</Text>
              </View>
              <Text style={[styles.tipText, selectedTip === i && { color: Colors.textPrimary, fontWeight: FontWeight.medium }]}>
                {tip}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Traffic & Weather */}
        <View style={styles.conditionsRow}>
          <View style={styles.conditionCard}>
            <MaterialIcons name="traffic" size={22} color={Colors.success} />
            <Text style={styles.conditionLabel}>Traffic</Text>
            <Text style={styles.conditionValue}>Light</Text>
          </View>
          <View style={styles.conditionCard}>
            <MaterialIcons name="wb-sunny" size={22} color="#F57C00" />
            <Text style={styles.conditionLabel}>Weather</Text>
            <Text style={styles.conditionValue}>Clear</Text>
          </View>
          <View style={styles.conditionCard}>
            <MaterialIcons name="speed" size={22} color={Colors.ngo} />
            <Text style={styles.conditionLabel}>Avg Speed</Text>
            <Text style={styles.conditionValue}>28 km/h</Text>
          </View>
        </View>
      </ScrollView>
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
  mapPlaceholder: {
    margin: Spacing.md,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadow.md,
  },
  mapBg: {
    height: 220,
    backgroundColor: '#E8F4EC',
    position: 'relative',
    overflow: 'hidden',
  },
  mapRow: {
    flexDirection: 'row',
    flex: 1,
  },
  mapCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#C8E6C9',
  },
  routeOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  routeLineH: {
    position: 'absolute',
    top: '55%',
    left: '25%',
    right: '40%',
    height: 3,
    backgroundColor: Colors.volunteer,
    borderRadius: 2,
  },
  routeLineV: {
    position: 'absolute',
    top: '15%',
    bottom: '25%',
    left: '60%',
    width: 3,
    backgroundColor: Colors.volunteer,
    borderRadius: 2,
  },
  mapMarker: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...Shadow.sm,
  },
  mapLabel: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  mapLabelText: { fontSize: FontSize.xs, color: Colors.textMuted },
  routeSummary: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Shadow.sm,
  },
  summaryItem: { flex: 1, alignItems: 'center', gap: 4 },
  summaryValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  summaryLabel: { fontSize: FontSize.xs, color: Colors.textMuted },
  summaryDivider: { width: 1, backgroundColor: Colors.border, marginVertical: 4 },
  sectionTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  waypointsCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  waypointRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  waypointIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  waypointInfo: { flex: 1 },
  waypointLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  waypointAddress: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  navBtn: { padding: 8 },
  waypointConnector: { flexDirection: 'row', alignItems: 'center', paddingLeft: 17, gap: 6, marginVertical: 4 },
  connectorLine: { width: 2, height: 20, backgroundColor: Colors.border },
  connectorDist: { fontSize: FontSize.xs, color: Colors.textMuted },
  aiCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  aiHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  aiTitle: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: Radius.md,
  },
  tipRowActive: { backgroundColor: Colors.primaryLight },
  tipNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  tipNumberText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.textSecondary },
  tipText: { flex: 1, fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 18 },
  conditionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  conditionCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 4,
    ...Shadow.sm,
  },
  conditionLabel: { fontSize: FontSize.xs, color: Colors.textMuted },
  conditionValue: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.textPrimary },
});
