import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";
import label from "../config/label";

function DetectHomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: neutral.background,
        justifyContent: "center",
        paddingHorizontal: 16,
      }}
    >
      <View style={styles.imageSelector}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="camera-plus-outline"
            size={48}
            color={primary.p500}
          />
          <Text
            style={{
              color: neutral.n800,
              ...label.l2r,
            }}
          >
            Add image to diagnose
          </Text>
          <Text
            style={{
              color: neutral.n800,
              ...label.l2r,
            }}
          >
            disease
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.adButton}>Add Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adButton: {
    height: 36,
    gap: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: primary.p900,
    color: neutral.white,
    textAlign: "center",
    ...label.l3b,
    lineHeight: 36,
  },

  imageSelector: {
    height: 252,
    gap: 36,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: primary.p50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: primary.p500,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },

  body: {
    paddingHorizontal: 16,
    backgroundColor: neutral.background,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
export default DetectHomeScreen;
