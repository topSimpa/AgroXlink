import React from "react";
import { StyleSheet } from "react-native";

import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import EnterButton from "../components/EnterButton";
import ScreenHeader from "../components/ScreenHeader";

function ChangePasswordScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <ScreenHeader
        title={"Change Password"}
        style={{ borderBottomWidth: 0 }}
        onPress={() => navigation.goBack()}
      />
      <AppTextInput
        title={"Old Password"}
        style={styles.oldPassword}
        placeholder={"Enter your old password"}
      />
      <AppTextInput
        title={"New Password"}
        style={styles.newPassword}
        placeholder={"Choose a new password"}
      />
      <EnterButton text={"Change Password"} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 16,
  },

  oldPassword: {
    marginTop: 32,
    marginBottom: 16,
  },

  newPassword: {
    marginBottom: 32,
  },
});
export default ChangePasswordScreen;
