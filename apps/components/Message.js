import React from "react";
import { StyleSheet, Text, View } from "react-native";
import body from "../config/body";
import neutral from "../config/colors/neutralColor";
import primary from "../config/colors/primaryColor";

function Message({ who, text }) {
  return (
    <View style={[styles.chat, who === "owner" ?styles.owner : styles.pair]}>
      <Text
        style={[
          styles.chatText,
          { color: who === "owner" ? neutral.white: neutral.n950 },
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chat: {
    marginBottom: 4,
    width: "72%",
    padding: 12,
  },

  chatText: {
    ...body.p1r,
  },

  pair: {
    alignSelf: "flex-start",
    backgroundColor: primary.p100,
    borderRadius: 16,
    borderTopLeftRadius: 0,
    marginLeft: 16,
    marginBottom: 16,
  },

  owner: {
    alignSelf: "flex-end",
    backgroundColor: primary.p900,
    borderRadius: 16,
    borderTopRightRadius: 0,
    marginRight: 16,
    marginBottom: 16,
  },
});

export default Message;
