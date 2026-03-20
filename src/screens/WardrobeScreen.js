import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import GarmentCard from '../components/GarmentCard';
import CategoryChip from '../components/CategoryChip';
import FloatingButton from '../components/FloatingButton';
import { COLORS } from '../constants/theme';
import { GARMENTS, CATEGORIES } from '../data/mockData';

export default function WardrobeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const filteredGarments = useMemo(() => {
    if (selectedCategory === 'Todas') return GARMENTS;
    return GARMENTS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <ScreenContainer>
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredGarments}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          columnWrapperStyle={{ gap: 14 }}
          ListHeaderComponent={
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Mi Armario</Text>
                <Text style={styles.subtitle}>
                  {GARMENTS.length} {GARMENTS.length === 1 ? 'prenda' : 'prendas'}
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsRow}
              >
                {CATEGORIES.map((category) => (
                  <CategoryChip
                    key={category}
                    label={category}
                    active={selectedCategory === category}
                    onPress={() => setSelectedCategory(category)}
                  />
                ))}
              </ScrollView>
            </>
          }
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <GarmentCard item={item} />
            </View>
          )}
        />

        <FloatingButton onPress={() => navigation.navigate('AddGarment')} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 110,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.muted,
  },
  chipsRow: {
    paddingBottom: 18,
    paddingTop: 2,
  },
  cardWrapper: {
    flex: 1,
  },
});
