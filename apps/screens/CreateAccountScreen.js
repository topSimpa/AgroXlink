import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Brand from "../components/Brand";
import neutral from "../config/colors/neutralColor";
import Screen from "../components/Screen";
import primary from "../config/colors/primaryColor";
import BackButton from "../components/BackButton";
import AppTextInput from "../components/AppTextInput";
import MixedQuestion from "../components/MixedQuestion";
import EnterButton from "../components/EnterButton";

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
            placeholder={"Enter your Email Address"}
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
          <MixedQuestion
            first={"Forgot Password?"}
            second={"Reset it"}
            style={{ width: "100%" }}
          />
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
  screen: {
    backgroundColor: neutral.background,
    height: "100%",
    width: "100%",
  },

  formContainer: {
    width: "92%",
    alignSelf: "center",
    height: "auto",
    alignItems: "center",
  },

  titleContainer: {
    width: "100%",
    alignItems: "center",
    height: 55,
    marginBottom: 36,
  },

  title: {
    color: neutral.n950,
  },

  subTitle: {
    color: neutral.n60,
  },

  signIn: {
    marginTop: 32,
    marginBottom: 20,
  },
});
export default CreateAccountScreen;
