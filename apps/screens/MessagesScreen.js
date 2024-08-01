import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import AddButton from "../components/AddButton";
import Screen from "../components/Screen";
import ChatHead from "../components/ChatHead";
import MenuHeader from "../components/MenuHeader";
import neutral from "../config/colors/neutralColor";
import header from "../config/header";
import SearchBar from "../components/SearchBar";

const chats = [
  {
    profilePicture: require("../assets/profile.png"),
    name: "Bayero Abdul",
    time: "13m ago",
    lastMessage:
      "Hi there! Just wanted to let you know we have fresh strawberries",
  },
  {
    name: "Misturah Ali",
    time: "53m ago",
    lastMessage:
      "Hey! How's your tomato crop this year? Ours are ripening nicely, but we had ...",
  },
];

function MessagesScreen({}) {
  const [chatList, setChatList] = useState([]);
  const onResults = (result) => {
    setChatList(result);
  };

  return (
    <View style={styles.screen}>
      <Screen>
        <MenuHeader image={require("../assets/Avatar.png")}>
          <Text style={{ color: neutral.n950, ...header.h4 }}>Messages</Text>
        </MenuHeader>
        <ScrollView contentContainerStyle={styles.scrollview}>
          <SearchBar
            field={"chat.Owner"}
            placeholder={"search"}
            onResults={(result) => onResults(result)}
          />
          <View style={styles.feeds}>
            {chats.map((chat, index) => (
              <ChatHead
                key={index}
                owner={chat.name}
                time={chat.time}
                lastMessage={chat.lastMessage}
                picture={chat.profilePicture}
              />
            ))}
          </View>
        </ScrollView>
        {/* <TouchableOpacity>
          <AddButton style={styles.addButton} />
        </TouchableOpacity>
        <MainMenu currentPage={3} /> */}
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    right: 8,
    bottom: 102,
  },

  feeds: {
    marginHorizontal: 16,
  },

  scrollview: {
    justifyContent: "center",
    paddingBottom: 75,
    marginTop: 26,
  },
});

export default MessagesScreen;
