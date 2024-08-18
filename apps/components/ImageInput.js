import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";

function ImageInput({ onPress }) {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(26, 28, 18, 0.6)",
      }}
      onPress={onPress}
    >
      <View>
        <MaterialCommunityIcons color={neutral.white} name="camera" size={24} />
      </View>
    </TouchableOpacity>
  );
}

export default ImageInput;

const styles = StyleSheet.create({});
