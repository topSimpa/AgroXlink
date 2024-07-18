import React from "react";
import {
  Button,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import neutral from "../config/neutralColor";
import primary from "../config/primaryColor";
// import { useFonts } from "expo-font";
// import header from "../config/header";
// import AppLoading from "expo-app-loading";

function OnboardingScreen() {
  // const [fontsLoaded] = useFonts({
  //   rHat: require("../assets/fonts/RedHatText-VariableFont_wght.ttf"),
  //   italic: require("../assets/fonts/RedHatText-Italic-VariableFont_wght.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading></AppLoading>;
  // }

  return (
    <ImageBackground
      source={require("../assets/01.png")}
      style={styles.imageBackground}
    >
      <Text style={styles.brandName}>AgroXlink</Text>

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Limitless Market</Text>
          <Text style={styles.title}>Access</Text>
        </View>
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>
            Market your produce, Engage with buyers
          </Text>
          <Text style={styles.caption}>
            Complete your transaction directly through chat
          </Text>
        </View>
        <View style={styles.page}>
          <View style={styles.circle}></View>
          <View style={styles.circle}></View>
          <View style={styles.circle}></View>
        </View>
        <View style={styles.enter}>
          <View style={styles.button}>
            <Text style={styles.getStarted}>Let's Get Started</Text>
          </View>
          <Text style={styles.caption}>
            Already have an account?{" "}
            <Text style={styles.colorText}>Sign In</Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: primary.p100,
  },

  brandName: {
    color: neutral.white,
    position: "absolute",
    top: Constants.statusBarHeight + 20,
  },

  button: {
    backgroundColor: primary.p900,
    width: "100%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  caption: { color: neutral.n700 },

  captionContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  circle: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: primary.p900,
    marginVertical: 4,
  },

  container: {
    height: "41%",
    marginBottom: "44",
    width: "100%",
    alignItems: "center",
  },

  colorText: {
    color: primary.p900,
  },

  enter: {
    width: "90%",
    alignItems: "center",
    color: neutral.n700,
  },

  imageBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  getStarted: {
    color: neutral.white,
  },

  gradient: {
    width: "100%",
    height: "30%",
  },

  title: {
    color: primary.p900,
    fontWeight: "bold",
    fontSize: 32,
  },

  titleContainer: {
    alignItems: "center",
    marginBottom: 16,
  },

  page: {
    width: 48,
    height: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
});

export default OnboardingScreen;
