import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import GarmentCard from '../components/GarmentCard';
import { COLORS } from '../constants/theme';
import { registerForPushNotificationsAsync } from '../services/notificationService';
import { initDB, getGarments } from '../services/sqliteService';
import { auth } from '../services/firebaseConfig';

export default function HomeScreen({ navigation }) {
  const [localGarments, setLocalGarments] = useState([]);

  useEffect(() => {
    registerForPushNotificationsAsync();
    initDB();

    const loadLocal = async () => {
      const user = auth.currentUser;

      if (user) {
        const data = await getGarments(user.uid);
        console.log('🗄️ SQLite DATA:', data);
        setLocalGarments(data);
      }
    };

    setTimeout(loadLocal, 500);
  }, []);

  return (
    <ScreenContainer>
      <FlatList
        data={localGarments.slice(0, 4)} // 🔥 ahora usa SQLite
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        columnWrapperStyle={{ gap: 14 }}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.greeting}>Hola 👋</Text>
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
            <GarmentCard item={item} subtitle={item.type} />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Aún no tienes prendas guardadas
          </Text>
        }
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
  empty: {
    color: '#999',
    marginTop: 20,
    textAlign: 'center',
  },
});