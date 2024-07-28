import React from "react";
import { StyleSheet, Text, View } from "react-native";

import neutral from "../config/colors/neutralColor";
import label from "../config/label";
import primary from "../config/colors/primaryColor";

function NameTime({owner, time}) {
  return (
    <View style={styles.nameTime}>
      <Text
        style={[styles.nameTimeItem, { color: neutral.n950, ...label.l2b }]}
      >
        {owner}
      </Text>
      <View style={styles.activeCircle} />
      <Text style={{ color: neutral.n400, ...label.l4b }}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  activeCircle: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: primary.p900,
    marginHorizontal: 6,
  },

  nameTime: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default NameTime;
