import React from "react";
import { StyleSheet, TextInput, TouchableHighlight, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import body from "../config/body";
import neutral from "../config/colors/neutralColor";
import { Formik } from "formik";

function SearchBar({ placeholder, field, onResults }) {
  const fetchNewList = (queryText) => {
    //implement this
    console.log("fetching...");
    result = "your result of query goes here";
    onResults(result);
  };

  return (
    <View style={styles.searchContainer}>
      <TouchableHighlight style={styles.searchBar}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color={neutral.n300} />
          <Formik
            initialValues={{ queryText: "" }}
            onSubmit={(values) => fetchNewList(values.queryText)}
          >
            {({ handleSubmit, handleChange, values }) => (
              <TextInput
                onChangeText={handleChange("queryText")}
                onSubmitEditing={handleSubmit}
                placeholder={placeholder}
                style={body.p1r}
                value={values.queryText}
              ></TextInput>
            )}
          </Formik>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  searchInputContainer: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: neutral.n300,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
});
export default SearchBar;
