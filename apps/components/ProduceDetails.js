import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { useState } from "react";

import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";
import body from "../config/body";
import header from "../config/header";

function ProduceDetails({ image, name, farmName, price, unit }) {
  const [isSaved, setSaved] = useState(false);
  const [isEntered, setEntered] = useState(false);
  const handleClicked = () => setSaved(!isSaved);
  const handleEnter = () => setEntered(!isEntered);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{ width: "100%", height: 140, overflow: "hidden" }}
      >
        <TouchableOpacity onPress={handleClicked} style={styles.save}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: neutral.white,
                width: 35,
              },
            ]}
          >
            <FontAwesome name={isSaved ? "bookmark" : "bookmark-o"} size={24} color={primary.p900} />
          </View>
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.details}>
        <View style={styles.nameContainer}>
          <Text style={[styles.name, styles.text]}>{name}</Text>
          <Text style={[styles.farm, styles.text]}>{farmName}</Text>
        </View>
        <View style={styles.others}>
          <View style={styles.priceContainer}>
            <Text style={[styles.text, styles.price]}>
              <FontAwesome6 name="naira-sign" size={16} color={neutral.n950} />
              {price}
            </Text>
            <Text style={[styles.text, styles.quantity]}>{unit}</Text>
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
    width: "47%",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: neutral.n300,
    marginRight: 8,
    marginBottom: 16,
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
