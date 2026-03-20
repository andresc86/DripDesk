import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import GarmentCard from '../components/GarmentCard';
import { COLORS } from '../constants/theme';
import { GARMENTS } from '../data/mockData';

export default function HomeScreen({ navigation }) {
  return (
    <ScreenContainer>
      <FlatList
        data={GARMENTS.slice(0, 4)}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        columnWrapperStyle={{ gap: 14 }}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.greeting}>Hola, Camilo 👋</Text>
              <Text style={styles.subtitle}>¿Qué quieres vestir hoy?</Text>
            </View>

            <PrimaryButton
              title="Crear Outfit"
              onPress={() => navigation.navigate('CreateOutfit')}
              icon={<Text style={styles.iconPlus}>＋</Text>}
              style={styles.mainButton}
            />

            <Text style={styles.sectionTitle}>Prendas recientes</Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <GarmentCard item={item} subtitle={item.category} />
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 34,
  },
  header: {
    marginBottom: 22,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.muted,
  },
  mainButton: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  cardWrapper: {
    flex: 1,
  },
  iconPlus: {
    color: '#FFF',
    fontSize: 18,
    marginRight: 2,
  },
});
