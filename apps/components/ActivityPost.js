import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import EnterButton from "./EnterButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";

import neutral from "../config/colors/neutralColor";
import body from "../config/body";
import Picture from "../assets/pictures.svg";
import Camera from "../assets/camera.svg";
import Location from "../assets/location.svg";
import header from "../config/header";
import label from "../config/label";

const validationSchema = Yup.object().shape({
  postText: Yup.string().max(450, "text must be less than 450 characters"),
});

function ActivityPost({ onClose }) {
  return (
    <View style={styles.page}>
      <Formik
        initialValues={{ postText: "" }}
        onSubmit={() => console.log("your code comes Here")}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, handleSubmit, errors, values, touched }) => (
          <>
            <View style={styles.activityPost}>
              <View style={styles.postContainer}>
                <View style={styles.header}>
                  <Text style={{ color: "black", ...header.h4 }}>
                    Activity Post
                  </Text>
                  <TouchableOpacity onPress={onClose}>
                    <Ionicons name={"close"} color={neutral.n950} size={24} />
                  </TouchableOpacity>
                </View>
                <View style={styles.postDetails}>
                  <TextInput
                    editable
                    multiline
                    style={styles.post}
                    placeholder="tell us about your activity here"
                    value={values.postText}
                    onChangeText={(text) => {
                      if (text.length <= 250) {
                        setFieldValue("postText", text);
                      }
                    }}
                  ></TextInput>
                  {touched.postText && errors.postText && (
                    <Text style={styles.errorStyle}>{errors.postText}</Text>
                  )}
                  <View style={styles.attachmentBox}>
                    <View style={styles.attachmentIcons}>
                      <View style={styles.icon}>
                        <Picture />
                      </View>
                      <View style={styles.icon}>
                        <Camera />
                      </View>
                      <View>
                        <Location />
                      </View>
                    </View>
                    <Text style={{ color: neutral.n400, ...label.l3b }}>
                      {values.postText.length}/250
                    </Text>
                  </View>
                </View>
              </View>
              <EnterButton text={"Post Activity"} onPress={handleSubmit} />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  activityPost: {
    backgroundColor: neutral.white,
    borderBottomRightRadius: 10,
    borderBottomStartRadius: 10,
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 52,
    position: "absolute",
    bottom: 0,
  },

  attachmentBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  attachmentIcons: {
    flexDirection: "row",
  },

  errorStyle: {
    color: "red",
    width: "100%",
    marginTop: 5,
    ...label.l3r,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 19,
  },

  icon: {
    marginRight: 16,
  },

  page: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(118, 119, 116, 0.6)",
    position: "absolute",
    top: 0,
    zIndex: 1000,
  },

  post: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: neutral.n200,
    ...body.p1r,
    color: neutral.n950,
    height: 141,
    marginBottom: 20,
    textAlignVertical: "top",
    padding: 4,
  },

  postContainer: {
    marginBottom: 32,
    width: "100%",
  },

  postDetails: {
    width: "100%",
  },
});
export default ActivityPost;
