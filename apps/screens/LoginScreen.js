import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import Brand from "../components/Brand";
import body from "../config/body";
import neutral from "../config/colors/neutralColor";
import Screen from "../components/Screen";
import primary from "../config/colors/primaryColor";
import BackButton from "../components/BackButton";
import MixedQuestion from "../components/MixedQuestion";
import header from "../config/header";
import useAuth from "../auth/useAuth";

import {
	ErrorMessage,
	Form,
	FormField,
	SubmitButton,
} from "../components/forms";

const validationSchema = Yup.object().shape({
	email: Yup.string().required().email().label("Email"),
	password: Yup.string().required().min(4).label("Password"),
});

const resetPasswordValidationSchema = Yup.object().shape({
	resetEmail: Yup.string().required().email().label("Email"),
});

function LoginScreen() {
	const { login, resetPassword } = useAuth();
	const [error, setError] = useState();
	const [modalVisible, setModalVisible] = useState(false);
	const [resetError, setResetError] = useState();
	const [resetSuccess, setResetSuccess] = useState();

	const handleSubmit = async (userInfo) => {
		try {
			const { user } = await login(userInfo.email, userInfo.password);
			console.log("User logged in:", user);
			setError(null);
		} catch (error) {
			setError(error.message);
			console.error(error);
		}
	};

	const handleResetPassword = async (values) => {
		try {
			await resetPassword(values.resetEmail);
			setResetSuccess("Password reset email sent successfully!");
			setResetError(null);
		} catch (error) {
			setResetError(error.message);
			setResetSuccess(null);
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
						<Brand color={primary.p900} />
					</View>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Welcome Back!</Text>
						<Text style={styles.subTitle}>Enter your details to sign in</Text>
					</View>

					<Form
						initialValues={{ email: "", password: "" }}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}
					>
						<ErrorMessage error={error} visible={error} />
						<FormField
							title="Email"
							autoCorrect={false}
							name="email"
							keyboardType="email-address"
							placeholder="Enter your email address"
							textContentType="emailAddress"
						/>
						<FormField
							title="Password"
							autoCapitalize="none"
							autoCorrect={false}
							name="password"
							placeholder="Enter your password"
							secureTextEntry
							textContentType="password"
						/>

						<View style={styles.resetPasswordContainer}>
							<Text style={styles.resetPasswordText}>Forgot Password? </Text>
							<TouchableOpacity onPress={() => setModalVisible(true)}>
								<Text style={styles.resetPasswordLink}>Reset it</Text>
							</TouchableOpacity>
						</View>

						<SubmitButton title="Sign In" />
					</Form>

					<MixedQuestion
						first={"Don't have an account?"}
						second={"Create One"}
						style={{ width: "100%", alignItems: "center" }}
					/>
				</View>

				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>Reset Password</Text>

						<Form
							initialValues={{ resetEmail: "" }}
							onSubmit={handleResetPassword}
							validationSchema={resetPasswordValidationSchema}
						>
							<ErrorMessage error={resetError} visible={resetError} />
							{resetSuccess && (
								<Text style={styles.successMessage}>{resetSuccess}</Text>
							)}
							<FormField
								title="Email"
								autoCorrect={false}
								name="resetEmail"
								keyboardType="email-address"
								placeholder="Enter your email address"
								textContentType="emailAddress"
							/>
							<SubmitButton title="Send Reset Email" />
						</Form>

						<TouchableOpacity
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={styles.textStyle}>Close</Text>
						</TouchableOpacity>
					</View>
				</Modal>
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

	resetPasswordContainer: {
		flexDirection: "row",
		alignSelf: "flex-start",
		marginBottom: 32,
	},

	resetPasswordText: {
		color: neutral.n60,
	},

	resetPasswordLink: {
		color: primary.p900,
	},

	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
	},

	successMessage: {
		color: "green",
		marginBottom: 10,
	},

	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginTop: 20,
	},

	buttonClose: {
		backgroundColor: primary.p900,
	},

	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default LoginScreen;
