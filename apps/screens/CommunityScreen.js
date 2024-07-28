import React, { useState, useEffect } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	doc,
	collection,
	query,
	orderBy,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseSetup"; // Ensure this path is correct
import {
	differenceInMinutes,
	differenceInHours,
	differenceInDays,
} from "date-fns";
import Screen from "../components/Screen";
import SearchBar from "../components/SearchBar";
import MenuHeader from "../components/MenuHeader";
import neutral from "../config/colors/neutralColor";
import PostItems from "../components/PostItems";
import header from "../config/header";
import MainMenu from "../components/MainMenu";
import AddButton from "../components/AddButton";
import ActivityPost from "../components/ActivityPost";

function CommunityScreen() {
	const [show, setShow] = useState(false);
	const [posts, setPosts] = useState([]);

	const toggleShow = () => setShow(!show);

	useEffect(() => {
		const q = query(collection(db, "posts"), orderBy("dateCreated", "desc"));
		const unsubscribe = onSnapshot(q, (snapshot) => {
			const postsData = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setPosts(postsData);
		});
		return () => unsubscribe();
	}, []);

	const handleLike = async (postId, isLiked, currentLikes) => {
		const newLikeStatus = !isLiked;
		const postRef = doc(db, "posts", postId);
		await updateDoc(postRef, {
			likes: newLikeStatus ? currentLikes + 1 : currentLikes - 1,
		});
	};

	const handleSave = async (postId, isSaved) => {
		const newSaveStatus = !isSaved;
		const postRef = doc(db, "posts", postId);
		await updateDoc(postRef, {
			saved: newSaveStatus,
		});
	};

	const formatTimeAgo = (date) => {
		const now = new Date();
		const diffInMinutes = differenceInMinutes(now, date);
		const diffInHours = differenceInHours(now, date);
		const diffInDays = differenceInDays(now, date);

		if (diffInMinutes < 60) {
			return `${diffInMinutes}m ago`;
		} else if (diffInHours < 24) {
			return `${diffInHours}h ago`;
		} else {
			return `${diffInDays}d ago`;
		}
	};

	return (
		<View style={styles.screen}>
			{show && <ActivityPost onClose={toggleShow} />}
			<View style={styles.mainScreen}>
				<Screen>
					<MenuHeader image={require("../assets/Avatar.png")}>
						<Text style={{ color: neutral.n950, ...header.h4 }}>Community</Text>
					</MenuHeader>
					<ScrollView contentContainerStyle={styles.scrollview}>
						<SearchBar placeholder={"search"} />
						<View style={styles.feeds}>
							{posts.map((post) => (
								<PostItems
									key={post.id}
									owner={post.userId} // Replace with the user's display name
									time={formatTimeAgo(new Date(post.dateCreated.toDate()))}
									text={post.text}
									image={
										post.attachmentUrl ? { uri: post.attachmentUrl } : null
									}
									profilePics={require("../assets/profile.png")} // Replace with actual user profile picture
									isLike={post.likes > 0}
									onLike={() => handleLike(post.id, post.likes > 0, post.likes)}
									onSave={() => handleSave(post.id, post.saved)}
									isSaved={post.saved}
								/>
							))}
						</View>
					</ScrollView>
					<TouchableOpacity onPress={toggleShow}>
						<AddButton style={styles.addButton} />
					</TouchableOpacity>
					<MainMenu currentPage={2} />
				</Screen>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	addButton: {
		position: "absolute",
		right: 8,
		bottom: 102,
	},
	feeds: {
		marginHorizontal: 16,
	},
	mainScreen: {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		zIndex: 1,
	},
	screen: {
		backgroundColor: neutral.background,
		width: "100%",
		height: "100%",
	},
	scrollview: {
		justifyContent: "center",
		paddingBottom: 75,
		marginTop: 26,
	},
});

export default CommunityScreen;
