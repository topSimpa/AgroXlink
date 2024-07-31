import React from "react";
import { FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingItem from "../components/OnboardingItem";

const screens = [
	{
		id: 1,
		image: require("../assets/01.png"),
		titleOne: "Limitless Market",
		titleTwo: "Access",
		captionOne: "Market your produce, Engage with buyers, and",
		captionTwo: "complete your transaction directly through chat",
	},

	{
		id: 2,
		image: require("../assets/2.png"),
		titleOne: "Diagnose  and",
		titleTwo: "Manage Crops",
		captionOne: "Uploading images to detect plant diseases and",
		captionTwo: "receive expert recommendations instantly",
	},

	{
		id: 3,
		image: require("../assets/3.png"),
		titleOne: "Share Your",
		titleTwo: "Farming Journey",
		captionOne: "Post updates about your daily farming activities",
		captionTwo: "and connect with other farmers",
	},
];

function OnboardingScreen({ navigation }) {
	const completeOnboarding = async () => {
		await AsyncStorage.setItem("onboarded", "true");
		const onboarded = await AsyncStorage.getItem("onboarded");
		console.log("complete onboarded ->", onboarded);
		navigation.navigate("Register");
	};

	return (
		<FlatList
			data={screens}
			keyExtractor={(screen) => screen.id.toString()}
			renderItem={({ item }) => (
				<OnboardingItem
					id={item.id}
					image={item.image}
					titleOne={item.titleOne}
					titleTwo={item.titleTwo}
					captionOne={item.captionOne}
					captionTwo={item.captionTwo}
					navigation={navigation}
					onBoarding={completeOnboarding}
				/>
			)}
			horizontal
			pagingEnabled
			bounces={false}
			style={styles.flatList}
		/>
	);
}

const styles = StyleSheet.create({
	flatList: {
		width: "100%",
		height: "100%",
	},
});

export default OnboardingScreen;
