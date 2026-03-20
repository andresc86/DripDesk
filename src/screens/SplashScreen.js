import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { COLORS } from '../constants/theme';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.logoBox}>
          <Text style={styles.sparkle}>✦</Text>
        </View>
        <Text style={styles.title}>Armario Digital</Text>
        <Text style={styles.subtitle}>Tu estilo, organizado</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: COLORS.background,
  },
  logoBox: {
    width: 84,
    height: 84,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  sparkle: {
    fontSize: 40,
    color: COLORS.primary,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: COLORS.muted,
  },
});
