import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import ScreenContainer from '../components/ScreenContainer';
import AppTextInput from '../components/AppTextInput';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../constants/theme';
import { auth, db } from '../services/firebaseConfig';

export default function AddGarmentScreen({ navigation }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [occasion, setOccasion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveGarment = async () => {
    if (!name.trim() || !type.trim() || !color.trim() || !occasion.trim()) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert('Error', 'No hay usuario autenticado');
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, 'garments'), {
        name: name.trim(),
        type: type.trim(),
        color: color.trim(),
        occasion: occasion.trim(),
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Éxito', 'Prenda guardada correctamente');

      setName('');
      setType('');
      setColor('');
      setOccasion('');

      navigation.goBack();
    } catch (error) {
      console.log('ADD GARMENT ERROR:', error);
      Alert.alert('Error', 'No se pudo guardar la prenda');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Agregar prenda</Text>
        <Text style={styles.subtitle}>Registra una nueva prenda en tu armario</Text>

        <View style={styles.form}>
          <AppTextInput
            label="Nombre de la prenda"
            placeholder="Ej: Camisa blanca"
            value={name}
            onChangeText={setName}
          />

          <AppTextInput
            label="Tipo"
            placeholder="Ej: Camisa, pantalón, falda..."
            value={type}
            onChangeText={setType}
          />

          <AppTextInput
            label="Color"
            placeholder="Ej: Blanco"
            value={color}
            onChangeText={setColor}
          />

          <AppTextInput
            label="Ocasión"
            placeholder="Ej: Casual, formal, deportiva"
            value={occasion}
            onChangeText={setOccasion}
          />

          <PrimaryButton
            title={loading ? 'Guardando...' : 'Guardar prenda'}
            onPress={handleSaveGarment}
            style={{ marginTop: 12 }}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 28,
  },
  form: {
    gap: 4,
  },
});