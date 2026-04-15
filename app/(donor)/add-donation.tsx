// Powered by OnSpace.AI
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, Pressable, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useDonations } from '@/hooks/useDonations';
import { useAlert } from '@/template';
import { FOOD_CATEGORIES, UrgencyLevel } from '@/services/mockData';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '@/constants/theme';

const URGENCY_OPTIONS: { value: UrgencyLevel; label: string; color: string }[] = [
  { value: 'low', label: 'Low (3+ days)', color: '#2E7D32' },
  { value: 'medium', label: 'Medium (1-2 days)', color: '#E65100' },
  { value: 'high', label: 'High (Today)', color: '#C62828' },
];

export default function AddDonationScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();
  const { addDonation } = useDonations();
  const { showAlert } = useAlert();

  const [foodItems, setFoodItems] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('Cooked Food');
  const [urgency, setUrgency] = useState<UrgencyLevel>('medium');
  const [expiryDate, setExpiryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const categoriesWithoutAll = FOOD_CATEGORIES.filter(c => c !== 'All');

  const handleSubmit = async () => {
    if (!foodItems.trim() || !quantity.trim() || !expiryDate.trim()) {
      showAlert('Missing Fields', 'Please fill in food items, quantity, and expiry date.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    addDonation({
      donorId: user?.id || 'donor_001',
      donorName: user?.organization || user?.name || '',
      donorAddress: user?.address || '',
      foodItems: foodItems.split(',').map(i => i.trim()).filter(Boolean),
      quantity,
      expiryDate,
      urgency,
      category,
      notes,
      coordinates: { lat: 12.9716, lng: 77.5946 },
    });
    setLoading(false);
    showAlert('Donation Listed!', 'Your food donation has been posted. NGOs can now request it.', [
      { text: 'View Dashboard', onPress: () => router.replace('/(donor)/') },
    ]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Add Donation</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.screen} contentContainerStyle={{ padding: Spacing.md, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Food Items *</Text>
          <TextInput
            style={styles.input}
            value={foodItems}
            onChangeText={setFoodItems}
            placeholder="e.g. Biryani, Dal, Roti (comma separated)"
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={2}
            accessibilityLabel="Food Items"
          />

          <Text style={styles.sectionLabel}>Quantity *</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="e.g. 20 kg or 50 servings"
            placeholderTextColor={Colors.textMuted}
            accessibilityLabel="Quantity"
          />

          <Text style={styles.sectionLabel}>Expiry Date *</Text>
          <TextInput
            style={styles.input}
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={Colors.textMuted}
            accessibilityLabel="Expiry Date"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
            {categoriesWithoutAll.map(cat => (
              <Pressable
                key={cat}
                onPress={() => setCategory(cat)}
                style={[styles.categoryChip, category === cat && styles.categoryChipActive]}
              >
                <Text style={[styles.categoryChipText, category === cat && styles.categoryChipTextActive]}>
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Urgency Level</Text>
          {URGENCY_OPTIONS.map(opt => (
            <Pressable
              key={opt.value}
              onPress={() => setUrgency(opt.value)}
              style={[styles.urgencyOption, urgency === opt.value && { borderColor: opt.color, backgroundColor: opt.color + '15' }]}
            >
              <View style={[styles.urgencyDot, { backgroundColor: opt.color }]} />
              <Text style={[styles.urgencyLabel, urgency === opt.value && { color: opt.color, fontWeight: FontWeight.semibold }]}>
                {opt.label}
              </Text>
              {urgency === opt.value && <MaterialIcons name="check-circle" size={18} color={opt.color} />}
            </Pressable>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Additional Notes</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Any special instructions or storage requirements..."
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            accessibilityLabel="Additional Notes"
          />
        </View>

        {/* AI suggestion */}
        <View style={styles.aiBox}>
          <MaterialIcons name="auto-awesome" size={18} color={Colors.primary} />
          <Text style={styles.aiText}>
            AI Tip: Cooked food with high urgency gets claimed 3x faster. Add clear pickup instructions!
          </Text>
        </View>

        <Pressable
          onPress={handleSubmit}
          disabled={loading}
          style={({ pressed }) => [styles.submitBtn, pressed && { opacity: 0.88 }]}
        >
          <MaterialIcons name="volunteer-activism" size={20} color="#FFFFFF" />
          <Text style={styles.submitBtnText}>{loading ? 'Posting...' : 'Post Donation'}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingBottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  sectionLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    marginBottom: 8,
    marginTop: 4,
  },
  input: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 11,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingVertical: 4,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipActive: {
    backgroundColor: Colors.donor,
    borderColor: Colors.donor,
  },
  categoryChipText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  urgencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  urgencyDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  urgencyLabel: {
    flex: 1,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  aiBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  aiText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.primaryDark,
    lineHeight: 18,
  },
  submitBtn: {
    backgroundColor: Colors.donor,
    borderRadius: Radius.md,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: Spacing.sm,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
});
