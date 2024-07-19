import React from "react";

import { StyleSheet, Text, View } from "react-native";

function Brand({ color }) {
  return (
    <View style={styles.brandContainer}>
      <Text style={{ color }}> AgroXlink </Text>
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
});

export default Brand;
