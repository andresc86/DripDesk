import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../constants/theme';
import { OUTFITS } from '../data/mockData';

export default function OutfitsScreen({ navigation }) {
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Mis Outfits</Text>
        <Text style={styles.subtitle}>Combinaciones guardadas para vestir más rápido.</Text>

        <PrimaryButton
          title="Crear nuevo outfit"
          onPress={() => navigation.navigate('CreateOutfit')}
          style={{ marginBottom: 22 }}
        />

        {OUTFITS.map((outfit) => (
          <View key={outfit.id} style={styles.card}>
            <Text style={styles.cardTitle}>{outfit.name}</Text>
            {outfit.pieces.map((piece) => (
              <Text key={piece} style={styles.piece}>• {piece}</Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 34,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 15,
    marginBottom: 22,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  piece: {
    color: COLORS.muted,
    fontSize: 14,
    marginBottom: 4,
  },
});
