import React from "react";
import { Text, View } from "react-native";

import neutral from "../config/colors/neutralColor";
import primary from "../config/colors/primaryColor";
import body from "../config/body";
import label from "../config/label";

function MixedQuestion({ first, second, style }) {
  return (
    <View style={style}>
      <Text style={{ color: neutral.n700, ...body.p2r }}>
        {`${first} `}
        <Text style={{ color: primary.p950, ...label.l3b }}>{second}</Text>
      </Text>
    </View>
  );
}

export default MixedQuestion;
