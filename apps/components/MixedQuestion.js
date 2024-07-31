import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

import neutral from "../config/colors/neutralColor";
import primary from "../config/colors/primaryColor";
import body from "../config/body";
import label from "../config/label";

function MixedQuestion({ first, second, style, onPress }) {
  return (
    <View style={[styles.textContainer, style]}>
      <Text style={{ color: neutral.n700 }}>{`${first} `}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={{
            color: primary.p950,
            ...label.l3b,
          }}
        >
          {second}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default MixedQuestion;
