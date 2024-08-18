import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import * as ImagePicker from "expo-image-picker";

import BackButton from "../components/BackButton";
import Screen from "../components/Screen";
import header from "../config/header";
import neutral from "../config/colors/neutralColor";
import label from "../config/label";
import primary from "../config/colors/primaryColor";

const name = "Bayero Abdul";
const email = "dummy.domain.com";
const Bio = "i farm Shege all through the season";
const phone = "09034567321";
const ownerFarm = "Agbero Farm";
const DOB = "31/11";
const location = "Sabo-Shege Zaria";

function ProfileScreen({ navigation }) {

  return (
    <Screen style={styles.screen}>
      <View style={styles.profileHeader}>
        <ImageBackground
          
          source={require("../assets/pbackground.png")}
          style={{
            width: "100%",
            height: 178,
          }}
        >
          <BackButton
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "rgba(26, 28, 18, 0.6)",
              borderRadius: 20,
              marginTop: 16,
            }}
            color={neutral.white}
          />
          <View
            style={{
              width: 97,
              height: 100,
              position: "absolute",
              top: 128,
              left: 20,
              borderWidth: 3,
              borderBottomWidth: 0,
              borderColor: "white",
              borderRadius: 100,
              overflow: "hidden",
            }}
          >
            <Image
              source={require("../assets/person.png")}
              style={{ width: "100%", height: "100%" }}
            ></Image>
          </View>
        </ImageBackground>
        <View style={styles.editContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("editProfile")}
          >
            <Text style={{ color: primary.p900, ...label.l4b }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileDetails}>
        <View style={styles.basicInfo}>
          <View style={styles.nameEmail}>
            <Text style={{ ...header.h3 }}>{name}</Text>
            <Text style={{ ...label.l2r, color: neutral.n500 }}>{email}</Text>
          </View>
          <Text style={{ ...label.l2r, color: neutral.n900 }}>{Bio}</Text>
        </View>
        <View style={styles.contactBox}>
          <View style={styles.contactHeader}>
            <Text
              style={{ marginBottom: 20, ...header.h4, color: neutral.n950 }}
            >
              Details
            </Text>
          </View>
          <View style={styles.contactDetails}>
            <View style={styles.contactItems}>
              <MaterialIcons name="phone-android" size={16} />
              <Text style={{ ...label.l2r, color: neutral.n950 }}>{phone}</Text>
            </View>
            <View style={styles.contactItems}>
              <MaterialIcons name="warehouse" size={16} />
              <Text style={{ ...label.l2r, color: neutral.n950 }}>
                {ownerFarm}
              </Text>
            </View>
            <View style={styles.contactItems}>
              <Octicons name="location" size={16} />
              <Text style={{ ...label.l2r, color: neutral.n950 }}>
                {location}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: neutral.background,
  },

  profileHeader: {
    width: "100%",
    height: 256,
    marginBottom: 32,
  },

  profileBackground: {
    width: "100%",
    height: 206,
  },

  profileDetails: {
    marginHorizontal: 16,
  },

  editButton: {
    marginRight: 17,
    marginTop: 12,
    height: 28,
    borderColor: primary.p900,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  editContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  nameEmail: {
    marginBottom: 16,
  },

  basicInfo: {
    borderBottomColor: neutral.n100,
    borderBottomWidth: 1,
    paddingBottom: 30,
    marginBottom: 30,
  },

  contactDetails: {
    gap: 16,
  },

  contactItems: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
export default ProfileScreen;
