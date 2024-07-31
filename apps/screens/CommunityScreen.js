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
import useAuth from "../auth/useAuth";


function CommunityScreen() {
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const toggleShow = () => setShow(!show);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("dateCreated", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        likedBy: doc.data().likedBy || [],
        savedBy: doc.data().savedBy || [],
      }));
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
          <MenuHeader image={require("../assets/Avatar.png")}>
            <Text style={{ color: neutral.n950, ...header.h4 }}>Community</Text>
          </MenuHeader>
          <ScrollView contentContainerStyle={styles.scrollview}>
            <SearchBar placeholder={"search"} />
            <View style={styles.feeds}>
              {posts.map((post) => {
                const isLiked = post.likedBy.includes(user.id);
                const isSaved = post.savedBy.includes(user.id);
                return (
                  <PostItems
                    key={post.id}
                    owner={post.userId} // Replace with the user's display name
                    time={formatTimeAgo(new Date(post.dateCreated.toDate()))}
                    text={post.text}
                    image={
                      post.attachmentUrl ? { uri: post.attachmentUrl } : null
                    }
                    profilePics={require("../assets/profile.png")} // Replace with actual user profile picture
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
