import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import primary from "../config/colors/primaryColor";
import { TouchableWithoutFeedback, View } from "react-native";

function CheckBox({ value, onValueChange }) {
  return (
    <TouchableWithoutFeedback onPress={() => onValueChange(!value)}>
      <MaterialCommunityIcons
        name={value ? "checkbox-outline" : "checkbox-blank-outline"}
        size={24}
        color={primary.p950}
      />
    </TouchableWithoutFeedback>
  );
}

export default CheckBox;
