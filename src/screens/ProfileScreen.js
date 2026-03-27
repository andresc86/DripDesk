import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { COLORS } from '../constants/theme';
import { auth } from '../services/firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const items = [
  'Estilo favorito: Casual elegante',
  'Colores preferidos: Blanco, negro y rosa',
  'Temporada: Todo el año',
  'Sincronización con Firebase: activa',
];

export default function ProfileScreen({ navigation }) {
  const [userName, setUserName] = useState('Usuario');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || 'Usuario');
        setUserEmail(user.email || '');
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              navigation.replace('Login');
            } catch (error) {
              console.log('LOGOUT ERROR:', error);
              Alert.alert('Error', 'No se pudo cerrar sesión');
            }
          },
        },
      ]
    );
  };

  const initial = userName?.trim()?.charAt(0)?.toUpperCase() || 'U';

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>

        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.mail}>{userEmail}</Text>

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

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
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
  logoutButton: {
    width: '100%',
    backgroundColor: '#E74C3C',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});