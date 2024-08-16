import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NameTime from "./NameTime";
import neutral from "../config/colors/neutralColor";
import body from "../config/body";
import { useNavigation } from "@react-navigation/native";

function ChatHead({ picture, owner, time, lastMessage }) {
  const [isClicked, clicked] = useState(false);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        clicked(true);
        navigation.navigate("ChatScreen", {
          picture: picture,
          owner: owner,
        });
      }} 
    >
      <View style={styles.messageHeader}>
        <View style={styles.imageContainer}>
          <Image resizeMode="contain" style={styles.profile} source={picture} />
        </View>
        <View style={styles.latest}>
          <NameTime owner={owner} time={time} />
          <Text
            style={{
              color: isClicked ? neutral.n400 : neutral.n950,
              marginTop: 4,
              ...body.p3b,
              paddingRight: 16
            }}
            numberOfLines={2}
          >
            {lastMessage}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 56,
    height: 56,
  },

  latest: {
    paddingHorizontal: 16,
  },

  messageHeader: {
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: neutral.n100,
    flexDirection: "row",
    height: 92,
  },

  profile: {
    height: "100%",
    width: "100%",
  },
});

export default ChatHead;
