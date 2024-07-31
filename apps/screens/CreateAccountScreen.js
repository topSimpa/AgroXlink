import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

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
import label from "../config/label";

import ActivityIndicator from "../components/ActivityIndicator";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 8 characters")
    .matches(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  agreeToTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

function CreateAccountScreen({ navigation }) {
  const { register, login } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (userInfo) => {
    try {
      // Register the user
      setLoading(true);
      const userCredential = await register(userInfo.email, userInfo.password);

      navigation.navigate("Login");
    } catch (error) {
      // Handle registration or login error
      // setError(error);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <View style={styles.screen}>
      <ActivityIndicator visible={loading} />
      <Screen>
        <View style={styles.backContainer}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.brandContainer}>
            <Brand color={primary.p900}></Brand>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subTitle}>
              Enter your details to create an account
            </Text>
          </View>

          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              agreeToTerms: false,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                <AppTextInput
                  title={"Email"}
                  placeholder={"Enter your email address"}
                  onChangeText={handleChange("email")}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorStyle}>{errors.email}</Text>
                )}
                <AppTextInput
                  title={"Password"}
                  placeholder={"Choose password"}
                  style={{ marginTop: 16 }}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorStyle}>{errors.password}</Text>
                )}
                <AppTextInput
                  title={"Confirm Password"}
                  placeholder={"Confirm password"}
                  style={{ marginTop: 16 }}
                  onChangeText={handleChange("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry
                />
                {touched.password && errors.confirmPassword && (
                  <Text style={styles.errorStyle}>
                    {errors.confirmPassword}
                  </Text>
                )}
                <View style={styles.checkContainer}>
                  <CheckBox
                    value={values.agreeToTerms}
                    onValueChange={(value) =>
                      setFieldValue("agreeToTerms", value)
                    }
                  />
                  <MixedQuestion
                    first={"You have agreed to our"}
                    second={"Terms & Conditions"}
                  />
                </View>
                {touched.agreeToTerms && errors.agreeToTerms && (
                  <Text style={styles.errorStyle}>{errors.agreeToTerms}</Text>
                )}
                <View style={styles.signInContainer}>
                  <EnterButton
                    text={"Create Account"}
                    style={styles.signIn}
                    onPress={handleSubmit}
                  />
                  <MixedQuestion
                    first={"Already have an account?"}
                    second={"Sign In"}
                    onPress={() => navigation.navigate("Login")}
                  />
                </View>
              </>
            )}
          </Formik>
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
    width: "100%",
    alignItems: "center",
  },

  checkContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 16,
  },

  errorStyle: {
    color: "red",
    width: "100%",
    marginTop: 5,
    ...label.l3r,
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

  signInContainer: {
    width: "100%",
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
    ...header.h3,
  },
});
export default CreateAccountScreen;
