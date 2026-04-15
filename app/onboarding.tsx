// Powered by OnSpace.AI
import React from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView, Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/services/mockData';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';

const { width } = Dimensions.get('window');

const ROLES = [
  {
    role: 'donor' as UserRole,
    title: 'Food Donor',
    subtitle: 'Restaurant, Hotel, or Individual',
    description: 'List surplus food, approve NGO requests, and track deliveries.',
    icon: 'storefront' as const,
    color: Colors.donor,
    lightColor: Colors.donorLight,
    features: ['Add food donations', 'Manage NGO requests', 'Track volunteers'],
  },
  {
    role: 'ngo' as UserRole,
    title: 'NGO / Food Bank',
    subtitle: 'Non-Profit Organization',
    description: 'Find available food donations and coordinate with volunteers.',
    icon: 'volunteer-activism' as const,
    color: Colors.ngo,
    lightColor: Colors.ngoLight,
    features: ['Browse donations', 'Request food', 'Assign volunteers'],
  },
  {
    role: 'volunteer' as UserRole,
    title: 'Volunteer',
    subtitle: 'Delivery Partner',
    description: 'Accept pickup requests and deliver food to those in need.',
    icon: 'directions-bike' as const,
    color: Colors.volunteer,
    lightColor: Colors.volunteerLight,
    features: ['View requests', 'Get AI route tips', 'Track deliveries'],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { setSelectedRole } = useAuth();
  const insets = useSafeAreaInsets();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    router.push({ pathname: '/login', params: { role } });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={[styles.heroContainer, { paddingTop: insets.top + Spacing.md }]}>
        <Image
          source={require('@/assets/images/onboarding-hero.png')}
          style={styles.heroImage}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.heroOverlay}>
          <View style={styles.logoRow}>
            <Image
              source={require('@/assets/images/food-rescue-logo.png')}
              style={styles.logo}
              contentFit="contain"
              transition={200}
            />
            <View>
              <Text style={styles.appName}>FoodRescue</Text>
              <Text style={styles.appTagline}>No food wasted. No one hungry.</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.pickRoleTitle}>Choose Your Role</Text>
        <Text style={styles.pickRoleSubtitle}>How will you contribute to ending food waste?</Text>

        {/* Mock Login Notice */}
        <View style={styles.mockNotice}>
          <MaterialIcons name="info-outline" size={14} color={Colors.primary} />
          <Text style={styles.mockText}>DEMO MODE — Any credentials accepted after role selection</Text>
        </View>

        {ROLES.map((item) => (
          <Pressable
            key={item.role}
            onPress={() => handleRoleSelect(item.role)}
            style={({ pressed }) => [
              styles.roleCard,
              pressed && { opacity: 0.93, transform: [{ scale: 0.99 }] },
            ]}
          >
            <View style={[styles.roleIconBox, { backgroundColor: item.lightColor }]}>
              <MaterialIcons name={item.icon} size={32} color={item.color} />
            </View>
            <View style={styles.roleBody}>
              <View style={styles.roleTitleRow}>
                <Text style={styles.roleTitle}>{item.title}</Text>
                <MaterialIcons name="arrow-forward-ios" size={14} color={Colors.textMuted} />
              </View>
              <Text style={styles.roleSubtitle}>{item.subtitle}</Text>
              <Text style={styles.roleDescription}>{item.description}</Text>
              <View style={styles.featuresList}>
                {item.features.map((f, i) => (
                  <View key={i} style={styles.featureItem}>
                    <View style={[styles.featureDot, { backgroundColor: item.color }]} />
                    <Text style={styles.featureText}>{f}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Pressable>
        ))}

        {/* Impact Stats */}
        <View style={styles.impactBox}>
          <Text style={styles.impactTitle}>Our Community Impact</Text>
          <View style={styles.impactStats}>
            {[
              { value: '2.4T', label: 'kg food saved' },
              { value: '340', label: 'NGOs served' },
              { value: '1.2K', label: 'volunteers' },
            ].map((stat, i) => (
              <View key={i} style={styles.impactStat}>
                <Text style={styles.impactValue}>{stat.value}</Text>
                <Text style={styles.impactLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {},
  heroContainer: {
    height: 220,
    backgroundColor: Colors.primaryDark,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10,58,42,0.55)',
    padding: Spacing.md,
    justifyContent: 'flex-end',
    paddingBottom: Spacing.lg,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  appName: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },
  appTagline: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  body: {
    padding: Spacing.md,
    paddingTop: Spacing.lg,
  },
  pickRoleTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  pickRoleSubtitle: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  mockNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.sm,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mockText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
    flex: 1,
  },
  roleCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    gap: Spacing.md,
    ...Shadow.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  roleIconBox: {
    width: 64,
    height: 64,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  roleBody: {
    flex: 1,
  },
  roleTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roleTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  roleSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 1,
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 8,
  },
  featuresList: {
    gap: 3,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  featureText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  impactBox: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginTop: Spacing.sm,
  },
  impactTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.textInverse,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  impactStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  impactStat: {
    alignItems: 'center',
  },
  impactValue: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  impactLabel: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
});
