import { FontFamily, FontSize, Colors } from '@/theme';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Question } from '@/types/api';

export default function QuestionCard({ question }: { question: Question }) {
  return (
    <View style={styles.questionCard}>
      <Image source={{ uri: question.image_uri }} style={styles.questionImage} />
      <View style={styles.questionTextWrap}>
        <Text style={styles.questionTitle} numberOfLines={2}>
          {question.title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  questionCard: {
    width: 240,
    height: 164,
    borderRadius: 12,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  questionImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  questionTextWrap: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 13,
  },
  questionTitle: {
    fontFamily: FontFamily.rubikMedium,
    fontSize: FontSize.lg,
    color: Colors.white,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
});
