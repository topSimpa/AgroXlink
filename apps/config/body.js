import { StyleSheet } from "react-native";

const fontFamily = "RedHatText";

const p1 = {
  fontSize: 16,
};
const p2 = {
  fontSize: 14,
};
const p3 = {
  fontSize: 12,
};

const body = StyleSheet.create({
  p1r: {
    ...p1,
    fontFamily,
    fontWeight: "regular",
  },
  p1b: {
    ...p1,
    fontFamily,
    fontWeight: "semi-bold",
  },
  p2r: {
    ...p2,
    fontFamily,
    fontWeight: "regular",
  },
  p2b: {
    ...p2,
    fontFamily,
    fontWeight: "semi-bold",
  },

  p3r: {
    ...p3,
    fontFamily,
    fontWeight: "regular",
  },
  p3b: {
    ...p3,
    fontFamily,
    fontWeight: "semi-bold",
  },
});

export default body;
