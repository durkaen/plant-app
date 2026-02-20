import { Colors, Spacing } from '@/theme';
import { useGetCategoriesQuery, useGetQuestionsQuery } from '@/store/api/plant-api';
import { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Category } from '@/types/api';
import HomeHeader from '@/components/home/home-header';
import HomeListHeader from '@/components/home/home-list-header';
import CategoryCard from '@/components/home/category-card';

const categoryKeyExtractor = (item: Category | null) =>
  item ? String(item.id) : '__placeholder__';

const renderCategoryItem = ({ item }: { item: Category | null }) =>
  item ? (
    <CategoryCard category={item} />
  ) : (
    <View style={styles.categoryCardPlaceholder} />
  );

const CategoryRowSeparator = () => <View style={{ height: Spacing[4] }} />;

export default function HomeScreen() {
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: questions } = useGetQuestionsQuery();

  const paddedCategories = useMemo<(Category | null)[]>(
    () => {
      const categories = categoriesData?.data ?? [];
      return (categories.length % 2 !== 0 ? [...categories, null] : categories);
    },
    [categoriesData],
  );

  const renderListHeader = useCallback(
    () => <HomeListHeader questions={questions} />,
    [questions],
  );

  return (
    <View style={styles.container}>
      <HomeHeader />

      <FlatList
        data={paddedCategories}
        keyExtractor={categoryKeyExtractor}
        numColumns={2}
        renderItem={renderCategoryItem}
        ListHeaderComponent={renderListHeader}
        columnWrapperStyle={styles.categoryRow}
        ItemSeparatorComponent={CategoryRowSeparator}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },

  /* ─── FlatList ─── */
  listContent: {
    paddingBottom: 100,
  },

  /* ─── Category Grid ─── */
  categoryRow: {
    paddingHorizontal: Spacing[6],
    gap: 11,
  },
  categoryCardPlaceholder: {
    flex: 1,
    aspectRatio: 158 / 152,
  },
});
