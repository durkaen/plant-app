import { Colors, FontFamily, FontSize, Spacing } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Question } from '@/types/api';
import PremiumBanner from './premium-banner';
import QuestionCard from './question-card';

const questionKeyExtractor = (q: Question) => String(q.id);

const renderQuestionCard = ({ item }: { item: Question }) => (
  <QuestionCard question={item} />
);

export default function HomeListHeader({ questions }: { questions?: Question[] }) {
  return (
    <View style={styles.listHeader}>
      <PremiumBanner />

      {questions && questions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get Started</Text>
          <View style={styles.questionListWrapper}>
            <FlatList
              horizontal
              data={questions}
              keyExtractor={questionKeyExtractor}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.questionListContent}
              renderItem={renderQuestionCard}
            />
            <LinearGradient
              colors={['rgba(255,255,255,0.68)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)']}
              locations={[0, 0.31, 1]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.questionListShade}
              pointerEvents="none"
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    paddingHorizontal: Spacing[6],
    paddingTop: Spacing[6],
    paddingBottom: Spacing[6],
    gap: Spacing[6],
  },
  section: {
    gap: Spacing[4],
  },
  sectionTitle: {
    fontFamily: FontFamily.rubikMedium,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
    letterSpacing: -0.24,
    lineHeight: 20,
  },
  questionListWrapper: {
    marginHorizontal: -Spacing[6],
  },
  questionListContent: {
    paddingHorizontal: Spacing[6],
    gap: 10,
  },
  questionListShade: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 102,
    pointerEvents: 'none',
  },
});
