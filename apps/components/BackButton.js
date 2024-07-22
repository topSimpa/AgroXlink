import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import neutral from "../config/colors/neutralColor";

function BackButton() {
  return <FontAwesome6 name="arrow-left-long" size={24} color={neutral.n950} />;
}

export default BackButton;
