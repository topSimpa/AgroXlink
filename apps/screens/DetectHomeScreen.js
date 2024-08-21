import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Button,
  Image,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";
import label from "../config/label";

function DetectHomeScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [mainText, setMainText] = useState("");
  const canvasRef = useRef(null);

  const handleImagePick = async (source) => {
    let result;

    if (source === "camera") {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else if (source === "gallery") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);

      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        name: "capture.jpg",
        type: "image/jpeg",
      });

      try {
        const response = await fetch(
          "https://agroxlink-ai.onrender.com/api/disease-detection/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const resultText = await response.text();
        console.log(resultText);
        setMainText(resultText);

        navigation.navigate("detectAnswer", {
          image: imageUri,
          text: resultText,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        setMainText("Error uploading image: " + error.message);
      }
    }
  };

  const pickImage = () => {
    Alert.alert(
      "Select Image Source",
      "Choose an option to pick an image",
      [
        { text: "Camera", onPress: () => handleImagePick("camera") },
        { text: "Gallery", onPress: () => handleImagePick("gallery") },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

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
          <Text style={{ color: neutral.n800, ...label.l2r }}>
            Add image to diagnose
          </Text>
          <Text style={{ color: neutral.n800, ...label.l2r }}>disease</Text>
        </View>
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.adButton}>Add Image</Text>
        </TouchableOpacity>
      </View>

      {/* Display Image and Main Text */}
      {/* {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      {mainText ? <Text style={styles.resultText}>{mainText}</Text> : null} */}
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

  imagePreview: {
    width: "100%",
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },

  resultText: {
    marginTop: 20,
    color: neutral.n800,
    ...label.l2r,
  },
});

export default DetectHomeScreen;
