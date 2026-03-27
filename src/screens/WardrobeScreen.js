import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs } from 'firebase/firestore';

import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../constants/theme';
import { auth, db } from '../services/firebaseConfig';

export default function WardrobeScreen() {
  const navigation = useNavigation();
  const [garments, setGarments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGarments = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log('No hay usuario autenticado');
      setGarments([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      console.log('USER ACTUAL:', currentUser.uid);

      const q = query(
        collection(db, 'garments'),
        where('userId', '==', currentUser.uid)
      );

      const querySnapshot = await getDocs(q);

      const garmentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('PRENDAS CARGADAS:', garmentsData);

      setGarments(garmentsData);
    } catch (error) {
      console.log('LOAD GARMENTS ERROR:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadGarments();
    }, [])
  );

  const renderGarment = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.info}>Tipo: {item.type}</Text>
      <Text style={styles.info}>Color: {item.color}</Text>
      <Text style={styles.info}>Ocasión: {item.occasion}</Text>
    </View>
  );

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Mi armario</Text>
            <Text style={styles.subtitle}>Aquí puedes ver tus prendas registradas</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddGarment')}
          >
            <Text style={styles.addButtonText}>+ Agregar</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.emptyText}>Cargando prendas...</Text>
          </View>
        ) : garments.length === 0 ? (
          <View style={styles.centerContent}>
            <Text style={styles.emptyTitle}>Aún no tienes prendas</Text>
            <Text style={styles.emptyText}>
              Agrega tu primera prenda para comenzar a organizar tu armario.
            </Text>

            <PrimaryButton
              title="Agregar prenda"
              onPress={() => navigation.navigate('AddGarment')}
              style={{ marginTop: 16 }}
            />
          </View>
        ) : (
          <FlatList
            data={garments}
            keyExtractor={(item) => item.id}
            renderItem={renderGarment}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 26,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 13,
  },
  listContent: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 4,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 280,
    lineHeight: 20,
  },
});