import { View, Text } from 'react-native';
import { Colors } from '@/theme';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.backgroundPrimary }}>
      <Text style={{ fontFamily: 'Rubik-Regular', color: Colors.textMuted }}>Profile</Text>
    </View>
  );
}
