import React from "react";

import BackButton from "../components/BackButton";
import { StyleSheet, Text, View } from "react-native";
import neutral from "../config/colors/neutralColor";
import header from "../config/header";

function ScreenHeader({ title, onPress, style }) {
  return (
    <View style={[styles.screenHeader, style]}>
      <BackButton onPress={onPress} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenHeader: {
    borderBottomWidth: 1,
    borderBottomColor: neutral.n100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: neutral.background,
  },

  title: {
    color: neutral.n950,
    ...header.h4,
  },
});
export default ScreenHeader;
