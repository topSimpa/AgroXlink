import { React, useState } from "react";
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

function PostItems({ profilePics, image, text, owner, time }) {
  const [isLike, setLike] = useState(false);
  const [isSaved, setSave] = useState(false);

  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.headerDetails}>
          <Image
            resizeMode={"contain"}
            style={styles.profile}
            source={profilePics}
          />
          <View style={styles.nameTime}>
            <Text
              style={[
                { color: neutral.n950, ...label.l2b },
              ]}
            >
              {owner}
            </Text>
            <View style={styles.activeCircle} />
            <Text style={{ color: neutral.n400, ...label.l4b }}>{time}</Text>
          </View>
        </View>
        <Elipses></Elipses>
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
                <TouchableOpacity onPress={() => setLike(!isLike)}>
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
              <TouchableOpacity onPress={() => setSave(!isSaved)}>
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
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: primary.p900,
    marginHorizontal: 6,
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
    alignItems: "center",
    flexDirection: "row",
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
    alignItems: "center",
    width: "100%",
  },

  profile: {
    heigth: "100%",
    marginRight: 8,
  },

  reaction: {
    flexDirection: "row",
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: neutral.n100,
  },

  reactionContainer: {
    width: "100%",
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  reactionItems: {
    alignItems: "center",
    color: neutral.n600,
    justifyContent: "space-between",
    ...label.l2b,
    marginRight: 20,
  },
});

export default PostItems;
