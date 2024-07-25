import React from "react";
import { Text, View } from "react-native";

import neutral from "../config/colors/neutralColor";
import primary from "../config/colors/primaryColor";
import body from "../config/body";
import label from "../config/label";

function MixedQuestion({ first, second, style }) {
  return (
    <Text style={[{ color: neutral.n700, ...body.p2r,}, style]}>
      {`${first} `}
      <Text style={{ color: primary.p950, ...label.l3b }}>{second}</Text>
    </Text>
  );
}

export default MixedQuestion;
