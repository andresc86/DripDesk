import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import GarmentCard from '../components/GarmentCard';
import AppTextInput from '../components/AppTextInput';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../constants/theme';
import { GARMENTS } from '../data/mockData';

export default function CreateOutfitScreen({ navigation }) {
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Crear outfit</Text>
        <Text style={styles.subtitle}>Selecciona prendas y guarda tu combinación.</Text>

        <AppTextInput label="Nombre del outfit" placeholder="Ej. Look de viernes" />

        <Text style={styles.sectionTitle}>Vista previa</Text>
        <View style={styles.previewBox}>
          <Text style={styles.previewText}>Aquí podrás combinar superior, inferior y zapatos.</Text>
        </View>

        <Text style={styles.sectionTitle}>Prendas sugeridas</Text>
        <View style={styles.grid}>
          {GARMENTS.slice(0, 4).map((item) => (
            <View key={item.id} style={styles.gridItem}>
              <GarmentCard item={item} subtitle={item.category} />
            </View>
          ))}
        </View>

        <PrimaryButton
          title="Guardar outfit"
          onPress={() => navigation.goBack()}
          style={{ marginTop: 10 }}
        />
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
    marginTop: 4,
  },
  previewBox: {
    height: 140,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  previewText: {
    color: COLORS.muted,
    textAlign: 'center',
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
  },
});
