import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Screen from "../components/Screen";
import SearchBar from "../components/SearchBar";
import MenuHeader from "../components/MenuHeader";
import neutral from "../config/colors/neutralColor";
import PostItems from "../components/PostItems";
import header from "../config/header";
import MainMenu from "../components/MainMenu";
import AddButton from "../components/AddButton";
import ActivityPost from "../components/ActivityPost";

const profiles = [
  {
    owner: "Abdulmujeeb Mohammed",
    time: "53m ago",
    text: "Just harvested our first batch of sweet corn! Yield looks promising. Any tips for storing corn to keep it fresh? ",
    image: require("../assets/cornPost.png"),
    profilePics: require("../assets/profile.png"),
  },
];

function CommunityScreen() {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  return (
    <View style={styles.screen}>
      {show && <ActivityPost onClose={toggleShow} />}
      <View style={styles.mainScreen}>
        <Screen>
          <MenuHeader image={require("../assets/Avatar.png")}>
            <Text style={{ color: neutral.n950, ...header.h4 }}>Community</Text>
          </MenuHeader>
          <ScrollView contentContainerStyle={styles.scrollview}>
            <SearchBar placeholder={"search"} />
            <View style={styles.feeds}>
              {profiles.map((profile, index) => (
                <PostItems
                  key={index}
                  owner={profile.owner}
                  time={profile.time}
                  text={profile.text}
                  image={profile.image}
                  profilePics={profile.profilePics}
                ></PostItems>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity onPress={toggleShow}>
            <AddButton style={styles.addButton} />
          </TouchableOpacity>
          <MainMenu currentPage={2} />
        </Screen>
      </View>
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

  mainScreen: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    zIndex: 1,
  },

  screen: {
    backgroundColor: neutral.background,
    width: "100%",
    height: "100%",
  },

  scrollview: {
    justifyContent: "center",
    paddingBottom: 75,
    marginTop: 26,
  },
});

export default CommunityScreen;
