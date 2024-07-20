import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import primary from "../config/colors/primaryColor";
import { TouchableWithoutFeedback, View } from "react-native";

function CheckBox({ children }) {
  const [isChecked, setCheck] = useState(false);
  const handleCheckBox = () => setCheck(!isChecked);

  return (
    <TouchableWithoutFeedback onPress={handleCheckBox}>
        <MaterialCommunityIcons
          name={isChecked ? "checkbox-outline" : "checkbox-blank-outline"}
          size={24}
          color={primary.p950}
        />
    </TouchableWithoutFeedback>
  );
}

export default CheckBox;
