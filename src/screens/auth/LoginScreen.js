import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';

import ScreenContainer from '../../components/ScreenContainer';
import AppTextInput from '../../components/AppTextInput';
import PrimaryButton from '../../components/PrimaryButton';
import { COLORS } from '../../constants/theme';
import { auth } from '../../services/firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // No navegues manualmente.
      // AppNavigator detecta la sesión y entra solo.
    } catch (error) {
      console.log('LOGIN ERROR:', error);

      let message = 'No se pudo iniciar sesión';

      if (error.code === 'auth/invalid-email') {
        message = 'El correo no es válido';
      } else if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        message = 'Correo o contraseña incorrectos';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Demasiados intentos. Intenta más tarde';
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
          <Text style={styles.title}>Bienvenido de nuevo</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        </View>

        <View style={styles.form}>
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
            title="Iniciar sesión"
            onPress={handleLogin}
            style={{ marginTop: 8 }}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.footerButton}
        >
          <Text style={styles.footerText}>
            ¿No tienes cuenta? <Text style={styles.link}>Regístrate</Text>
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
    marginBottom: 34,
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