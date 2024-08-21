import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import body from "../config/body";
import Elipses from "../assets/elipses.svg";
import neutral from "../config/colors/neutralColor";
import primary from "../config/colors/primaryColor";
import Like from "../assets/like.svg";
import Save from "../assets/save.svg";
import Share from "../assets/share.svg";
import Comment from "../assets/comment.svg";
import label from "../config/label";
import error from "../config/colors/error";

function PostItems({
	profilePics,
	image,
	text,
	owner,
	time,
	isLike,
	onLike,
	onSave,
	isSaved,
}) {
	return (
		<View style={styles.post}>
			<View style={styles.postHeader}>
				<View style={styles.headerDetails}>
					<View style={styles.profilePics}>
						<Image
							resizeMode={"contain"}
							source={profilePics}
							style={{ width: "100%", height: "100%" }}
						/>
					</View>

					<View style={styles.nameTime}>
						<Text style={[{ color: neutral.n950, ...label.l2b }]}>{owner}</Text>
						<View style={styles.activeness}>
							<View style={styles.activeCircle} />
							<Text style={{ color: neutral.n400, ...label.l4b }}>{time}</Text>
						</View>
					</View>
				</View>
				<Elipses />
			</View>
			<View style={styles.postDetails}>
				<Text style={styles.text}>{text}</Text>
				{image && (
					<Image
						source={image}
						resizeMode="contain"
						style={{ flex: 1, width: "100%" }}
					/>
				)}
				<View style={styles.reaction}>
					<View style={styles.reactionContainer}>
						<View style={styles.lcsBox}>
							<View style={styles.reactionItems}>
								<TouchableOpacity onPress={onLike}>
									<Like
										fill={isLike ? error.r900 : neutral.white}
										color={isLike ? error.r900 : neutral.n600}
									/>
								</TouchableOpacity>
								<Text>Like</Text>
							</View>
							<View style={styles.reactionItems}>
								<Comment />
								<Text>Comment</Text>
							</View>
							<View style={styles.reactionItems}>
								<Share />
								<Text>Share</Text>
							</View>
						</View>
						<View style={styles.reactionItems}>
							<TouchableOpacity onPress={onSave}>
								<Save
									fill={isSaved ? primary.p900 : neutral.white}
									color={isSaved ? primary.p900 : neutral.n600}
								/>
							</TouchableOpacity>
							<Text>Save</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	activeCircle: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: primary.p900,
		marginHorizontal: 6,
	},

	activeness: {
		alignItems: "center",
		flexDirection: "row",
	},

	errorStyle: {
		color: "red",
		width: "100%",
		marginTop: 5,
		...label.l3r,
	},
	headerDetails: {
		flexDirection: "row",
	},
	lcsBox: {
		flexDirection: "row",
	},

	nameTime: {
		alignItems: "flex-start",
	},
	text: {
		color: neutral.n950,
		marginBottom: 16,
		...body.p1r,
	},
	post: {
		marginBottom: 4,
		padding: 16,
		backgroundColor: neutral.white,
	},
	postDetails: {
		flex: 1,
	},
	postHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	profilePics: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 8,
		overflow: "hidden",
	},
	reaction: {
		marginTop: 16,
		borderTopWidth: 1,
		borderTopColor: neutral.n200,
		paddingTop: 12,
	},
	reactionContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	reactionItems: {
		alignItems: "center",
		marginRight: 16,
	},
});

export default PostItems;
