import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

import neutral from "../config/colors/neutralColor";
import body from "../config/body";
import label from "../config/label";
import AppTextInput from "../components/AppTextInput";
import EnterButton from "../components/EnterButton";
import header from "../config/header";
import primary from "../config/colors/primaryColor";

function AddCropScreen({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Cereals", value: "Cereals" },
    { label: "Vegetables", value: "Vegetables" },
    { label: "Legumes", value: "Legumes" },
    { label: "Fiber", value: "Fiber" },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.addForm}>
        <View style={styles.formHeader}>
          <Text
            style={{
              color: "black",
              ...header.h4,
            }}
          >
            Add new crop
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("myCropScreen")}>
            <Ionicons name={"close"} color={neutral.n950} size={24} />
          </TouchableOpacity>
        </View>
        <AppTextInput
          title="Crop Title"
          placeholder="Red Onion"
          style={{ marginBottom: 18 }}
        />

        <View style={styles.Catcontainer}>
          <Text style={styles.title}>Crop Category</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.dropDown}
            placeholder="Vegetable"
            placeholderStyle={styles.placeholder}
            dropDownContainerStyle={styles.dropDownContainer}
          />
        </View>

        <EnterButton text={"Add Crop"} style={{ marginTop: 32 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addForm: {
    position: "absolute",
    bottom: 0,
    height: "45%",
    backgroundColor: neutral.background,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 52,
    paddingTop: 20,
    paddingHorizontal: 16,
    width: "100%",
  },

  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(118, 119, 116, 0.6)",
    position: "absolute",
    top: 0,
  },

  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  dropDownContainerStyle: {
    width: "100%",
    height: 66,
    backgroundColor: neutral.background,
  },
  dropDown: {
    width: "100%",
    height: 48,
    borderRadius: 10,
    borderColor: neutral.n100,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 12,
    backgroundColor: neutral.background,
  },

  placeholder: {
    color: neutral.n300,
    ...body.p2r,
  },

  title: {
    marginBottom: 4,
    color: neutral.n950,
    ...label.l3b,
  },
});
export default AddCropScreen;
