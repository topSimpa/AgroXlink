import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";

import AppTextInput from "../components/AppTextInput";
import EnterButton from "../components/EnterButton";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import neutral from "../config/colors/neutralColor";
import ImageInput from "../components/ImageInput";

function EditProfileScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [background, setBackground] = useState(null);

  const pickImage = async (imageSetter) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      imageSetter(result.assets[0].uri);
    }
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
            <ImageInput onPress={() => pickImage(setBackground)} />

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
                <ImageInput onPress={() => pickImage(setImage)} />
              </ImageBackground>
            </View>
          </ImageBackground>
        </View>
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

  screen: {
    backgroundColor: neutral.background,
  },
});
export default EditProfileScreen;
