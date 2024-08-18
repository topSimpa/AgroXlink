import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import error from "../config/colors/error";
import neutral from "../config/colors/neutralColor";
import label from "../config/label";
import body from "../config/body";
import header from "../config/header";

function AdsItem({ name }) {
  return (
    <View style={styles.ItemBox}>
      <View style={styles.nameBox}>
        <View style={{ width: 74, height: 74 }}>
          <Image />
        </View>
        <View style={styles.textBox}>
          <Text style={{ color: neutral.n950, ...label.l2b }}>{name}</Text>
          <Text style={{ color: neutral.n600, ...body.p2r }}>Maize</Text>
          <Text style={{ color: neutral.n950, ...header.h40 }}>
            3739{" "}
            <Text style={{ color: neutral.n500, ...body.p3r }}>Per Bag</Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity style>
        <MaterialIcons name="delete-outline" color={error.r600} size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ItemBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    gap: 8,
  },

  nameBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textBox: { gap: 8 },
});

export default AdsItem;
