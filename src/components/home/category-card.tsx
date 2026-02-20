import { Colors, FontFamily, FontSize } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { Category } from '@/types/api';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Pressable style={styles.categoryCard}>
      <LinearGradient
        colors={['#FFFFFF', '#F9FFFA']}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={styles.categoryTitle}>{category.title}</Text>
      <Image
        source={{ uri: category.image.url }}
        style={styles.categoryImage}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    flex: 1,
    aspectRatio: 158 / 152,
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 0.5,
    borderColor: 'rgba(60,60,67,0.1)',
    overflow: 'hidden',
  },
  categoryTitle: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 72,
    fontFamily: FontFamily.rubikMedium,
    fontSize: FontSize.xl,
    color: Colors.textPrimary,
    letterSpacing: -0.32,
    lineHeight: 21,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
});
