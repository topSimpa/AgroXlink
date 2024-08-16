import React from "react";
import AddButton from "../components/AddButton";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import SearchBar from "../components/SearchBar";
import CropTabNavigator from "../navigation/CropTabNavigator";
import neutral from "../config/colors/neutralColor";

function MyCropsScreen({ navigation }) {
  return (
      <Screen style={{ backgroundColor: neutral.background }}>
        <ScreenHeader title="My Crops" onPress={() => navigation.goBack()} />
        <SearchBar placeholder="Search" style={styles.search} />
        <CropTabNavigator></CropTabNavigator>
        <TouchableOpacity
          style={styles.add}
          onPress={() => navigation.navigate("addCrop")}
        >
          <AddButton></AddButton>
        </TouchableOpacity>
      </Screen>
  );
}

const styles = StyleSheet.create({
  add: {
    position: "absolute",
    right: 16,
    bottom: 54,
  },
  search: {
    marginVertical: 32,
  },
});
export default MyCropsScreen;
