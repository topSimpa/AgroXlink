import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import body from "../config/body";
import neutral from "../config/colors/neutralColor";
import primary from "../config/colors/primaryColor";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Markdown from "react-native-markdown-display";

const TypingText = ({ text, speed = 100, style }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const containerWidth = useRef(Dimensions.get("window").width * 0.8).current; // Adjust width as needed

  useEffect(() => {
    if (currentCharIndex < text.length) {
      const timer = setInterval(() => {
        setDisplayedText((prev) => prev + text[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      }, speed);

      return () => clearInterval(timer);
    }
  }, [currentCharIndex, text, speed]);

  return (
    <View style={[styles.container, { width: "78%" }, style]}>
      <MaterialCommunityIcons
        name="robot-love"
        color={primary.p950}
        size={24}
      ></MaterialCommunityIcons>
      <Markdown style={[styles.text]}>{displayedText}</Markdown>
      <View style={{ alignSelf: "flex-end" }}>
        <MaterialCommunityIcons
          name="leaf"
          size={24}
          color={primary.p700}
        ></MaterialCommunityIcons>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 12,
    gap: 4,
    backgroundColor: primary.p100,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    borderTopLeftRadius: 0,
    alignSelf: "flex-start",
  },
  text: {
    ...body.p1r,
    color: neutral.n950,
  },
});

export default TypingText;
