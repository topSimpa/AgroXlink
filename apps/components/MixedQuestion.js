import React from "react";
import { Text } from "react-native";

import neutral from "../config/colors/neutralColor";
import primary from "../config/colors/primaryColor";

function MixedQuestion({ first, second }) {
  return (
    <Text style={{ color: neutral.n700 }}>
      {`${first} `}
      <Text style={{ color: primary.p900 }}>{second}</Text>
    </Text>
  );
}

export default MixedQuestion;
