import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import AppTextInput from "../components/AppTextInput";
import EnterButton from "../components/EnterButton";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import neutral from "../config/colors/neutralColor";
import ImageInput from "../components/ImageInput";

function EditProfileScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [background, setBackground] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [currentSetter, setCurrentSetter] = useState(null);

  const requestPermissions = async () => {
    const { status: mediaStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    if (mediaStatus !== "granted" || cameraStatus !== "granted") {
      alert(
        "Sorry, we need media library and camera permissions to make this work!"
      );
      return false;
    }
    return true;
  };

  const pickImage = async (useCamera = false) => {
    if (!(await requestPermissions())) return;

    let result;
    if (useCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      if (currentSetter === "background") {
        setBackground(result.assets[0].uri);
      } else if (currentSetter === "image") {
        setImage(result.assets[0].uri);
      }
      setShowOptions(false);
    }
  };

  const openOptions = (setter) => {
    setCurrentSetter(setter);
    setShowOptions(true);
  };

  return (
    <Screen>
      <ScreenHeader title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.photoSelectionBox}>
          <ImageBackground
            source={
              background
                ? { uri: background }
                : require("../assets/pbackground.png")
            }
            style={{
              width: "100%",
              height: 178,
              zIndex: 2,
            }}
          >
            <TouchableOpacity onPress={() => openOptions("background")}>
              <ImageInput />
            </TouchableOpacity>

            <View
              style={{
                width: 97,
                height: 100,
                position: "absolute",
                top: 128,
                left: 20,
                borderWidth: 3,
                borderBottomWidth: 0,
                borderColor: "white",
                borderRadius: 100,
                overflow: "hidden",
              }}
            >
              <ImageBackground
                source={
                  image ? { uri: image } : require("../assets/person.png")
                }
                style={{ width: "100%", height: "100%" }}
              >
                <TouchableOpacity onPress={() => openOptions("image")}>
                  <ImageInput />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </ImageBackground>
        </View>

        {showOptions && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => pickImage(false)}
            >
              <Text style={styles.optionText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => pickImage(true)}
            >
              <Text style={styles.optionText}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setShowOptions(false)}
            >
              <Text style={styles.optionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.form}>
          <AppTextInput title={"Name"} placeholder={"Abdulmujeeb Mohammed"} />
          <AppTextInput title={"Email"} placeholder={"dummy@domain.com"} />
          <AppTextInput title={"Bio"} placeholder={"I love farming beans"} />
          <AppTextInput title={"Phone Number"} placeholder={"090123456734"} />
          <AppTextInput title={"Farm Name"} placeholder="Wake palace" />
          <AppTextInput title={"Location"} placeholder="Bomo, Kaduna State" />
          <EnterButton text={"Update Profile"} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 16,
    gap: 16,
    marginVertical: 42,
  },
  photoSelectionBox: {
    width: "100%",
    height: 228,
    overflow: "hidden",
  },
  optionsContainer: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: "white",
    padding: 16,
    elevation: 4,
  },
  optionButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginVertical: 8,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  screen: {
    backgroundColor: neutral.background,
  },
});

export default EditProfileScreen;
