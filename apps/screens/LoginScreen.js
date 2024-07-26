import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

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
import label from "../config/label";

import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
	email: Yup.string().required().email().label("Email"),
	password: Yup.string().required().min(6).matches().label("Password"),
});

function LoginScreen({ navigation }) {
	const { login, resetPassword } = useAuth();
	const [error, setError] = useState();
	const [modalVisible, setModalVisible] = useState(false);
	const [resetError, setResetError] = useState();
	const [resetSuccess, setResetSuccess] = useState();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (userInfo) => {
		try {
			setLoading(true);
			const { user } = await login(userInfo.email, userInfo.password);
			console.log("User logged in:", user);

			setLoading(false);
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
						<Text style={styles.title}>Welcome Back!</Text>
						<Text style={styles.subTitle}>Enter your details to sign in</Text>
					</View>
					<Formik
						initialValues={{ email: "", password: "" }}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}
					>
						{({ handleChange, handleSubmit, errors, values, touched }) => (
							<>
								<AppTextInput
									title={"Email"}
									placeholder={"Enter your email address"}
									onChangeText={handleChange("email")}
									value={values.email}
								/>
								{touched.email && errors.email && (
									<Text style={styles.errorStyle}>{errors.email}</Text>
								)}
								<AppTextInput
									title={"Password"}
									placeholder={"Enter your password"}
									style={{ marginTop: 16 }}
									onChangeText={handleChange("password")}
									value={values.password}
								/>
								{touched.password && errors.password && (
									<Text style={styles.errorStyle}>{errors.password}</Text>
								)}
								<MixedQuestion
									first={"Forgot Password?"}
									second={"Reset it"}
									style={{ marginTop: 16 }}
								/>
								<View style={styles.signInContainer}>
									<EnterButton
										text={"Sign In"}
										style={styles.signIn}
										onPress={handleSubmit}
									/>
									<MixedQuestion
										first={"Don't have an account?"}
										second={"Create One"}
										onPress={() => navigation.navigate("Register")}
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
	},

	subTitle: {
		color: neutral.n60,
		...body.p2r,
	},

	signInContainer: {
		marginTop: 32,
		alignItems: "center",
	},

	signIn: {
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
