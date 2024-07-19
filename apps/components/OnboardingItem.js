import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Constants from "expo-constants";
import neutral from "../config/neutralColor";
import primary from "../config/primaryColor";

function OnboardingItem({
  id,
  image,
  titleOne,
  titleTwo,
  captionOne,
  captionTwo,
}) {
  const { width } = useWindowDimensions();

  return (
    <ImageBackground source={image} style={[styles.imageBackground, { width }]}>
      <Text style={styles.brandName}>AgroXlink</Text>

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{titleOne}</Text>
          <Text style={styles.title}>{titleTwo}</Text>
        </View>
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>{captionOne}</Text>
          <Text style={styles.caption}>{captionTwo}</Text>
        </View>
        <View style={styles.page}>
          <View
            style={[
              styles.circle,
              { backgroundColor: id === 1 ? primary.p900 : primary.p100 },
            ]}
          ></View>
          <View
            style={[
              styles.circle,
              { backgroundColor: id === 2 ? primary.p900 : primary.p100 },
            ]}
          ></View>
          <View
            style={[
              styles.circle,
              { backgroundColor: id === 3 ? primary.p900 : primary.p100 },
            ]}
          ></View>
        </View>
        <View style={styles.enter}>
          <TouchableOpacity
            style={styles.button}
            onPress={console.log("Started!")}
          >
            <Text style={styles.getStarted}>Let's Get Started</Text>
          </TouchableOpacity>
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

export default OnboardingItem;
