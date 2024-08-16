import React from "react";
import BackButton from "../components/BackButton";
import AppTextInput from "../components/AppTextInput";
import EnterButton from "../components/EnterButton";

function ResetPasswordScreen() {
  return (
    <Screen>
      <BackButton />
      <Brand />
      <Text>Forgot Password</Text>
      <Text>Enter the email address associated with your</Text>
      <Text>account to reset the password</Text>
      <AppTextInput />
      <EnterButton />
    </Screen>
  );
}

export default ResetPasswordScreen;
