// Powered by OnSpace.AI
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, Pressable,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/services/mockData';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';
import { useAlert } from '@/template';

const ROLE_CONFIG = {
  donor: { label: 'Food Donor', color: Colors.donor, icon: 'storefront' as const, hint: 'Restaurant, Hotel or Individual' },
  ngo: { label: 'NGO / Food Bank', color: Colors.ngo, icon: 'volunteer-activism' as const, hint: 'Non-Profit Organization' },
  volunteer: { label: 'Volunteer', color: Colors.volunteer, icon: 'directions-bike' as const, hint: 'Delivery Partner' },
};

export default function LoginScreen() {
  const { role } = useLocalSearchParams<{ role: string }>();
  const router = useRouter();
  const { login } = useAuth();
  const { showAlert } = useAlert();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const userRole = (role as UserRole) || 'donor';
  const config = ROLE_CONFIG[userRole];

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showAlert('Missing Fields', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      const success = await login(userRole, email.trim(), password);
      if (success) {
        if (userRole === 'donor') router.replace('/(donor)/');
        else if (userRole === 'ngo') router.replace('/(ngo)/');
        else router.replace('/(volunteer)/');
      }
    } catch (err) {
      showAlert('Login Failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: config.color }]}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top area */}
        <View style={[styles.topArea, { paddingTop: insets.top + Spacing.md }]}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
          >
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>

          <View style={styles.roleDisplay}>
            <View style={[styles.roleIconCircle, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <MaterialIcons name={config.icon} size={36} color="#FFFFFF" />
            </View>
            <Text style={styles.roleLabel}>{config.label}</Text>
            <Text style={styles.roleHint}>{config.hint}</Text>
          </View>
        </View>

        {/* Form */}
        <View style={[styles.formCard, { paddingBottom: insets.bottom + Spacing.lg }]}>
          {/* Mock badge */}
          <View style={styles.mockBadge}>
            <MaterialIcons name="info-outline" size={13} color={config.color} />
            <Text style={[styles.mockText, { color: config.color }]}>
              MOCK LOGIN — Use any credentials
            </Text>
          </View>

          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.welcomeSub}>Sign in to continue as {config.label}</Text>

          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={Colors.textMuted}
            accessibilityLabel="Email Address"
          />

          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
              placeholderTextColor={Colors.textMuted}
              accessibilityLabel="Password"
            />
            <Pressable
              onPress={() => setShowPass(!showPass)}
              style={styles.eyeBtn}
            >
              <MaterialIcons name={showPass ? 'visibility' : 'visibility-off'} size={20} color={Colors.textMuted} />
            </Pressable>
          </View>

          <Pressable
            onPress={handleLogin}
            disabled={loading}
            style={({ pressed }) => [
              styles.loginBtn,
              { backgroundColor: config.color },
              pressed && { opacity: 0.88 },
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginBtnText}>Sign In</Text>
            )}
          </Pressable>

          <Text style={styles.hintText}>
            Default: test@example.com / 123456
          </Text>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.switchRoleBtn, pressed && { opacity: 0.7 }]}
          >
            <Text style={[styles.switchRoleText, { color: config.color }]}>Switch Role</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topArea: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  roleDisplay: {
    alignItems: 'center',
    gap: 8,
  },
  roleIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleLabel: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },
  roleHint: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.75)',
  },
  formCard: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: Spacing.lg,
    flex: 1,
  },
  mockBadge: {
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
    fontWeight: FontWeight.semibold,
  },
  welcomeText: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  welcomeSub: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
    marginBottom: 6,
    marginTop: 2,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  passwordRow: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  passwordInput: {
    marginBottom: 0,
    paddingRight: 48,
  },
  eyeBtn: {
    position: 'absolute',
    right: Spacing.md,
    top: 12,
    padding: 2,
  },
  loginBtn: {
    borderRadius: Radius.md,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    ...Shadow.sm,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
  hintText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
    gap: Spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  switchRoleBtn: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  switchRoleText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
  },
});
