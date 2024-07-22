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
import header from "../config/header";
import body from "../config/body";

function LoginScreen() {
  return (
    <View style={styles.screen}>
      <Screen>
        <View style={styles.backContainer}>
          <BackButton />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.brandContainer}>
            <Brand color={primary.p900}></Brand>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subTitle}>Enter your details to sign in</Text>
          </View>
          <AppTextInput
            title={"Email"}
            placeholder={"Enter your email address"}
          />
          <AppTextInput
            title={"Password"}
            placeholder={"Enter your password"}
            style={{ marginTop: 16, marginBottom: 16 }}
          />
          <MixedQuestion
            first={"Forgot Password?"}
            second={"Reset it"}
            style={{ width: "100%" }}
          />
          <EnterButton text={"Sign In"} style={styles.signIn} />
          <MixedQuestion
            first={"Don't have an account?"}
            second={"Create One"}
            style={{ width: "100%", alignItems: "center" }}
          />
        </View>
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  backContainer: {
    marginTop: 0,
    paddingLeft: 16,
    justifyContent: "center",
    width: "100%",
    height: 56,
  },

  brandContainer: {
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center'
  },

  formContainer: {
    width: "92%",
    alignSelf: "center",
    height: "auto",
    alignItems: "center",
  },

  subTitle: {
    color: neutral.n60,
    ...body.p2r,
  },

  signIn: {
    marginTop: 32,
    marginBottom: 20,
  },

  screen: {
    backgroundColor: neutral.background,
    height: "100%",
    width: "100%",
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
export default LoginScreen;
