import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";
import body from "../config/body";

function CatItem({ image, title }) {
  const [isClicked, setClicked] = useState(false);
  const handleClicked = () => setClicked(!isClicked);

  return (
    <TouchableOpacity onPress={handleClicked}>
      <View style={styles.itemContainer}>
        <View
          style={[
            styles.frame,
            {
              borderColor: isClicked ? primary.p950 : primary.p300,
              backgroundColor: isClicked ? primary.p500 : primary.p50,
            },
          ]}
        >
          <Image source={image} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  frame: {
    alignItems: "center",
    borderRadius: 27,
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "center",
    width: 54,
    height: 54,
  },

  itemContainer: {
    width: 74,
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: neutral.n900,
    ...body.p3b,
  },
});
export default CatItem;
