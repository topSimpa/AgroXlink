import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    RedHatDisplay: require("../assets/fonts/RedHatDisplay.ttf"),
    RedHatText: require("../assets/fonts/RedHatText.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return fontsLoaded;
}
