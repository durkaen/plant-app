import { Colors, FontFamily, FontSize, Spacing } from '@/theme';
import { ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchIcon from '../../../assets/images/design/home/icon-search.svg';

const HEADER_BG_IMAGE = require('../../../assets/images/design/home/home-header-bg.png');

export default function HomeHeader() {
  const greeting = getGreeting();

  return (
    <ImageBackground
      source={HEADER_BG_IMAGE}
      style={styles.headerBg}
      resizeMode="cover"
    >
      <SafeAreaView edges={['top']}>
        <View style={styles.headerContent}>
          <Text style={styles.headerSub}>Hi, plant lover!</Text>
          <Text style={styles.headerTitle}>{greeting}</Text>

          <View style={styles.searchBar}>
            <SearchIcon width={20} height={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for plants"
              placeholderTextColor="#AFAFAF"
              returnKeyType="search"
              hitSlop={Spacing[4]}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning! ☀️';
  if (hour < 17) return 'Good Afternoon! ⛅';
  return 'Good Evening! 🌙';
}

const styles = StyleSheet.create({
  headerBg: {
    paddingBottom: Spacing[6],
  },
  headerContent: {
    paddingHorizontal: Spacing[6],
    paddingTop: Spacing[4],
    gap: 6,
  },
  headerSub: {
    fontFamily: FontFamily.rubikRegular,
    fontSize: FontSize.xl,
    color: Colors.textPrimary,
    letterSpacing: 0.07,
  },
  headerTitle: {
    fontFamily: FontFamily.rubikMedium,
    fontSize: FontSize['4xl'],
    color: Colors.textPrimary,
    letterSpacing: 0.35,
    lineHeight: 28,
    marginBottom: Spacing[3],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 0.2,
    borderColor: 'rgba(60,60,67,0.25)',
    paddingHorizontal: Spacing[4],
    paddingVertical: process.env.EXPO_OS === 'ios' ? Spacing[3] : Spacing[1],
    gap: Spacing[2],
  },
  searchInput: {
    flex: 1,
    fontFamily: FontFamily.rubikRegular,
    fontSize: 15.5,
    color: Colors.textPrimary,
    letterSpacing: 0.07,
  },
});
