import React from "react";

import { StyleSheet, Text, View } from "react-native";
import header from "../config/header";

function Brand({ color }) {
  return <Text style={[{ color }, styles.brand]}> AgroXlink </Text>;
}

const styles = StyleSheet.create({
  brand: {
    ...header.h4,
  },
});

export default Brand;
