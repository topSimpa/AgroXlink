import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import Screen from "./Screen";
import neutral from "../config/colors/neutralColor";
import header from "../config/header";
import label from "../config/label";
import error from "../config/colors/error";
import AdsLogo from "../assets/adslogo.svg";
import CropLogo from "../assets/croplogo.svg";

const name = "Abdul Bayero";
const email = "dummy@domain.com";

function ProfileDrawer({ image }) {
  navigation = useNavigation();
  return (
    <Screen style={styles.drawer}>
      <View style={styles.top}>
        <View style={styles.drawerHeader}>
          <TouchableOpacity onPress={() => navigation.navigate("profile")}>
            <Image
              source={image}
              style={{ height: 48, width: 48, borderRadius: 24 }}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View style={styles.titleBox}>
            <Text style={{ color: neutral.n950, ...header.h4 }}>{name}</Text>
            <Text style={{ color: neutral.n500, ...label.l3r }}>{email}</Text>
          </View>
          <View style={styles.through}></View>
        </View>
        <View style={styles.menu}>
          <View style={styles.menuBar}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("myAds")}
            >
              <AdsLogo color={neutral.n950} />
              <Text style={styles.itemText}>My Ads</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("mycrop")}
            >
              <CropLogo color={neutral.n950} />
              <Text style={styles.itemText}>My Crops</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <MaterialCommunityIcons
                name="bookmark-multiple-outline"
                size={18}
                color={neutral.n950}
              />
              <Text style={styles.itemText}>Saved Items</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("forgotPassword")}
            >
              <Feather name="lock" size={18} color={neutral.n950} />
              <Text style={styles.itemText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.through}></View>
        <View style={styles.toolBox}>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="settings-outline" size={18} color={neutral.n950} />
            <Text style={styles.itemText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Feather name="help-circle" size={18} color={neutral.n950} />
            <Text style={styles.itemText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <AntDesign name="logout" size={18} color={error.r800} />
            <Text style={[styles.itemText, { color: error.r800 }]}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bottom: {
    marginBottom: "30%",
    paddingHorizontal: 28,
    justifyContent: "space-between",
  },

  drawer: {
    justifyContent: "space-between",
    backgroundColor: neutral.background,
  },

  drawerHeader: {
    paddingHorizontal: 28,
    marginBottom: 16,
  },

  through: {
    marginTop: 24,
    borderBottomColor: neutral.n100,
    borderBottomWidth: 1,
  },

  item: {
    flexDirection: "row",
    paddingVertical: 12,
    alignContent: "center",
  },

  itemText: {
    marginLeft: 10,
    color: neutral.n850,
    ...label.l2b,
  },

  menu: {
    paddingBottom: 24,
    paddingHorizontal: 28,
  },

  menuBar: {
    justifyContent: "space-between",
  },
  titleBox: {
    marginTop: 16,
    justifyContent: "space-between",
  },
});

export default ProfileDrawer;
