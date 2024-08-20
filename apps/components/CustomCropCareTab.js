import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigationState } from "@react-navigation/native";
import primary from "../config/colors/primaryColor";
import neutral from "../config/colors/neutralColor";
import label from "../config/label";

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { routes } = state;

  return (
    <View style={styles.menu}>
      <View style={styles.optionContainer}>
        {routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[
                styles.option,
                {
                  color: isFocused ? neutral.white : neutral.n850,
                  backgroundColor: isFocused ? primary.p500 : primary.p50,
                },
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  { color: isFocused ? neutral.white : neutral.n850 },
                ]}
              >
                {options.title || route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    gap: 4,
    height: 78,
    justifyContent: "flex-end",
  },
  optionContainer: {
    width: "100%",
    flexDirection: "row",
    padding: 8,
    borderRadius: 16,
    backgroundColor: primary.p50,
    justifyContent: "space-around",
  },
  option: {
    flexDirection: "column",
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  optionText: {
    ...label.l3b,
    lineHeight: 36,
  },
});

export default CustomTabBar;
