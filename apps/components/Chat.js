import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NameTime from "./NameTime";
import neutral from "../config/colors/neutralColor";
import body from "../config/body";

function Chat({ picture, owner, time, lastMessage }) {
  const [isClicked, clicked] = useState(false);

  return (
    <TouchableOpacity onPress={() => clicked(true)}>
      <View style={styles.messageHeader}>
        <Image style={styles.profile} source={picture} />
        <View style={styles.latest}>
          <NameTime owner={owner} time={time} />
          <Text
            style={{
              color: isClicked ? neutral.n200 : neutral.n950,
              marginTop: 4,
              ...body.p3b,
            }}
          >
            {lastMessage}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  messageHeader: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: neutral.n100,
    flexDirection: "row",
    width: "100%",
    height: 92,
    justifyContent: "space-between",
  },

  profile: {
    heigth: "100%",
  },
});

export default Chat;
