import React from "react";
import AddButton from "../components/AddButton";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Screen from "../components/Screen";
import AdsItem from "../components/AdsItem";
import ScreenHeader from "../components/ScreenHeader";
import SearchBar from "../components/SearchBar";
import neutral from "../config/colors/neutralColor";

function MyAdsScreen({ navigation }) {
  return (
    <Screen style={{ backgroundColor: neutral.background }}>
      <ScreenHeader title="My Ads" onPress={() => navigation.goBack()} />
      <SearchBar placeholder="Search" style={styles.search} />
      <View style={{ backgroundColor: neutral.background, flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.index}
          renderItem={({ item }) => <AdsItem name={item} key={item.index} />}
          ItemSeparatorComponent={() => (
            <View style={{ height: 8, width: "100%" }} />
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate("addSell")}
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
export default MyAdsScreen;
