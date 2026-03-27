import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { signOut, updateProfile } from 'firebase/auth';

import ScreenContainer from '../components/ScreenContainer';
import AppTextInput from '../components/AppTextInput';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../constants/theme';
import { auth, db } from '../services/firebaseConfig';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [favoriteStyle, setFavoriteStyle] = useState('');
  const [favoriteColors, setFavoriteColors] = useState('');
  const [season, setSeason] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const currentUser = auth.currentUser;

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);

      setEmail(currentUser.email || '');

      if (userSnap.exists()) {
        const data = userSnap.data();
        setName(data.name || currentUser.displayName || '');
        setFavoriteStyle(data.favoriteStyle || '');
        setFavoriteColors(data.favoriteColors || '');
        setSeason(data.season || '');
      } else {
        setName(currentUser.displayName || '');
      }
    } catch (error) {
      console.log('LOAD PROFILE ERROR:', error);
      Alert.alert('Error', 'No se pudo cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!currentUser) {
      Alert.alert('Error', 'No hay usuario autenticado');
      return;
    }

    if (!name.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }

    try {
      setSaving(true);

      await updateProfile(currentUser, {
        displayName: name.trim(),
      });

      await setDoc(
        doc(db, 'users', currentUser.uid),
        {
          uid: currentUser.uid,
          name: name.trim(),
          email: currentUser.email || '',
          favoriteStyle: favoriteStyle.trim(),
          favoriteColors: favoriteColors.trim(),
          season: season.trim(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } catch (error) {
      console.log('SAVE PROFILE ERROR:', error);
      Alert.alert('Error', 'No se pudo guardar el perfil');
    } finally {
      setSaving(false);
    }
  };

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
            } catch (error) {
              console.log('LOGOUT ERROR:', error);
              Alert.alert('Error', 'No se pudo cerrar sesión');
            }
          },
        },
      ]
    );
  };

  const initial = name?.trim()?.charAt(0)?.toUpperCase() || 'U';

  if (loading) {
    return (
      <ScreenContainer>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Cargando perfil...</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>

        <Text style={styles.screenTitle}>Mi perfil</Text>
        <Text style={styles.screenSubtitle}>Edita tu información personal</Text>

        <View style={styles.card}>
          <AppTextInput
            label="Nombre"
            placeholder="Tu nombre"
            value={name}
            onChangeText={setName}
          />

          <AppTextInput
            label="Correo electrónico"
            placeholder="tu@email.com"
            value={email}
            editable={false}
          />

          <AppTextInput
            label="Estilo favorito"
            placeholder="Ej: Casual elegante"
            value={favoriteStyle}
            onChangeText={setFavoriteStyle}
          />

          <AppTextInput
            label="Colores preferidos"
            placeholder="Ej: Blanco, negro y rosa"
            value={favoriteColors}
            onChangeText={setFavoriteColors}
          />

          <AppTextInput
            label="Temporada"
            placeholder="Ej: Todo el año"
            value={season}
            onChangeText={setSeason}
          />

          <PrimaryButton
            title={saving ? 'Guardando...' : 'Guardar cambios'}
            onPress={handleSaveProfile}
            style={{ marginTop: 12 }}
          />
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.muted,
    fontSize: 14,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#FFDCE8',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  screenSubtitle: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#E74C3C',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});