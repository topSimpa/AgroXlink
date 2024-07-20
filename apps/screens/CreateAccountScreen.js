import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Brand from "../components/Brand";
import body from "../config/body";
import neutral from "../config/colors/neutralColor";
import Screen from "../components/Screen";
import primary from "../config/colors/primaryColor";
import BackButton from "../components/BackButton";
import AppTextInput from "../components/AppTextInput";
import MixedQuestion from "../components/MixedQuestion";
import EnterButton from "../components/EnterButton";
import header from "../config/header";
import CheckBox from "../components/CheckBox";

function CreateAccountScreen() {
  return (
    <View style={styles.screen}>
      <Screen>
        <BackButton />
        <View style={styles.formContainer}>
          <Brand color={primary.p900}></Brand>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subTitle}>
              Enter your details to create an account
            </Text>
          </View>
          <AppTextInput
            title={"Email"}
            placeholder={"Enter your email address"}
          />
          <AppTextInput
            title={"Password"}
            placeholder={"Choose password"}
            style={{ marginTop: 16, marginBottom: 16 }}
          />
          <AppTextInput
            title={"Confirm Password"}
            placeholder={"Confirm password"}
            style={{ marginBottom: 16 }}
          />
          <View style={styles.checkContainer}>
            <CheckBox />
            <MixedQuestion
              first={"You have agreed to our"}
              second={"Terms & Conditions"}
              style={{ width: "100%" }}
            />
          </View>
          <EnterButton text={"Create Account"} style={styles.signIn} />
          <MixedQuestion
            first={"Already have an account?"}
            second={"Sign In"}
            style={{ width: "100%", alignItems: "center" }}
          />
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  checkContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  formContainer: {
    width: "92%",
    alignSelf: "center",
    height: "auto",
    alignItems: "center",
  },

  screen: {
    backgroundColor: neutral.background,
    height: "100%",
    width: "100%",
  },

  subTitle: {
    color: neutral.n60,
    ...body.p2r,
  },

  signIn: {
    marginTop: 32,
    marginBottom: 20,
  },

  titleContainer: {
    width: "100%",
    alignItems: "center",
    height: 55,
    marginBottom: 36,
  },

  title: {
    color: neutral.n950,
    ...header.h3,
  },
});
export default CreateAccountScreen;
