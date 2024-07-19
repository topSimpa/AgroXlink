import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import neutral from "../config/colors/neutralColor";
import primary from "../config/colors/primaryColor";
import EnterButton from "./EnterButton";
import MixedQuestion from "./MixedQuestion";
import Brand from "./Brand";
import Screen from "./Screen";

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
      <Screen style={styles.screen}>
        <Brand color={neutral.white} />

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
            <EnterButton
              text={"Let's Get Started"}
              style={{ marginBottom: 10 }}
            />
            <MixedQuestion
              first={"Already have an account?"}
              second={"Sign In"}
            />
          </View>
        </View>
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  caption: {
    color: neutral.n700,
  },

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
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },

  enter: {
    width: "90%",
    alignItems: "center",
    color: neutral.n700,
  },

  imageBackground: {
    flex: 1,
  },

  screen: {
    alignItems: "center",
    justifyContent: "space-between",
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
