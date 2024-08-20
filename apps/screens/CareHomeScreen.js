import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";
import label from "../config/label";
import header from "../config/header";

function CareHomeScreen({ navigation }) {
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
        <View style={{ alignItems: "center" }}>
          <MaterialCommunityIcons
            name="robot-excited-outline"
            size={156}
            color={primary.p500}
          />

          <Text
            style={{
              color: primary.p900,
              ...header.h4,
              marginBottom: 16,
            }}
          >
            AgroXlink Assistant
          </Text>
          <Text
            style={{
              color: neutral.n800,
              ...label.l2r,
            }}
          >
            Educating Farmers with Expert Crop
          </Text>
          <Text
            style={{
              color: neutral.n800,
              ...label.l2r,
            }}
          >
            Management Guidance
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("assits")}>
          <Text style={styles.adButton}>Start a New Conversation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adButton: {
    height: 48,
    gap: 40,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: primary.p900,
    color: neutral.white,
    textAlign: "center",
    ...label.l2b,
    lineHeight: 48,
  },

  imageSelector: {
    gap: 36,
    paddingBottom: 20,
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

export default CareHomeScreen;
