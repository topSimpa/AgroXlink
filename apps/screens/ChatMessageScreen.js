import React from "react";
import { FlatList, StyleSheet, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import neutral from "../config/colors/neutralColor";

messages = [
  {
    messageId: "1",
    who: "owner",
    text: "",
  },
  {
    messageId: "2",
    who: "pair",
    text: "",
  },
];

function ChatMessageScreen() {
  return (
    <Screen style={{ backgroundColor: neutral.background }}>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.messageId}
        renderItem={({ item }) => <Message who={item.who} text={item.text} />}
        bounces={false}
        style={{ width: "100%" }}
      />
      <View style={styles.inputContainer}>
        <Ionicons name="attach" size={20} color={neutral.n400} />
        <TextInput style={styles.input} placeholder="Type message..." />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "92%",
    borderColor: neutral.n100,
    borderWidth: 1,
    positon: "absolute",
    bottom: 32,
  },

  input: {
    marginHorizontal: 4,
    color: neutral.n400,
  },
});

export default ChatMessageScreen;
