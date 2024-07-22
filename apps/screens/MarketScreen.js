import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Brand from "../components/Brand";
import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";
import Screen from "../components/Screen";

function MarketScreen() {
  return (
    <View style={styles.screen}>
      <Screen>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Image source={require("../assets/Avatar.png")} />
            <View style={StyleSheet.brandContainer}>
              <Brand color={primary.p900} />
            </View>
            <View style={styles.bellContainer}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={neutral.white}
              />
            </View>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <TouchableHighlight style={styles.searchBar}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search-outline" size={20} color={neutral.n300} />
              <TextInput placeholder="Search farm produce"></TextInput>
            </View>
          </TouchableHighlight>
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  bellContainer: {
    backgroundColor: primary.p900,
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  brandContainer: {
    height: 40,
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "static",
    top: 0,
  },

  headerContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: neutral.n100,
  },


  searchContainer: {
    position: "static",
    top: 26,
    width: "100%",
    paddingHorizontal: 16,
  },

  searchInputContainer: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: neutral.n300,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 11,
  },

  screen: {
    backgroundColor: neutral.background,
  },
});
export default MarketScreen;
