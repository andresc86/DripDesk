import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { COLORS } from '../constants/theme';

const items = [
  'Estilo favorito: Casual elegante',
  'Colores preferidos: Blanco, negro y rosa',
  'Temporada: Todo el año',
  'Sincronización con Firebase: pendiente',
];

export default function ProfileScreen() {
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>C</Text>
        </View>
        <Text style={styles.name}>Camilo Giraldo</Text>
        <Text style={styles.mail}>camilo@email.com</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Preferencias</Text>
          {items.map((item) => (
            <Text key={item} style={styles.item}>• {item}</Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estado del proyecto</Text>
          <Text style={styles.item}>
            Esta base ya está lista para seguir conectando Firebase, autenticación real y almacenamiento de prendas.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 34,
    alignItems: 'center',
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#FFDCE8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  mail: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 4,
    marginBottom: 24,
  },
  card: {
    width: '100%',
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
    marginBottom: 10,
  },
  item: {
    color: COLORS.muted,
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
});
