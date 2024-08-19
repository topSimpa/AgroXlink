import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import neutral from "../config/colors/neutralColor";
import body from "../config/body";
import label from "../config/label";
import AppTextInput from "../components/AppTextInput";
import EnterButton from "../components/EnterButton";
import header from "../config/header";
import primary from "../config/colors/primaryColor";
import ImageInput from "../components/ImageInput";

function AddSellScreen({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [quantity, setQuantity] = useState([
    { label: "Basket", value: "basket" },
    { label: "Bag", value: "bag" },
    { label: "Stack", value: "stack" },
  ]);

  const [on, setOn] = useState(false);
  const [val, setVal] = useState(null);
  const [cat, setCat] = useState([
    { label: "One", value: "one" },
    { label: "Two", value: "two" },
    { label: "Three", value: "three" },
  ]);

  const [image, setImage] = useState(null);

  const requestPermissions = async () => {
    const { status: mediaStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    if (mediaStatus !== "granted" || cameraStatus !== "granted") {
      alert(
        "Sorry, we need media library and camera permissions to make this work!"
      );
      return false;
    }
    return true;
  };

  const pickImage = async (useCamera = false) => {
    if (!(await requestPermissions())) return;

    let result;
    if (useCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      if (currentSetter === "background") {
        setBackground(result.assets[0].uri);
      } else if (currentSetter === "image") {
        setImage(result.assets[0].uri);
      }
      setShowOptions(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.addPage}>
        <View style={styles.form}>
          <View style={styles.formHeader}>
            <Text
              style={{
                color: "black",
                ...header.h4,
              }}
            >
              Post New Ad
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name={"close"} color={neutral.n950} size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.imageUploadBox}>
            <View>
              <Text style={styles.instruction}>
                Add at least 2 pictures of the product.
              </Text>
              <Text style={styles.instruction}>Size should not exceed 5MB</Text>
            </View>
            <View style={styles.imageBox}>
              {image && <Image source={{ uri: image }} />}
              <View style={styles.addImageButton}>
                <ImageInput
                  show={false}
                  onPress={pickImage}
                  style={{ backgroundColor: primary.p100 }}
                >
                  <FontAwesome6 name={"plus"} color={neutral.p900} size={20} />
                </ImageInput>
              </View>
            </View>
          </View>
          <View style={styles.form}>
            <AppTextInput title="Title" placeholder="Red Onion" />
            <AppTextInput title="Price" placeholder="169" />

            <View>
              <Text style={styles.title}>Category</Text>
              <DropDownPicker
                open={on}
                value={val}
                items={cat}
                setOpen={setOn}
                setValue={setVal}
                setItems={setCat}
                style={styles.dropDown}
                placeholder="Cat"
                placeholderStyle={styles.placeholder}
                dropDownContainerStyle={styles.dropDownContainerStyle}
              />
            </View>
            <View>
              <Text style={styles.title}>Quantity</Text>
              <DropDownPicker
                open={open}
                value={value}
                items={quantity}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setQuantity}
                style={styles.dropDown}
                placeholder="Basket"
                placeholderStyle={styles.placeholder}
                dropDownContainerStyle={styles.dropDownContainerStyle}
              />
            </View>
          </View>
        </View>
        <EnterButton text={"Post Ad"} style={{ marginTop: 32 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addImageButton: {
    width: 50,
    height: 50,
    backgroundColor: primary.p100,
    justifyContent: "center",
    alignItems: "center",
  },

  addPage: {
    position: "absolute",
    bottom: 0,
    height: "80%",
    backgroundColor: neutral.background,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 52,
    paddingTop: 20,
    paddingHorizontal: 16,
    width: "100%",
  },
  instruction: {
    color: neutral.n700,
    ...label.l2r,
  },

  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(118, 119, 116, 0.6)",
    position: "absolute",
    top: 0,
  },

  form: {
    gap: 9,
  },

  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
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

  imageBox: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    gap: 8,
  },
  imageUploadBox: {
    gap: 9,
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

export default AddSellScreen;
