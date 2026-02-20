import { Colors, FontFamily, FontSize } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { DiagnoseIcon, GardenIcon, HomeIcon, ProfileIcon, ScannerIcon } from '../../../assets/images/design/tabbar';

export default function HomeTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontFamily: FontFamily.rubikRegular,
          fontSize: FontSize.sm,
          lineHeight: FontSize.sm,
          letterSpacing: -0.24,
          marginTop: 5,
        },
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderTopWidth: 0.5,
          borderTopColor: 'rgba(19, 35, 27, 0.1)',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon fill={color} width={25} height={25} />,
        }}
      />
      <Tabs.Screen
        name="diagnose"
        options={{
          title: 'Diagnose',
          tabBarIcon: ({ color }) => <DiagnoseIcon fill={color} width={25} height={25} />,
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: '',
          tabBarIcon: () => (
            <TouchableOpacity
              style={styles.scannerWrapper}
              activeOpacity={0.85}
              onPress={() => router.push('/scanner')}
            >
              <LinearGradient
                colors={[Colors.primary, '#2CCC80']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.scannerButton}
              >
                <ScannerIcon width={28} height={28} />
              </LinearGradient>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="my-garden"
        options={{
          title: 'My Garden',
          tabBarIcon: ({ color }) => <GardenIcon fill={color} width={25} height={25} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <ProfileIcon fill={color} width={25} height={25} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  scannerWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 24,
    boxShadow: '0px 4px 8px 0px rgba(40, 175, 110, 0.45)',
  },
  scannerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.24)',
  },
});
