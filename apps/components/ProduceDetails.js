import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { useState } from "react";

import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";
import body from "../config/body";
import header from "../config/header";

function ProduceDetails() {
  const [isSaved, setSaved] = useState(false);
  const [isEntered, setEntered] = useState(false);
  const handleClicked = () => setSaved(!isSaved);
  const handleEnter = () => setEntered(!isEntered);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/tomatoes.png")}
        resizeMode="cover"
        style={{ width: "100%", height: 140, overflow: "hidden" }}
      >
        <TouchableOpacity onPress={handleClicked} style={styles.save}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: isSaved ? primary.p300 : neutral.white,
                width: 35,
              },
            ]}
          >
            <Feather name="bookmark" size={24} color={primary.p900} />
          </View>
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.details}>
        <View style={styles.nameContainer}>
          <Text style={[styles.name, styles.text]}>Rice</Text>
          <Text style={[styles.farm, styles.text]}>Zango</Text>
        </View>
        <View style={styles.others}>
          <View style={styles.priceContainer}>
            <Text style={[styles.text, styles.price]}>
              <FontAwesome6 name="naira-sign" size={16} color={neutral.n950} />
              999
            </Text>
            <Text style={[styles.text, styles.quantity]}>Per Bag</Text>
          </View>
          <TouchableOpacity onPress={handleEnter} style={styles.save}>
            <View
              style={[styles.iconContainer, { backgroundColor: primary.p950 }]}
            >
              <FontAwesome6
                name="arrow-right-long"
                size={10}
                color={neutral.white}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 164,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: neutral.n300,
  },

  iconContainer: {
    alignItems: "center",
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    width: 36,
  },

  details: {
    borderRadius: 5,
    width: 164,
    paddingBottom: 12,
    paddingHorizontal: 8,
    paddingTop: 16,
  },

  farm: {
    color: neutral.n600,
    ...body.p2r,
  },

  name: {
    fontFamily: "RedHatDisplay",
    fontWeight: "700",
    fontSize: 16,
  },

  others: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },

  save: {
    position: "absolute",
    top: 8,
    right: 8,
  },

  price: {
    color: neutral.n950,
    ...header.h4,
  },

  priceContainer: {
    width: 112,
  },

  quantity: {
    color: neutral.n500,
    ...body.p3r,
  },

  text: {
    textAlignVertical: "top",
  },
});

export default ProduceDetails;
