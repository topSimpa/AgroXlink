import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import neutral from "../config/colors/neutralColor";
import label from "../config/label";
import Screen from "../components/Screen";
import Message from "../components/Message";

messages = [
  {
    messageId: "1",
    who: "owner",
    text: "How far anything for my farm, I see say you buy manure",
  },
  {
    messageId: "2",
    who: "pair",
    text: "Omoh na FG come share am for my community yesterday",
  },
];

function ChatScreen({ route, navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <View style={{ flexDirection: "row" }}>
          <Image source={route.params?.picture} />
          <Text style={{ color: neutral.n950, ...label.l2b, marginLeft: 12 }}>
            {route.params?.owner}
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: neutral.background,
        height: 68,
      },
    });
  }, [navigation, route.params]);

  return (
    <Screen style={{ backgroundColor: neutral.background, flex: 1 }}>
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
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "92%",
    borderColor: neutral.n100,
    borderWidth: 1,
    borderRadius: 10,
    position: "absolute",
    bottom: 32,
    padding: 12,
  },

  input: {
    marginHorizontal: 4,
    color: neutral.n400,
  },
});

export default ChatScreen;
