import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";
import label from "../config/label";
import CropCareNavigator from "../navigation/CropCareNavigator";

function CropCareScreen() {
  const [clicked, setClicked] = useState(1);

  const isClicked = (button) => {
    setClicked(button);
  };

  return (
    <View style={{ backgroundColor: neutral.background }}>
      <Screen>
        <ScreenHeader title={"Crop Care"} />
        <CropCareNavigator />
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  adButton: {
    height: 36,
    gap: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: primary.p900,
    color: neutral.white,
    textAlign: "center",
    ...label.l3b,
    lineHeight: 36,
  },

  imageSelector: {
    height: 252,
    gap: 36,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: primary.p50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: primary.p500,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },

  body: {
    paddingHorizontal: 16,
    backgroundColor: neutral.background,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },

  // menu: {
  //   position: "absolute",
  //   left: 16,
  //   top: 0,
  //   gap: 4,
  //   height: 78,
  //   width: "100%",
  //   justifyContent: "flex-end",
  // },

  // optionContainer: {
  //   width: "100%",
  //   flexDirection: "row",
  //   padding: 8,
  //   borderRadius: 16,
  //   backgroundColor: primary.p50,
  //   justifyContent: "space-around",
  // },

  // option: {
  //   flexDirection: "column",
  //   height: 36,
  //   borderRadius: 8,
  //   alignItems: "center",
  //   gap: 8,
  //   paddingHorizontal: 8,
  //   justifyContent: "center",
  //   ...label.l3b,
  //   lineHeight: 36,
  // },
});
export default CropCareScreen;
