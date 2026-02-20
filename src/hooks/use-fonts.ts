import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export function useFonts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Rubik-Light': require('../../assets/fonts/rubik-static/Rubik-Light.ttf'),
      'Rubik-Regular': require('../../assets/fonts/rubik-static/Rubik-Regular.ttf'),
      'Rubik-Medium': require('../../assets/fonts/rubik-static/Rubik-Medium.ttf'),
      'Rubik-SemiBold': require('../../assets/fonts/rubik-static/Rubik-SemiBold.ttf'),
      'Rubik-Bold': require('../../assets/fonts/rubik-static/Rubik-Bold.ttf'),
      'Rubik-ExtraBold': require('../../assets/fonts/rubik-static/Rubik-ExtraBold.ttf'),
      'VisbyExtrabold': require('../../assets/fonts/visby/VisbyExtrabold.otf'),
    }).then(() => setLoaded(true));
  }, []);

  return loaded;
}
