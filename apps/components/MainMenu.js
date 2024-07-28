import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import neutral from "../config/colors/neutralColor";
import label from "../config/label";
import primary from "../config/colors/primaryColor";
import CropCare from "../assets/cropCare.svg";
import Home from "../assets/home.svg";
import Messages from "../assets/message.svg";
import People from "../assets/people.svg";

function MainMenu({ currentPage }) {
  return (
    <View style={styles.mainMenu}>
      <TouchableOpacity onPress={() => changeMenu(0)}>
        <View style={styles.menu}>
          <Home
            width={20}
            color={currentPage === 0 ? primary.p900 : neutral.n950}
          />
          <Text
            style={{
              color: currentPage === 0 ? primary.p900 : neutral.n900,
              ...label.l4b,
            }}
          >
            Home
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeMenu(1)}>
        <View style={styles.menu}>
          <CropCare
            width={20}
            color={currentPage === 1 ? primary.p900 : neutral.n950}
          />
          <Text
            style={{
              color: currentPage === 1 ? primary.p900 : neutral.n900,
              ...label.l4b,
            }}
          >
            Crop Care
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeMenu(2)}>
        <View style={styles.menu}>
          <People
            width={20}
            color={currentPage === 2 ? primary.p900 : neutral.n950}
          />
          <Text
            style={{
              color: currentPage === 2 ? primary.p900 : neutral.n900,
              ...label.l4b,
            }}
          >
            Community
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeMenu(3)}>
        <View style={styles.menu}>
          <Messages
            width={20}
            color={currentPage === 3 ? primary.p900 : neutral.n950}
          />
          <Text
            style={{
              color: currentPage === 3 ? primary.p900 : neutral.n900,
              ...label.l4b,
            }}
          >
            Messages
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    alignItems: "center",
  },

  mainMenu: {
    backgroundColor: neutral.background,
    borderTopWidth: 1,
    borderColor: neutral.n100,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 36,
    paddingHorizontal: 32,
    paddingTop: 12,
    position: "absolute",
    width: "100%",
  },
});
export default MainMenu;
