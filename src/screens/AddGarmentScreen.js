import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import AppTextInput from '../components/AppTextInput';
import PrimaryButton from '../components/PrimaryButton';
import CategoryChip from '../components/CategoryChip';
import { COLORS } from '../constants/theme';
import { CATEGORIES } from '../data/mockData';

const colors = ['Blanco', 'Negro', 'Azul', 'Rosa', 'Beige', 'Rojo'];
const stylesList = ['Casual', 'Formal', 'Sport', 'Streetwear'];

export default function AddGarmentScreen({ navigation }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Camisetas');
  const [color, setColor] = useState('Blanco');
  const [styleName, setStyleName] = useState('Casual');

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Agregar prenda</Text>
        <Text style={styles.subtitle}>Añade una nueva pieza a tu armario digital.</Text>

        <TouchableOpacity style={styles.photoBox} activeOpacity={0.9}>
          <Text style={styles.photoIcon}>📷</Text>
          <Text style={styles.photoText}>Subir foto</Text>
          <Text style={styles.photoHint}>Cámara o galería</Text>
        </TouchableOpacity>

        <AppTextInput label="Nombre de la prenda" placeholder="Ej. Blazer beige" value={name} onChangeText={setName} />

        <Text style={styles.sectionLabel}>Categoría</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
          {CATEGORIES.filter((c) => c !== 'Todas').map((item) => (
            <CategoryChip key={item} label={item} active={category === item} onPress={() => setCategory(item)} />
          ))}
        </ScrollView>

        <Text style={styles.sectionLabel}>Color</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
          {colors.map((item) => (
            <CategoryChip key={item} label={item} active={color === item} onPress={() => setColor(item)} />
          ))}
        </ScrollView>

        <Text style={styles.sectionLabel}>Estilo</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
          {stylesList.map((item) => (
            <CategoryChip key={item} label={item} active={styleName === item} onPress={() => setStyleName(item)} />
          ))}
        </ScrollView>

        <PrimaryButton
          title="Guardar prenda"
          onPress={() => {
            Alert.alert('Listo', 'La estructura de la pantalla quedó preparada para conectar Firebase después.');
            navigation.goBack();
          }}
          style={{ marginTop: 8 }}
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
    marginBottom: 22,
  },
  photoBox: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
  },
  photoIcon: {
    fontSize: 30,
    marginBottom: 6,
  },
  photoText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  photoHint: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 10,
    marginTop: 6,
    fontWeight: '600',
  },
  row: {
    paddingBottom: 16,
  },
});
