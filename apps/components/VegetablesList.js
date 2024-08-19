import React from "react";
import { FlatList, View } from "react-native";


import CropItems from "./CropItems";
import neutral from "../config/colors/neutralColor";


data = ["Tomatoes", "Red Onions", "Cabbages"];

function VegetablesList() {
  return (
    <View style={{ backgroundColor: neutral.background, flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.index}
        renderItem={({ item }) => <CropItems name={item} key={item.index} />}
        ItemSeparatorComponent={() => (
          <View
            style={{ borderBottomWidth: 1, borderBottomColor: neutral.n100 }}
          />
        )}
      />
    </View>
  );
}

export default VegetablesList;
