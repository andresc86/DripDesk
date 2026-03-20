import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../constants/theme';

export default function CategoryChip({ label, active, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.chip, active && styles.active]} activeOpacity={0.9}>
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.chip,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
  },
  active: {
    backgroundColor: COLORS.chipActive,
    borderColor: COLORS.chipActive,
  },
  text: {
    color: COLORS.chipText,
    fontSize: 13,
    fontWeight: '600',
  },
  activeText: {
    color: COLORS.white,
  },
});
