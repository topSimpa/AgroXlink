import React from "react";
import { StyleSheet } from "react-native";
import body from "../config/body";
import neutral from "../config/colors/neutralColor";
import primary from "../config/colors/primaryColor";

function Message({ who, text }) {
  return (
    <View style={[styles.chat, who === "owner" ? owner : styles.pair]}>
      <Text
        style={[
          styles.chatText,
          { color: who === "owner" ? neutral.n950 : neutral.white },
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

  owner: {
    alignSelf: "flex-end",
    backgroundColor: primary.p100,
    borderRadius: 16,
    borderTopRightRadius: 0,
    marginRight: 4,
  },

  pair: {
    alignSelf: "flex-start",
    backgroundColor: primary.p900,
    borderRadius: 16,
    borderTopLeftRadius: 0,
    marginLeft: 4,
  },
});

export default Message;
