import React from "react";
import BackButton from "../components/BackButton";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppTextInput from "../components/AppTextInput";
import EnterButton from "../components/EnterButton";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import neutral from "../config/colors/neutralColor";

function EditProfileScreen({ navigation }) {
  return (
    <Screen>
      <ScreenHeader title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.photoSelectionBox}>
          <ImageBackground></ImageBackground>
          <ImageBackground></ImageBackground>
        </View>
        <View style={styles.form}>
          <AppTextInput title={"Name"} placeholder={"Abdulmujeeb Mohammed"} />
          <AppTextInput title={"Email"} placeholder={"dummy@domain.com"} />
          <AppTextInput title={"Bio"} placeholder={"I love farming beans"} />
          <AppTextInput title={"Phone Number"} placeholder={"090123456734"} />
          <AppTextInput title={"Farm Name"} placeholder="Wake palace" />
          <AppTextInput title={"Location"} placeholder="Bomo, Kaduna State" />
          <AppTextInput
            title={"New Password"}
            placeholder="Choose a new password"
          />
          <AppTextInput
            title={"Confirm Password"}
            placeholder="Confirm paswword"
            style={{ marginBottom: 16 }}
          />
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
  },

  screen: {
    backgroundColor: neutral.background,
  },
});
export default EditProfileScreen;
