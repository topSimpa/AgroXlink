import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import TypingText from "../components/TypingText";
import neutral from "../config/colors/neutralColor";

function DiseaseDetectionScreen({ route }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageBox}>
          <Image style={styles.image} source={{ uri: route.params.image }} />
        </View>
        <TypingText text={route.params.text} style={styles.ai} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: neutral.background,
  },
  scrollContent: {
    paddingVertical: 16, // Add some padding if needed
    paddingHorizontal: 16,
  },
  imageBox: {
    width: "100%",
    height: 254, // Set a fixed height for the image container
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  ai: {
    width: "100%",
    backgroundColor: neutral.background
  },
});

export default DiseaseDetectionScreen;
