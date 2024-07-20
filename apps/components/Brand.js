import React from "react";

import { StyleSheet, Text, View } from "react-native";
import header from "../config/header";

function Brand({ color }) {
  return (
    <View style={styles.brandContainer}>
      <Text style={[{color }, styles.brand]}> AgroXlink </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  brandContainer: {
    alignItems: "center",
    height: 58,
    justifyContent: "center",
    width: "100%",
  },

  brand: {
    ...header.h4,
  }
});

export default Brand;
