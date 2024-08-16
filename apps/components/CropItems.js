import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import CropLogo from "../assets/croplogo.svg";
import primary from "../config/colors/primaryColor";
import error from "../config/colors/error";
import neutral from "../config/colors/neutralColor";
import label from "../config/label";

function CropItems({ name }) {
  return (
    <View style={styles.ItemBox}>
      <View style={styles.nameBox}>
        <CropLogo color={primary.p900}/>
        <Text style={{ color: neutral.n950, ...label.l2b, marginLeft: 16 }}>
          {name}
        </Text>
      </View>
      <TouchableOpacity>
        <MaterialIcons name="delete-outline" color={error.r600} size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ItemBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingLeft: 16,
  },

  nameBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CropItems;
