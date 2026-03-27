import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

import ScreenContainer from '../../components/ScreenContainer';
import AppTextInput from '../../components/AppTextInput';
import PrimaryButton from '../../components/PrimaryButton';
import { COLORS } from '../../constants/theme';
import { auth, db } from '../../services/firebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener mínimo 6 caracteres');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name.trim(),
      });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name.trim(),
        email: user.email,
        createdAt: serverTimestamp(),
      });

      // No navegues manualmente.
      // AppNavigator detecta la sesión y entra solo.
    } catch (error) {
      console.log('REGISTER ERROR:', error);

      let message = 'No se pudo crear la cuenta';

      if (error.code === 'auth/email-already-in-use') {
        message = 'Este correo ya está registrado';
      } else if (error.code === 'auth/invalid-email') {
        message = 'El correo no es válido';
      } else if (error.code === 'auth/weak-password') {
        message = 'La contraseña es muy débil';
      }

      Alert.alert('Error', message);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Text style={styles.sparkle}>✦</Text>
          </View>
          <Text style={styles.title}>Crea tu cuenta</Text>
          <Text style={styles.subtitle}>Organiza tu armario hoy</Text>
        </View>

        <View style={styles.form}>
          <AppTextInput
            label="Nombre"
            placeholder="Tu nombre"
            value={name}
            onChangeText={setName}
          />

          <AppTextInput
            label="Correo electrónico"
            placeholder="tu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <AppTextInput
            label="Contraseña"
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <PrimaryButton
            title="Crear cuenta"
            onPress={handleRegister}
            style={{ marginTop: 8 }}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.footerButton}
        >
          <Text style={styles.footerText}>
            ¿Ya tienes cuenta? <Text style={styles.link}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logoBox: {
    width: 66,
    height: 66,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  sparkle: {
    fontSize: 30,
    color: COLORS.primary,
  },
  title: {
    fontSize: 28,
    color: COLORS.text,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 14,
  },
  link: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});