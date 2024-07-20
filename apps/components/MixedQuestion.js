import React from "react";
import { Text, View } from "react-native";

import neutral from "../config/colors/neutralColor";
import primary from "../config/colors/primaryColor";

function MixedQuestion({ first, second, style }) {
  return (
    <View style={style}>
      <Text style={{ color: neutral.n700 }}>
        {`${first} `}
        <Text style={{ color: primary.p900 }}>{second}</Text>
      </Text>
    </View>
  );
}

export default MixedQuestion;
