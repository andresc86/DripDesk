import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../constants/theme';

export default function GarmentCard({ item, subtitle }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{subtitle || item.color}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F4F4F4',
  },
  body: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.muted,
  },
});
