// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, FontWeight } from '@/constants/theme';

interface AvatarCircleProps {
  initials: string;
  size?: number;
  bgColor?: string;
  textColor?: string;
}

export function AvatarCircle({ initials, size = 40, bgColor = Colors.primaryLight, textColor = Colors.primary }: AvatarCircleProps) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: bgColor }]}>
      <Text style={[styles.text, { color: textColor, fontSize: size * 0.35 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: FontWeight.bold,
  },
});
