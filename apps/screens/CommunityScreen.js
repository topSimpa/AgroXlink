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
	arrayUnion,
	arrayRemove,
} from "firebase/firestore";
import { db } from "../firebaseSetup";
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
import MainMenu from "../components/MainMenu";
import AddButton from "../components/AddButton";
import ActivityPost from "../components/ActivityPost";
import useAuth from "../auth/useAuth";
import { UserService } from "../services/UserService";

function CommunityScreen() {
	const [show, setShow] = useState(false);
	const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState({});
	const { user } = useAuth();
	const userService = new UserService();

	const toggleShow = () => setShow(!show);

	useEffect(() => {
		const q = query(collection(db, "posts"), orderBy("dateCreated", "desc"));
		const unsubscribe = onSnapshot(q, async (snapshot) => {
			const postsData = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
				likedBy: doc.data().likedBy || [],
				savedBy: doc.data().savedBy || [],
			}));

			// Get unique user IDs from posts
			const userIds = Array.from(new Set(postsData.map((post) => post.userId)));

			// Fetch user data for each unique user ID
			const userPromises = userIds.map(async (userId) => {
				const userData = await userService.get(userId);
				return { [userId]: userData };
			});

			// Wait for all user data to be fetched
			const usersData = await Promise.all(userPromises);

			// Combine all user data into a single object
			const usersMap = usersData.reduce((acc, userData) => {
				return { ...acc, ...userData };
			}, {});

			setUsers(usersMap);
			setPosts(postsData);
		});
		return () => unsubscribe();
	}, []);

	const handleLike = async (postId, isLiked) => {
		const postRef = doc(db, "posts", postId);
		await updateDoc(postRef, {
			likedBy: isLiked ? arrayRemove(user.id) : arrayUnion(user.id),
		});
	};

	const handleSave = async (postId, isSaved) => {
		const postRef = doc(db, "posts", postId);
		await updateDoc(postRef, {
			savedBy: isSaved ? arrayRemove(user.id) : arrayUnion(user.id),
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
					<MenuHeader
						image={require("../assets/Avatar.png")}
						color={neutral.n950}
						title={"Community"}
					/>
					<ScrollView contentContainerStyle={styles.scrollview}>
						<SearchBar placeholder={"search"} field={"activity.userName"} />
						<View style={styles.feeds}>
							{posts.map((post) => {
								const isLiked = post.likedBy.includes(user.id);
								const isSaved = post.savedBy.includes(user.id);
								const postUser = users[post.userId] || {};
								const profileImage = postUser.imageUrl
									? { uri: postUser.imageUrl }
									: require("../assets/Avatar.png");

								return (
									<PostItems
										key={post.id}
										owner={postUser.name || "Unknown"}
										time={formatTimeAgo(new Date(post.dateCreated.toDate()))}
										text={post.text}
										image={
											post.attachmentUrl ? { uri: post.attachmentUrl } : null
										}
										profilePics={profileImage}
										isLike={isLiked}
										onLike={() => handleLike(post.id, isLiked)}
										onSave={() => handleSave(post.id, isSaved)}
										isSaved={isSaved}
									/>
								);
							})}
						</View>
					</ScrollView>
					<TouchableOpacity onPress={toggleShow}>
						<AddButton style={styles.addButton} />
					</TouchableOpacity>
					{/* <MainMenu currentPage={2} /> */}
				</Screen>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	addButton: {
		position: "absolute",
		right: 16,
		bottom: 44,
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
