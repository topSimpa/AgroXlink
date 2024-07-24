import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";

import Brand from "../components/Brand";
import body from "../config/body";
import neutral from "../config/colors/neutralColor";
import Screen from "../components/Screen";
import primary from "../config/colors/primaryColor";
import BackButton from "../components/BackButton";
import AppTextInput from "../components/AppTextInput";
import MixedQuestion from "../components/MixedQuestion";
import EnterButton from "../components/Button";
import header from "../config/header";
import CheckBox from "../components/CheckBox";
import useAuth from "../auth/useAuth";

import {
	ErrorMessage,
	Form,
	FormField,
	SubmitButton,
	FormCheckbox,
} from "../components/forms";

const validationSchema = Yup.object().shape({
	email: Yup.string().required().email().label("Email"),
	password: Yup.string().required().min(4).label("Password"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
		.required("Confirm Password is required"),
	agreed: Yup.boolean().oneOf(
		[true],
		"You must accept the terms and conditions"
	),
});

function CreateAccountScreen() {
	const { register, login } = useAuth();
	const [error, setError] = useState();

	const handleSubmit = async (userInfo) => {
		try {
			// Register the user
			const userCredential = await register(userInfo.email, userInfo.password);

			// Log the user in
			const { user } = await login(userInfo.email, userInfo.password);

			console.log("User registered and logged in:", user);
		} catch (error) {
			// Handle registration or login error
			// setError(error);
			console.error(error);
		}
	};

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
						<Text style={styles.title}>Create Account</Text>
						<Text style={styles.subTitle}>
							Enter your details to create an account
						</Text>
					</View>

					<Form
						initialValues={{
							email: "",
							password: "",
							confirmPassword: "",
							agreed: false,
						}}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}
					>
						<ErrorMessage error={error} visible={error} />
						<FormField
							title="Email"
							autoCorrect={false}
							name="email"
							keyboardType="email-address"
							placeholder="Email"
							textContentType="emailAddress"
						/>
						<FormField
							title="Password"
							autoCapitalize="none"
							autoCorrect={false}
							name="password"
							placeholder="Password"
							secureTextEntry
							textContentType="password"
						/>

						<FormField
							title="Confirm Password"
							autoCapitalize="none"
							autoCorrect={false}
							name="confirmPassword"
							placeholder="Confirm Password"
							secureTextEntry
							textContentType="password"
						/>

						<View style={styles.checkContainer}>
							<FormCheckbox
								title="I agree to the Terms & Conditions"
								name="agreed"
							/>
						</View>

						<SubmitButton title="Create an account" />
					</Form>
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
